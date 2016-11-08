import { ChangeDetectorRef, ContentChild, ContentChildren, Directive, ElementRef, Input, IterableDiffers, NgZone, Optional, Renderer } from '@angular/core';
import { adjustRendered, calcDimensions, estimateHeight, initReadNodes, processRecords, populateNodeData, updateDimensions, writeToNodes } from './virtual-util';
import { clearNativeTimeout, nativeRaf, nativeTimeout } from '../../util/dom';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Img } from '../img/img';
import { isBlank, isFunction, isPresent } from '../../util/util';
import { Platform } from '../../platform/platform';
import { ViewController } from '../../navigation/view-controller';
import { VirtualFooter, VirtualHeader, VirtualItem } from './virtual-item';
export class VirtualScroll {
    constructor(_iterableDiffers, _elementRef, _renderer, _zone, _cd, _content, _platform, _ctrl, config) {
        this._iterableDiffers = _iterableDiffers;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._zone = _zone;
        this._cd = _cd;
        this._content = _content;
        this._platform = _platform;
        this._ctrl = _ctrl;
        this._records = [];
        this._cells = [];
        this._nodes = [];
        this._vHeight = 0;
        this._lastCheck = 0;
        this._data = {
            scrollTop: 0,
        };
        this._queue = null;
        this.bufferRatio = 2;
        this.approxItemWidth = '100%';
        this.approxHeaderWidth = '100%';
        this.approxHeaderHeight = '40px';
        this.approxFooterWidth = '100%';
        this.approxFooterHeight = '40px';
        this._eventAssist = config.getBoolean('virtualScrollEventAssist');
    }
    set virtualScroll(val) {
        this._records = val;
        if (isBlank(this._differ) && isPresent(val)) {
            this._differ = this._iterableDiffers.find(val).create(this._cd, this._trackBy);
        }
    }
    set headerFn(val) {
        if (isFunction(val)) {
            this._hdrFn = val.bind((this._ctrl && this._ctrl._cmp) || this);
        }
    }
    set footerFn(val) {
        if (isFunction(val)) {
            this._ftrFn = val.bind((this._ctrl && this._ctrl._cmp) || this);
        }
    }
    set virtualTrackBy(val) {
        this._trackBy = val;
    }
    ngDoCheck() {
        if (this._init) {
            this.update(true);
        }
    }
    ngAfterContentInit() {
        if (!this._init) {
            if (!this._itmTmp) {
                throw 'virtualItem required within virtualScroll';
            }
            this._init = true;
            if (!this.approxItemHeight) {
                this.approxItemHeight = '40px';
                console.warn('Virtual Scroll: Please provide an "approxItemHeight" input to ensure proper virtual scroll rendering');
            }
            this.update(true);
            this._platform.onResize(() => {
                (void 0);
                this.update(false);
            });
        }
    }
    update(checkChanges) {
        var self = this;
        if (!self._records || !self._records.length)
            return;
        if (checkChanges) {
            if (isPresent(self._differ)) {
                let changes = self._differ.diff(self._records);
                if (!isPresent(changes))
                    return;
            }
        }
        (void 0);
        self._cells.length = 0;
        self._nodes.length = 0;
        self._itmTmp.viewContainer.clear();
        self._elementRef.nativeElement.parentElement.scrollTop = 0;
        let attempts = 0;
        function readDimensions(done) {
            if (self._data.valid) {
                done();
            }
            else {
                calcDimensions(self._data, self._elementRef.nativeElement.parentElement, self.approxItemWidth, self.approxItemHeight, self.approxHeaderWidth, self.approxHeaderHeight, self.approxFooterWidth, self.approxFooterHeight, self.bufferRatio);
                if (self._data.valid) {
                    done();
                }
                else if (attempts < 30) {
                    attempts++;
                    nativeRaf(function () {
                        readDimensions(done);
                    });
                }
            }
        }
        readDimensions(function () {
            processRecords(self._data.renderHeight, self._records, self._cells, self._hdrFn, self._ftrFn, self._data);
            self.renderVirtual();
            self.addScrollListener();
        });
    }
    renderVirtual() {
        this._data.topCell = 0;
        this._data.bottomCell = (this._cells.length - 1);
        populateNodeData(0, this._data.bottomCell, this._data.viewWidth, true, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, true);
        this._cd.detectChanges();
        nativeRaf(this.postRenderVirtual.bind(this));
    }
    postRenderVirtual() {
        initReadNodes(this._nodes, this._cells, this._data);
        this._renderer.setElementClass(this._elementRef.nativeElement, 'virtual-scroll', true);
        writeToNodes(this._nodes, this._cells, this._records.length);
        this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
    }
    scrollUpdate() {
        clearNativeTimeout(this._tmId);
        this._tmId = nativeTimeout(this.onScrollEnd.bind(this), SCROLL_END_TIMEOUT_MS);
        let data = this._data;
        if (this._queue === QUEUE_CHANGE_DETECTION) {
            this._cd.detectChanges();
            writeToNodes(this._nodes, this._cells, this._records.length);
            this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
            this._queue = null;
        }
        else {
            data.scrollDiff = (data.scrollTop - this._lastCheck);
            if (Math.abs(data.scrollDiff) > SCROLL_DIFFERENCE_MINIMUM) {
                this._lastCheck = data.scrollTop;
                if (data.scrollDiff > 0) {
                    let stopAtHeight = (data.scrollTop + data.renderHeight);
                    processRecords(stopAtHeight, this._records, this._cells, this._hdrFn, this._ftrFn, data);
                }
                updateDimensions(this._nodes, this._cells, data, false);
                adjustRendered(this._cells, data);
                let madeChanges = populateNodeData(data.topCell, data.bottomCell, data.viewWidth, data.scrollDiff > 0, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, false);
                if (madeChanges) {
                    this._imgs.forEach(img => {
                        img.enable(false);
                    });
                    this._queue = QUEUE_CHANGE_DETECTION;
                }
                else {
                    this._queue = null;
                }
            }
        }
    }
    onScrollEnd() {
        this._imgs.forEach(img => {
            img.enable(true);
        });
        updateDimensions(this._nodes, this._cells, this._data, false);
        adjustRendered(this._cells, this._data);
        this._cd.detectChanges();
        this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.05));
    }
    setVirtualHeight(newVirtualHeight) {
        if (newVirtualHeight !== this._vHeight) {
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'height', newVirtualHeight > 0 ? newVirtualHeight + 'px' : '');
            this._vHeight = newVirtualHeight;
            (void 0);
        }
    }
    addScrollListener() {
        let self = this;
        if (!self._unreg) {
            self._zone.runOutsideAngular(() => {
                function onScroll() {
                    self._data.scrollTop = self._content.getScrollTop();
                    self.scrollUpdate();
                }
                if (self._eventAssist) {
                    self._unreg = self._content.jsScroll(onScroll);
                }
                else {
                    self._unreg = self._content.addScrollListener(onScroll);
                }
            });
        }
    }
    ngOnDestroy() {
        this._unreg && this._unreg();
        this._unreg = null;
    }
}
VirtualScroll.decorators = [
    { type: Directive, args: [{
                selector: '[virtualScroll]'
            },] },
];
VirtualScroll.ctorParameters = [
    { type: IterableDiffers, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgZone, },
    { type: ChangeDetectorRef, },
    { type: Content, },
    { type: Platform, },
    { type: ViewController, decorators: [{ type: Optional },] },
    { type: Config, },
];
VirtualScroll.propDecorators = {
    '_itmTmp': [{ type: ContentChild, args: [VirtualItem,] },],
    '_hdrTmp': [{ type: ContentChild, args: [VirtualHeader,] },],
    '_ftrTmp': [{ type: ContentChild, args: [VirtualFooter,] },],
    '_imgs': [{ type: ContentChildren, args: [Img,] },],
    'virtualScroll': [{ type: Input },],
    'bufferRatio': [{ type: Input },],
    'approxItemWidth': [{ type: Input },],
    'approxItemHeight': [{ type: Input },],
    'approxHeaderWidth': [{ type: Input },],
    'approxHeaderHeight': [{ type: Input },],
    'approxFooterWidth': [{ type: Input },],
    'approxFooterHeight': [{ type: Input },],
    'headerFn': [{ type: Input },],
    'footerFn': [{ type: Input },],
    'virtualTrackBy': [{ type: Input },],
};
const SCROLL_END_TIMEOUT_MS = 140;
const SCROLL_DIFFERENCE_MINIMUM = 20;
const QUEUE_CHANGE_DETECTION = 0;
//# sourceMappingURL=virtual-scroll.js.map
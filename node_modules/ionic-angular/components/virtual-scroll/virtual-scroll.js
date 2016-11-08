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
export var VirtualScroll = (function () {
    function VirtualScroll(_iterableDiffers, _elementRef, _renderer, _zone, _cd, _content, _platform, _ctrl, config) {
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
    Object.defineProperty(VirtualScroll.prototype, "virtualScroll", {
        set: function (val) {
            this._records = val;
            if (isBlank(this._differ) && isPresent(val)) {
                this._differ = this._iterableDiffers.find(val).create(this._cd, this._trackBy);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroll.prototype, "headerFn", {
        set: function (val) {
            if (isFunction(val)) {
                this._hdrFn = val.bind((this._ctrl && this._ctrl._cmp) || this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroll.prototype, "footerFn", {
        set: function (val) {
            if (isFunction(val)) {
                this._ftrFn = val.bind((this._ctrl && this._ctrl._cmp) || this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroll.prototype, "virtualTrackBy", {
        set: function (val) {
            this._trackBy = val;
        },
        enumerable: true,
        configurable: true
    });
    VirtualScroll.prototype.ngDoCheck = function () {
        if (this._init) {
            this.update(true);
        }
    };
    VirtualScroll.prototype.ngAfterContentInit = function () {
        var _this = this;
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
            this._platform.onResize(function () {
                (void 0);
                _this.update(false);
            });
        }
    };
    VirtualScroll.prototype.update = function (checkChanges) {
        var self = this;
        if (!self._records || !self._records.length)
            return;
        if (checkChanges) {
            if (isPresent(self._differ)) {
                var changes = self._differ.diff(self._records);
                if (!isPresent(changes))
                    return;
            }
        }
        (void 0);
        self._cells.length = 0;
        self._nodes.length = 0;
        self._itmTmp.viewContainer.clear();
        self._elementRef.nativeElement.parentElement.scrollTop = 0;
        var attempts = 0;
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
    };
    VirtualScroll.prototype.renderVirtual = function () {
        this._data.topCell = 0;
        this._data.bottomCell = (this._cells.length - 1);
        populateNodeData(0, this._data.bottomCell, this._data.viewWidth, true, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, true);
        this._cd.detectChanges();
        nativeRaf(this.postRenderVirtual.bind(this));
    };
    VirtualScroll.prototype.postRenderVirtual = function () {
        initReadNodes(this._nodes, this._cells, this._data);
        this._renderer.setElementClass(this._elementRef.nativeElement, 'virtual-scroll', true);
        writeToNodes(this._nodes, this._cells, this._records.length);
        this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
    };
    VirtualScroll.prototype.scrollUpdate = function () {
        clearNativeTimeout(this._tmId);
        this._tmId = nativeTimeout(this.onScrollEnd.bind(this), SCROLL_END_TIMEOUT_MS);
        var data = this._data;
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
                    var stopAtHeight = (data.scrollTop + data.renderHeight);
                    processRecords(stopAtHeight, this._records, this._cells, this._hdrFn, this._ftrFn, data);
                }
                updateDimensions(this._nodes, this._cells, data, false);
                adjustRendered(this._cells, data);
                var madeChanges = populateNodeData(data.topCell, data.bottomCell, data.viewWidth, data.scrollDiff > 0, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, false);
                if (madeChanges) {
                    this._imgs.forEach(function (img) {
                        img.enable(false);
                    });
                    this._queue = QUEUE_CHANGE_DETECTION;
                }
                else {
                    this._queue = null;
                }
            }
        }
    };
    VirtualScroll.prototype.onScrollEnd = function () {
        this._imgs.forEach(function (img) {
            img.enable(true);
        });
        updateDimensions(this._nodes, this._cells, this._data, false);
        adjustRendered(this._cells, this._data);
        this._cd.detectChanges();
        this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.05));
    };
    VirtualScroll.prototype.setVirtualHeight = function (newVirtualHeight) {
        if (newVirtualHeight !== this._vHeight) {
            this._renderer.setElementStyle(this._elementRef.nativeElement, 'height', newVirtualHeight > 0 ? newVirtualHeight + 'px' : '');
            this._vHeight = newVirtualHeight;
            (void 0);
        }
    };
    VirtualScroll.prototype.addScrollListener = function () {
        var self = this;
        if (!self._unreg) {
            self._zone.runOutsideAngular(function () {
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
    };
    VirtualScroll.prototype.ngOnDestroy = function () {
        this._unreg && this._unreg();
        this._unreg = null;
    };
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
    return VirtualScroll;
}());
var SCROLL_END_TIMEOUT_MS = 140;
var SCROLL_DIFFERENCE_MINIMUM = 20;
var QUEUE_CHANGE_DETECTION = 0;
//# sourceMappingURL=virtual-scroll.js.map
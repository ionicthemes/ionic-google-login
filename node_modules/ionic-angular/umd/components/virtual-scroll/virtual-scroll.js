(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './virtual-util', '../../util/dom', '../../config/config', '../content/content', '../img/img', '../../util/util', '../../platform/platform', '../../navigation/view-controller', './virtual-item'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var virtual_util_1 = require('./virtual-util');
    var dom_1 = require('../../util/dom');
    var config_1 = require('../../config/config');
    var content_1 = require('../content/content');
    var img_1 = require('../img/img');
    var util_1 = require('../../util/util');
    var platform_1 = require('../../platform/platform');
    var view_controller_1 = require('../../navigation/view-controller');
    var virtual_item_1 = require('./virtual-item');
    var VirtualScroll = (function () {
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
                if (util_1.isBlank(this._differ) && util_1.isPresent(val)) {
                    this._differ = this._iterableDiffers.find(val).create(this._cd, this._trackBy);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScroll.prototype, "headerFn", {
            set: function (val) {
                if (util_1.isFunction(val)) {
                    this._hdrFn = val.bind((this._ctrl && this._ctrl._cmp) || this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScroll.prototype, "footerFn", {
            set: function (val) {
                if (util_1.isFunction(val)) {
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
                if (util_1.isPresent(self._differ)) {
                    var changes = self._differ.diff(self._records);
                    if (!util_1.isPresent(changes))
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
                    virtual_util_1.calcDimensions(self._data, self._elementRef.nativeElement.parentElement, self.approxItemWidth, self.approxItemHeight, self.approxHeaderWidth, self.approxHeaderHeight, self.approxFooterWidth, self.approxFooterHeight, self.bufferRatio);
                    if (self._data.valid) {
                        done();
                    }
                    else if (attempts < 30) {
                        attempts++;
                        dom_1.nativeRaf(function () {
                            readDimensions(done);
                        });
                    }
                }
            }
            readDimensions(function () {
                virtual_util_1.processRecords(self._data.renderHeight, self._records, self._cells, self._hdrFn, self._ftrFn, self._data);
                self.renderVirtual();
                self.addScrollListener();
            });
        };
        VirtualScroll.prototype.renderVirtual = function () {
            this._data.topCell = 0;
            this._data.bottomCell = (this._cells.length - 1);
            virtual_util_1.populateNodeData(0, this._data.bottomCell, this._data.viewWidth, true, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, true);
            this._cd.detectChanges();
            dom_1.nativeRaf(this.postRenderVirtual.bind(this));
        };
        VirtualScroll.prototype.postRenderVirtual = function () {
            virtual_util_1.initReadNodes(this._nodes, this._cells, this._data);
            this._renderer.setElementClass(this._elementRef.nativeElement, 'virtual-scroll', true);
            virtual_util_1.writeToNodes(this._nodes, this._cells, this._records.length);
            this.setVirtualHeight(virtual_util_1.estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
        };
        VirtualScroll.prototype.scrollUpdate = function () {
            dom_1.clearNativeTimeout(this._tmId);
            this._tmId = dom_1.nativeTimeout(this.onScrollEnd.bind(this), SCROLL_END_TIMEOUT_MS);
            var data = this._data;
            if (this._queue === QUEUE_CHANGE_DETECTION) {
                this._cd.detectChanges();
                virtual_util_1.writeToNodes(this._nodes, this._cells, this._records.length);
                this.setVirtualHeight(virtual_util_1.estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
                this._queue = null;
            }
            else {
                data.scrollDiff = (data.scrollTop - this._lastCheck);
                if (Math.abs(data.scrollDiff) > SCROLL_DIFFERENCE_MINIMUM) {
                    this._lastCheck = data.scrollTop;
                    if (data.scrollDiff > 0) {
                        var stopAtHeight = (data.scrollTop + data.renderHeight);
                        virtual_util_1.processRecords(stopAtHeight, this._records, this._cells, this._hdrFn, this._ftrFn, data);
                    }
                    virtual_util_1.updateDimensions(this._nodes, this._cells, data, false);
                    virtual_util_1.adjustRendered(this._cells, data);
                    var madeChanges = virtual_util_1.populateNodeData(data.topCell, data.bottomCell, data.viewWidth, data.scrollDiff > 0, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, false);
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
            virtual_util_1.updateDimensions(this._nodes, this._cells, this._data, false);
            virtual_util_1.adjustRendered(this._cells, this._data);
            this._cd.detectChanges();
            this.setVirtualHeight(virtual_util_1.estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.05));
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
            { type: core_1.Directive, args: [{
                        selector: '[virtualScroll]'
                    },] },
        ];
        VirtualScroll.ctorParameters = [
            { type: core_1.IterableDiffers, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: core_1.NgZone, },
            { type: core_1.ChangeDetectorRef, },
            { type: content_1.Content, },
            { type: platform_1.Platform, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
            { type: config_1.Config, },
        ];
        VirtualScroll.propDecorators = {
            '_itmTmp': [{ type: core_1.ContentChild, args: [virtual_item_1.VirtualItem,] },],
            '_hdrTmp': [{ type: core_1.ContentChild, args: [virtual_item_1.VirtualHeader,] },],
            '_ftrTmp': [{ type: core_1.ContentChild, args: [virtual_item_1.VirtualFooter,] },],
            '_imgs': [{ type: core_1.ContentChildren, args: [img_1.Img,] },],
            'virtualScroll': [{ type: core_1.Input },],
            'bufferRatio': [{ type: core_1.Input },],
            'approxItemWidth': [{ type: core_1.Input },],
            'approxItemHeight': [{ type: core_1.Input },],
            'approxHeaderWidth': [{ type: core_1.Input },],
            'approxHeaderHeight': [{ type: core_1.Input },],
            'approxFooterWidth': [{ type: core_1.Input },],
            'approxFooterHeight': [{ type: core_1.Input },],
            'headerFn': [{ type: core_1.Input },],
            'footerFn': [{ type: core_1.Input },],
            'virtualTrackBy': [{ type: core_1.Input },],
        };
        return VirtualScroll;
    }());
    exports.VirtualScroll = VirtualScroll;
    var SCROLL_END_TIMEOUT_MS = 140;
    var SCROLL_DIFFERENCE_MINIMUM = 20;
    var QUEUE_CHANGE_DETECTION = 0;
});
//# sourceMappingURL=virtual-scroll.js.map
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../content/content'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var content_1 = require('../content/content');
    var InfiniteScroll = (function () {
        function InfiniteScroll(_content, _zone, _elementRef) {
            this._content = _content;
            this._zone = _zone;
            this._elementRef = _elementRef;
            this._lastCheck = 0;
            this._highestY = 0;
            this._thr = '15%';
            this._thrPx = 0;
            this._thrPc = 0.15;
            this._init = false;
            this.state = STATE_ENABLED;
            this.ionInfinite = new core_1.EventEmitter();
            _content.setElementClass('has-infinite-scroll', true);
        }
        Object.defineProperty(InfiniteScroll.prototype, "threshold", {
            get: function () {
                return this._thr;
            },
            set: function (val) {
                this._thr = val;
                if (val.indexOf('%') > -1) {
                    this._thrPx = 0;
                    this._thrPc = (parseFloat(val) / 100);
                }
                else {
                    this._thrPx = parseFloat(val);
                    this._thrPc = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InfiniteScroll.prototype, "enabled", {
            set: function (shouldEnable) {
                this.enable(shouldEnable);
            },
            enumerable: true,
            configurable: true
        });
        InfiniteScroll.prototype._onScroll = function () {
            var _this = this;
            if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
                return 1;
            }
            var now = Date.now();
            if (this._lastCheck + 32 > now) {
                return 2;
            }
            this._lastCheck = now;
            var infiniteHeight = this._elementRef.nativeElement.scrollHeight;
            if (!infiniteHeight) {
                return 3;
            }
            var d = this._content.getContentDimensions();
            var reloadY = d.contentHeight;
            if (this._thrPc) {
                reloadY += (reloadY * this._thrPc);
            }
            else {
                reloadY += this._thrPx;
            }
            var distanceFromInfinite = ((d.scrollHeight - infiniteHeight) - d.scrollTop) - reloadY;
            if (distanceFromInfinite < 0) {
                this._zone.run(function () {
                    if (_this.state !== STATE_LOADING && _this.state !== STATE_DISABLED) {
                        _this.state = STATE_LOADING;
                        _this.ionInfinite.emit(_this);
                    }
                });
                return 5;
            }
            return 6;
        };
        InfiniteScroll.prototype.complete = function () {
            this.state = STATE_ENABLED;
        };
        InfiniteScroll.prototype.enable = function (shouldEnable) {
            this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
            this._setListeners(shouldEnable);
        };
        InfiniteScroll.prototype._setListeners = function (shouldListen) {
            var _this = this;
            if (this._init) {
                if (shouldListen) {
                    if (!this._scLsn) {
                        this._zone.runOutsideAngular(function () {
                            _this._scLsn = _this._content.addScrollListener(_this._onScroll.bind(_this));
                        });
                    }
                }
                else {
                    this._scLsn && this._scLsn();
                    this._scLsn = null;
                }
            }
        };
        InfiniteScroll.prototype.ngAfterContentInit = function () {
            this._init = true;
            this._setListeners(this.state !== STATE_DISABLED);
        };
        InfiniteScroll.prototype.ngOnDestroy = function () {
            this._setListeners(false);
        };
        InfiniteScroll.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-infinite-scroll'
                    },] },
        ];
        InfiniteScroll.ctorParameters = [
            { type: content_1.Content, decorators: [{ type: core_1.Host },] },
            { type: core_1.NgZone, },
            { type: core_1.ElementRef, },
        ];
        InfiniteScroll.propDecorators = {
            'threshold': [{ type: core_1.Input },],
            'enabled': [{ type: core_1.Input },],
            'ionInfinite': [{ type: core_1.Output },],
        };
        return InfiniteScroll;
    }());
    exports.InfiniteScroll = InfiniteScroll;
    var STATE_ENABLED = 'enabled';
    var STATE_DISABLED = 'disabled';
    var STATE_LOADING = 'loading';
});
//# sourceMappingURL=infinite-scroll.js.map
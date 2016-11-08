(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var util_1 = require('../../util/util');
    var Scroll = (function () {
        function Scroll(_elementRef) {
            this._elementRef = _elementRef;
            this._scrollX = false;
            this._scrollY = false;
            this._zoom = false;
            this._maxZoom = 1;
            this.maxScale = 3;
            this.zoomDuration = 250;
        }
        Object.defineProperty(Scroll.prototype, "scrollX", {
            get: function () {
                return this._scrollX;
            },
            set: function (val) {
                this._scrollX = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroll.prototype, "scrollY", {
            get: function () {
                return this._scrollY;
            },
            set: function (val) {
                this._scrollY = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroll.prototype, "zoom", {
            get: function () {
                return this._zoom;
            },
            set: function (val) {
                this._zoom = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroll.prototype, "maxZoom", {
            get: function () {
                return this._maxZoom;
            },
            set: function (val) {
                this._maxZoom = val;
            },
            enumerable: true,
            configurable: true
        });
        Scroll.prototype.ngOnInit = function () {
            this.scrollElement = this._elementRef.nativeElement.children[0];
        };
        Scroll.prototype.addScrollEventListener = function (handler) {
            var _this = this;
            if (!this.scrollElement) {
                return;
            }
            this.scrollElement.addEventListener('scroll', handler);
            return function () {
                _this.scrollElement.removeEventListener('scroll', handler);
            };
        };
        Scroll.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-scroll',
                        template: '<div class="scroll-content">' +
                            '<div class="scroll-zoom-wrapper">' +
                            '<ng-content></ng-content>' +
                            '</div>' +
                            '</div>',
                        host: {
                            '[class.scroll-x]': 'scrollX',
                            '[class.scroll-y]': 'scrollY'
                        },
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Scroll.ctorParameters = [
            { type: core_1.ElementRef, },
        ];
        Scroll.propDecorators = {
            'scrollX': [{ type: core_1.Input },],
            'scrollY': [{ type: core_1.Input },],
            'zoom': [{ type: core_1.Input },],
            'maxZoom': [{ type: core_1.Input },],
        };
        return Scroll;
    }());
    exports.Scroll = Scroll;
});
//# sourceMappingURL=scroll.js.map
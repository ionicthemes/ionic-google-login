import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { isTrueProperty } from '../../util/util';
export var Scroll = (function () {
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
            this._scrollX = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroll.prototype, "scrollY", {
        get: function () {
            return this._scrollY;
        },
        set: function (val) {
            this._scrollY = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scroll.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (val) {
            this._zoom = isTrueProperty(val);
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
        { type: Component, args: [{
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
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    Scroll.ctorParameters = [
        { type: ElementRef, },
    ];
    Scroll.propDecorators = {
        'scrollX': [{ type: Input },],
        'scrollY': [{ type: Input },],
        'zoom': [{ type: Input },],
        'maxZoom': [{ type: Input },],
    };
    return Scroll;
}());
//# sourceMappingURL=scroll.js.map
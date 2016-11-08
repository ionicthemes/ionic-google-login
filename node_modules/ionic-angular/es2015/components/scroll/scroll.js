import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { isTrueProperty } from '../../util/util';
export class Scroll {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._scrollX = false;
        this._scrollY = false;
        this._zoom = false;
        this._maxZoom = 1;
        this.maxScale = 3;
        this.zoomDuration = 250;
    }
    get scrollX() {
        return this._scrollX;
    }
    set scrollX(val) {
        this._scrollX = isTrueProperty(val);
    }
    get scrollY() {
        return this._scrollY;
    }
    set scrollY(val) {
        this._scrollY = isTrueProperty(val);
    }
    get zoom() {
        return this._zoom;
    }
    set zoom(val) {
        this._zoom = isTrueProperty(val);
    }
    get maxZoom() {
        return this._maxZoom;
    }
    set maxZoom(val) {
        this._maxZoom = val;
    }
    ngOnInit() {
        this.scrollElement = this._elementRef.nativeElement.children[0];
    }
    addScrollEventListener(handler) {
        if (!this.scrollElement) {
            return;
        }
        this.scrollElement.addEventListener('scroll', handler);
        return () => {
            this.scrollElement.removeEventListener('scroll', handler);
        };
    }
}
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
//# sourceMappingURL=scroll.js.map
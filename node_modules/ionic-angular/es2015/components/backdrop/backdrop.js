import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
export class Backdrop {
    constructor(_gestureCtrl, _elementRef, _renderer) {
        this._gestureCtrl = _gestureCtrl;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._gestureID = null;
        this.disableScroll = true;
    }
    ngOnInit() {
        if (isTrueProperty(this.disableScroll)) {
            this._gestureID = this._gestureCtrl.newID();
            this._gestureCtrl.disableScroll(this._gestureID);
        }
    }
    ngOnDestroy() {
        if (this._gestureID) {
            this._gestureCtrl.enableScroll(this._gestureID);
        }
    }
    getNativeElement() {
        return this._elementRef.nativeElement;
    }
    setElementClass(className, add) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, add);
    }
}
Backdrop.decorators = [
    { type: Directive, args: [{
                selector: 'ion-backdrop',
                host: {
                    'role': 'presentation',
                    'tappable': '',
                    'disable-activated': ''
                },
            },] },
];
Backdrop.ctorParameters = [
    { type: GestureController, },
    { type: ElementRef, },
    { type: Renderer, },
];
Backdrop.propDecorators = {
    'disableScroll': [{ type: Input },],
};
//# sourceMappingURL=backdrop.js.map
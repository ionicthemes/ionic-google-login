import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
export var Backdrop = (function () {
    function Backdrop(_gestureCtrl, _elementRef, _renderer) {
        this._gestureCtrl = _gestureCtrl;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._gestureID = null;
        this.disableScroll = true;
    }
    Backdrop.prototype.ngOnInit = function () {
        if (isTrueProperty(this.disableScroll)) {
            this._gestureID = this._gestureCtrl.newID();
            this._gestureCtrl.disableScroll(this._gestureID);
        }
    };
    Backdrop.prototype.ngOnDestroy = function () {
        if (this._gestureID) {
            this._gestureCtrl.enableScroll(this._gestureID);
        }
    };
    Backdrop.prototype.getNativeElement = function () {
        return this._elementRef.nativeElement;
    };
    Backdrop.prototype.setElementClass = function (className, add) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, add);
    };
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
    return Backdrop;
}());
//# sourceMappingURL=backdrop.js.map
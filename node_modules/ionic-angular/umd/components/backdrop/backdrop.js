(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../gestures/gesture-controller', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var util_1 = require('../../util/util');
    var Backdrop = (function () {
        function Backdrop(_gestureCtrl, _elementRef, _renderer) {
            this._gestureCtrl = _gestureCtrl;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._gestureID = null;
            this.disableScroll = true;
        }
        Backdrop.prototype.ngOnInit = function () {
            if (util_1.isTrueProperty(this.disableScroll)) {
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
            { type: core_1.Directive, args: [{
                        selector: 'ion-backdrop',
                        host: {
                            'role': 'presentation',
                            'tappable': '',
                            'disable-activated': ''
                        },
                    },] },
        ];
        Backdrop.ctorParameters = [
            { type: gesture_controller_1.GestureController, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Backdrop.propDecorators = {
            'disableScroll': [{ type: core_1.Input },],
        };
        return Backdrop;
    }());
    exports.Backdrop = Backdrop;
});
//# sourceMappingURL=backdrop.js.map
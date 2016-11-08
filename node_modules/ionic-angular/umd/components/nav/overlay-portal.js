var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../app/app', '../../config/config', '../../navigation/deep-linker', '../../gestures/gesture-controller', '../../util/keyboard', '../../navigation/nav-controller-base', '../../transitions/transition-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var deep_linker_1 = require('../../navigation/deep-linker');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var keyboard_1 = require('../../util/keyboard');
    var nav_controller_base_1 = require('../../navigation/nav-controller-base');
    var transition_controller_1 = require('../../transitions/transition-controller');
    var OverlayPortal = (function (_super) {
        __extends(OverlayPortal, _super);
        function OverlayPortal(app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, viewPort) {
            _super.call(this, null, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
            this._isPortal = true;
            this._init = true;
            this.setViewport(viewPort);
            app.viewDidLeave.subscribe(this.dismissPageChangeViews.bind(this));
        }
        OverlayPortal.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[overlay-portal]'
                    },] },
        ];
        OverlayPortal.ctorParameters = [
            { type: app_1.App, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return app_1.App; }),] },] },
            { type: config_1.Config, },
            { type: keyboard_1.Keyboard, },
            { type: core_1.ElementRef, },
            { type: core_1.NgZone, },
            { type: core_1.Renderer, },
            { type: core_1.ComponentFactoryResolver, },
            { type: gesture_controller_1.GestureController, },
            { type: transition_controller_1.TransitionController, },
            { type: deep_linker_1.DeepLinker, decorators: [{ type: core_1.Optional },] },
            { type: core_1.ViewContainerRef, },
        ];
        return OverlayPortal;
    }(nav_controller_base_1.NavControllerBase));
    exports.OverlayPortal = OverlayPortal;
});
//# sourceMappingURL=overlay-portal.js.map
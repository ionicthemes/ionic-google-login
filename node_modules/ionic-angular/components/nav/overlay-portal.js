var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ComponentFactoryResolver, Directive, ElementRef, forwardRef, Inject, NgZone, Optional, Renderer, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { GestureController } from '../../gestures/gesture-controller';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { TransitionController } from '../../transitions/transition-controller';
export var OverlayPortal = (function (_super) {
    __extends(OverlayPortal, _super);
    function OverlayPortal(app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, viewPort) {
        _super.call(this, null, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
        this._isPortal = true;
        this._init = true;
        this.setViewport(viewPort);
        app.viewDidLeave.subscribe(this.dismissPageChangeViews.bind(this));
    }
    OverlayPortal.decorators = [
        { type: Directive, args: [{
                    selector: '[overlay-portal]'
                },] },
    ];
    OverlayPortal.ctorParameters = [
        { type: App, decorators: [{ type: Inject, args: [forwardRef(function () { return App; }),] },] },
        { type: Config, },
        { type: Keyboard, },
        { type: ElementRef, },
        { type: NgZone, },
        { type: Renderer, },
        { type: ComponentFactoryResolver, },
        { type: GestureController, },
        { type: TransitionController, },
        { type: DeepLinker, decorators: [{ type: Optional },] },
        { type: ViewContainerRef, },
    ];
    return OverlayPortal;
}(NavControllerBase));
//# sourceMappingURL=overlay-portal.js.map
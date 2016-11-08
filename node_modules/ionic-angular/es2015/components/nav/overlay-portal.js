import { ComponentFactoryResolver, Directive, ElementRef, forwardRef, Inject, NgZone, Optional, Renderer, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { GestureController } from '../../gestures/gesture-controller';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { TransitionController } from '../../transitions/transition-controller';
export class OverlayPortal extends NavControllerBase {
    constructor(app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker, viewPort) {
        super(null, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
        this._isPortal = true;
        this._init = true;
        this.setViewport(viewPort);
        app.viewDidLeave.subscribe(this.dismissPageChangeViews.bind(this));
    }
}
OverlayPortal.decorators = [
    { type: Directive, args: [{
                selector: '[overlay-portal]'
            },] },
];
OverlayPortal.ctorParameters = [
    { type: App, decorators: [{ type: Inject, args: [forwardRef(() => App),] },] },
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
//# sourceMappingURL=overlay-portal.js.map
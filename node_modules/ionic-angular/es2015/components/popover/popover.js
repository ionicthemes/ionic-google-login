import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PopoverCmp } from './popover-component';
import { ViewController } from '../../navigation/view-controller';
export class Popover extends ViewController {
    constructor(app, component, data = {}, opts = {}) {
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.component = component;
        data.opts = opts;
        super(PopoverCmp, data, null);
        this._app = app;
        this.isOverlay = true;
    }
    getTransitionName(direction) {
        let key = (direction === 'back' ? 'popoverLeave' : 'popoverEnter');
        return this._nav && this._nav.config.get(key);
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}
export class PopoverController {
    constructor(_app) {
        this._app = _app;
    }
    create(component, data = {}, opts = {}) {
        return new Popover(this._app, component, data, opts);
    }
}
PopoverController.decorators = [
    { type: Injectable },
];
PopoverController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=popover.js.map
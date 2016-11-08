import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { ModalCmp } from './modal-component';
import { ViewController } from '../../navigation/view-controller';
export class Modal extends ViewController {
    constructor(app, component, data = {}, opts = {}) {
        data.component = component;
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        super(ModalCmp, data, null);
        this._app = app;
        this.isOverlay = true;
    }
    getTransitionName(direction) {
        let key = (direction === 'back' ? 'modalLeave' : 'modalEnter');
        return this._nav && this._nav.config.get(key);
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions, AppPortal.MODAL);
    }
}
export class ModalController {
    constructor(_app) {
        this._app = _app;
    }
    create(component, data = {}, opts = {}) {
        return new Modal(this._app, component, data, opts);
    }
}
ModalController.decorators = [
    { type: Injectable },
];
ModalController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=modal.js.map
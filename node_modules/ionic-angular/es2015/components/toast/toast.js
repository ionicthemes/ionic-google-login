import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { ToastCmp } from './toast-component';
import { ViewController } from '../../navigation/view-controller';
export class Toast extends ViewController {
    constructor(app, opts = {}) {
        opts.dismissOnPageChange = isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
        super(ToastCmp, opts, null);
        this._app = app;
        if (!opts.position || !this.isValidPosition(opts.position)) {
            opts.position = TOAST_POSITION_BOTTOM;
        }
        this.isOverlay = true;
    }
    getTransitionName(direction) {
        let key = 'toast' + (direction === 'back' ? 'Leave' : 'Enter');
        return this._nav && this._nav.config.get(key);
    }
    isValidPosition(position) {
        return position === TOAST_POSITION_TOP || position === TOAST_POSITION_MIDDLE || position === TOAST_POSITION_BOTTOM;
    }
    setMessage(message) {
        this.data.message = message;
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions, AppPortal.TOAST);
    }
    dismissAll() {
        this._nav && this._nav.popAll();
    }
}
export class ToastController {
    constructor(_app) {
        this._app = _app;
    }
    create(opts = {}) {
        return new Toast(this._app, opts);
    }
}
ToastController.decorators = [
    { type: Injectable },
];
ToastController.ctorParameters = [
    { type: App, },
];
const TOAST_POSITION_TOP = 'top';
const TOAST_POSITION_MIDDLE = 'middle';
const TOAST_POSITION_BOTTOM = 'bottom';
//# sourceMappingURL=toast.js.map
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AlertCmp } from './alert-component';
import { isPresent } from '../../util/util';
import { ViewController } from '../../navigation/view-controller';
export class Alert extends ViewController {
    constructor(app, opts = {}) {
        opts.inputs = opts.inputs || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        super(AlertCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
    }
    getTransitionName(direction) {
        let key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
        return this._nav && this._nav.config.get(key);
    }
    setTitle(title) {
        this.data.title = title;
    }
    setSubTitle(subTitle) {
        this.data.subTitle = subTitle;
    }
    setMessage(message) {
        this.data.message = message;
    }
    addInput(input) {
        this.data.inputs.push(input);
    }
    addButton(button) {
        this.data.buttons.push(button);
    }
    setCssClass(cssClass) {
        this.data.cssClass = cssClass;
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}
export class AlertController {
    constructor(_app) {
        this._app = _app;
    }
    create(opts = {}) {
        return new Alert(this._app, opts);
    }
}
AlertController.decorators = [
    { type: Injectable },
];
AlertController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=alert.js.map
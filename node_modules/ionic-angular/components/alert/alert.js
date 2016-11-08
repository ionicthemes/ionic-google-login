var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AlertCmp } from './alert-component';
import { isPresent } from '../../util/util';
import { ViewController } from '../../navigation/view-controller';
export var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert(app, opts) {
        if (opts === void 0) { opts = {}; }
        opts.inputs = opts.inputs || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        _super.call(this, AlertCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
    }
    Alert.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'alertLeave' : 'alertEnter');
        return this._nav && this._nav.config.get(key);
    };
    Alert.prototype.setTitle = function (title) {
        this.data.title = title;
    };
    Alert.prototype.setSubTitle = function (subTitle) {
        this.data.subTitle = subTitle;
    };
    Alert.prototype.setMessage = function (message) {
        this.data.message = message;
    };
    Alert.prototype.addInput = function (input) {
        this.data.inputs.push(input);
    };
    Alert.prototype.addButton = function (button) {
        this.data.buttons.push(button);
    };
    Alert.prototype.setCssClass = function (cssClass) {
        this.data.cssClass = cssClass;
    };
    Alert.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions);
    };
    return Alert;
}(ViewController));
export var AlertController = (function () {
    function AlertController(_app) {
        this._app = _app;
    }
    AlertController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Alert(this._app, opts);
    };
    AlertController.decorators = [
        { type: Injectable },
    ];
    AlertController.ctorParameters = [
        { type: App, },
    ];
    return AlertController;
}());
//# sourceMappingURL=alert.js.map
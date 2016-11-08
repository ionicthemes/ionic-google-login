var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { ToastCmp } from './toast-component';
import { ViewController } from '../../navigation/view-controller';
export var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(app, opts) {
        if (opts === void 0) { opts = {}; }
        opts.dismissOnPageChange = isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
        _super.call(this, ToastCmp, opts, null);
        this._app = app;
        if (!opts.position || !this.isValidPosition(opts.position)) {
            opts.position = TOAST_POSITION_BOTTOM;
        }
        this.isOverlay = true;
    }
    Toast.prototype.getTransitionName = function (direction) {
        var key = 'toast' + (direction === 'back' ? 'Leave' : 'Enter');
        return this._nav && this._nav.config.get(key);
    };
    Toast.prototype.isValidPosition = function (position) {
        return position === TOAST_POSITION_TOP || position === TOAST_POSITION_MIDDLE || position === TOAST_POSITION_BOTTOM;
    };
    Toast.prototype.setMessage = function (message) {
        this.data.message = message;
    };
    Toast.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions, AppPortal.TOAST);
    };
    Toast.prototype.dismissAll = function () {
        this._nav && this._nav.popAll();
    };
    return Toast;
}(ViewController));
export var ToastController = (function () {
    function ToastController(_app) {
        this._app = _app;
    }
    ToastController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Toast(this._app, opts);
    };
    ToastController.decorators = [
        { type: Injectable },
    ];
    ToastController.ctorParameters = [
        { type: App, },
    ];
    return ToastController;
}());
var TOAST_POSITION_TOP = 'top';
var TOAST_POSITION_MIDDLE = 'middle';
var TOAST_POSITION_BOTTOM = 'bottom';
//# sourceMappingURL=toast.js.map
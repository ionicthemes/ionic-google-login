var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { ModalCmp } from './modal-component';
import { ViewController } from '../../navigation/view-controller';
export var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(app, component, data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        data.component = component;
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        _super.call(this, ModalCmp, data, null);
        this._app = app;
        this.isOverlay = true;
    }
    Modal.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'modalLeave' : 'modalEnter');
        return this._nav && this._nav.config.get(key);
    };
    Modal.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions, AppPortal.MODAL);
    };
    return Modal;
}(ViewController));
export var ModalController = (function () {
    function ModalController(_app) {
        this._app = _app;
    }
    ModalController.prototype.create = function (component, data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        return new Modal(this._app, component, data, opts);
    };
    ModalController.decorators = [
        { type: Injectable },
    ];
    ModalController.ctorParameters = [
        { type: App, },
    ];
    return ModalController;
}());
//# sourceMappingURL=modal.js.map
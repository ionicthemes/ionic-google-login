var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { LoadingCmp } from './loading-component';
import { ViewController } from '../../navigation/view-controller';
export var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading(app, opts) {
        if (opts === void 0) { opts = {}; }
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.dismissOnPageChange = isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
        _super.call(this, LoadingCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
    }
    Loading.prototype.getTransitionName = function (direction) {
        var key = (direction === 'back' ? 'loadingLeave' : 'loadingEnter');
        return this._nav && this._nav.config.get(key);
    };
    Loading.prototype.setContent = function (content) {
        this.data.content = content;
    };
    Loading.prototype.present = function (navOptions) {
        if (navOptions === void 0) { navOptions = {}; }
        return this._app.present(this, navOptions, AppPortal.LOADING);
    };
    Loading.prototype.dismissAll = function () {
        this._nav && this._nav.popAll();
    };
    return Loading;
}(ViewController));
export var LoadingController = (function () {
    function LoadingController(_app) {
        this._app = _app;
    }
    LoadingController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new Loading(this._app, opts);
    };
    LoadingController.decorators = [
        { type: Injectable },
    ];
    LoadingController.ctorParameters = [
        { type: App, },
    ];
    return LoadingController;
}());
//# sourceMappingURL=loading.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../app/app', '../app/app-root', '../../util/util', './loading-component', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var app_root_1 = require('../app/app-root');
    var util_1 = require('../../util/util');
    var loading_component_1 = require('./loading-component');
    var view_controller_1 = require('../../navigation/view-controller');
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading(app, opts) {
            if (opts === void 0) { opts = {}; }
            opts.showBackdrop = util_1.isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
            opts.dismissOnPageChange = util_1.isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
            _super.call(this, loading_component_1.LoadingCmp, opts, null);
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
            return this._app.present(this, navOptions, app_root_1.AppPortal.LOADING);
        };
        Loading.prototype.dismissAll = function () {
            this._nav && this._nav.popAll();
        };
        return Loading;
    }(view_controller_1.ViewController));
    exports.Loading = Loading;
    var LoadingController = (function () {
        function LoadingController(_app) {
            this._app = _app;
        }
        LoadingController.prototype.create = function (opts) {
            if (opts === void 0) { opts = {}; }
            return new Loading(this._app, opts);
        };
        LoadingController.decorators = [
            { type: core_1.Injectable },
        ];
        LoadingController.ctorParameters = [
            { type: app_1.App, },
        ];
        return LoadingController;
    }());
    exports.LoadingController = LoadingController;
});
//# sourceMappingURL=loading.js.map
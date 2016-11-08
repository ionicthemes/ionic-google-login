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
        define(["require", "exports", '@angular/core', '../app/app', '../app/app-root', '../../util/util', './toast-component', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var app_root_1 = require('../app/app-root');
    var util_1 = require('../../util/util');
    var toast_component_1 = require('./toast-component');
    var view_controller_1 = require('../../navigation/view-controller');
    var Toast = (function (_super) {
        __extends(Toast, _super);
        function Toast(app, opts) {
            if (opts === void 0) { opts = {}; }
            opts.dismissOnPageChange = util_1.isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
            _super.call(this, toast_component_1.ToastCmp, opts, null);
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
            return this._app.present(this, navOptions, app_root_1.AppPortal.TOAST);
        };
        Toast.prototype.dismissAll = function () {
            this._nav && this._nav.popAll();
        };
        return Toast;
    }(view_controller_1.ViewController));
    exports.Toast = Toast;
    var ToastController = (function () {
        function ToastController(_app) {
            this._app = _app;
        }
        ToastController.prototype.create = function (opts) {
            if (opts === void 0) { opts = {}; }
            return new Toast(this._app, opts);
        };
        ToastController.decorators = [
            { type: core_1.Injectable },
        ];
        ToastController.ctorParameters = [
            { type: app_1.App, },
        ];
        return ToastController;
    }());
    exports.ToastController = ToastController;
    var TOAST_POSITION_TOP = 'top';
    var TOAST_POSITION_MIDDLE = 'middle';
    var TOAST_POSITION_BOTTOM = 'bottom';
});
//# sourceMappingURL=toast.js.map
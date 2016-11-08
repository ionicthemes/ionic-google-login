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
        define(["require", "exports", '@angular/core', '../app/app', './alert-component', '../../util/util', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var alert_component_1 = require('./alert-component');
    var util_1 = require('../../util/util');
    var view_controller_1 = require('../../navigation/view-controller');
    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert(app, opts) {
            if (opts === void 0) { opts = {}; }
            opts.inputs = opts.inputs || [];
            opts.buttons = opts.buttons || [];
            opts.enableBackdropDismiss = util_1.isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
            _super.call(this, alert_component_1.AlertCmp, opts, null);
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
    }(view_controller_1.ViewController));
    exports.Alert = Alert;
    var AlertController = (function () {
        function AlertController(_app) {
            this._app = _app;
        }
        AlertController.prototype.create = function (opts) {
            if (opts === void 0) { opts = {}; }
            return new Alert(this._app, opts);
        };
        AlertController.decorators = [
            { type: core_1.Injectable },
        ];
        AlertController.ctorParameters = [
            { type: app_1.App, },
        ];
        return AlertController;
    }());
    exports.AlertController = AlertController;
});
//# sourceMappingURL=alert.js.map
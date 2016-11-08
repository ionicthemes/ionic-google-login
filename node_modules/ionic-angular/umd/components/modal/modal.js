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
        define(["require", "exports", '@angular/core', '../app/app', '../app/app-root', '../../util/util', './modal-component', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var app_root_1 = require('../app/app-root');
    var util_1 = require('../../util/util');
    var modal_component_1 = require('./modal-component');
    var view_controller_1 = require('../../navigation/view-controller');
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(app, component, data, opts) {
            if (data === void 0) { data = {}; }
            if (opts === void 0) { opts = {}; }
            data.component = component;
            opts.showBackdrop = util_1.isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
            opts.enableBackdropDismiss = util_1.isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
            data.opts = opts;
            _super.call(this, modal_component_1.ModalCmp, data, null);
            this._app = app;
            this.isOverlay = true;
        }
        Modal.prototype.getTransitionName = function (direction) {
            var key = (direction === 'back' ? 'modalLeave' : 'modalEnter');
            return this._nav && this._nav.config.get(key);
        };
        Modal.prototype.present = function (navOptions) {
            if (navOptions === void 0) { navOptions = {}; }
            return this._app.present(this, navOptions, app_root_1.AppPortal.MODAL);
        };
        return Modal;
    }(view_controller_1.ViewController));
    exports.Modal = Modal;
    var ModalController = (function () {
        function ModalController(_app) {
            this._app = _app;
        }
        ModalController.prototype.create = function (component, data, opts) {
            if (data === void 0) { data = {}; }
            if (opts === void 0) { opts = {}; }
            return new Modal(this._app, component, data, opts);
        };
        ModalController.decorators = [
            { type: core_1.Injectable },
        ];
        ModalController.ctorParameters = [
            { type: app_1.App, },
        ];
        return ModalController;
    }());
    exports.ModalController = ModalController;
});
//# sourceMappingURL=modal.js.map
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
        define(["require", "exports", '@angular/core', '../app/app', '../../util/util', './popover-component', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var util_1 = require('../../util/util');
    var popover_component_1 = require('./popover-component');
    var view_controller_1 = require('../../navigation/view-controller');
    var Popover = (function (_super) {
        __extends(Popover, _super);
        function Popover(app, component, data, opts) {
            if (data === void 0) { data = {}; }
            if (opts === void 0) { opts = {}; }
            opts.showBackdrop = util_1.isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
            opts.enableBackdropDismiss = util_1.isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
            data.component = component;
            data.opts = opts;
            _super.call(this, popover_component_1.PopoverCmp, data, null);
            this._app = app;
            this.isOverlay = true;
        }
        Popover.prototype.getTransitionName = function (direction) {
            var key = (direction === 'back' ? 'popoverLeave' : 'popoverEnter');
            return this._nav && this._nav.config.get(key);
        };
        Popover.prototype.present = function (navOptions) {
            if (navOptions === void 0) { navOptions = {}; }
            return this._app.present(this, navOptions);
        };
        return Popover;
    }(view_controller_1.ViewController));
    exports.Popover = Popover;
    var PopoverController = (function () {
        function PopoverController(_app) {
            this._app = _app;
        }
        PopoverController.prototype.create = function (component, data, opts) {
            if (data === void 0) { data = {}; }
            if (opts === void 0) { opts = {}; }
            return new Popover(this._app, component, data, opts);
        };
        PopoverController.decorators = [
            { type: core_1.Injectable },
        ];
        PopoverController.ctorParameters = [
            { type: app_1.App, },
        ];
        return PopoverController;
    }());
    exports.PopoverController = PopoverController;
});
//# sourceMappingURL=popover.js.map
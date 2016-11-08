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
        define(["require", "exports", '@angular/core', './action-sheet-component', '../app/app', '../../util/util', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var action_sheet_component_1 = require('./action-sheet-component');
    var app_1 = require('../app/app');
    var util_1 = require('../../util/util');
    var view_controller_1 = require('../../navigation/view-controller');
    var ActionSheet = (function (_super) {
        __extends(ActionSheet, _super);
        function ActionSheet(app, opts) {
            opts.buttons = opts.buttons || [];
            opts.enableBackdropDismiss = util_1.isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
            _super.call(this, action_sheet_component_1.ActionSheetCmp, opts, null);
            this._app = app;
            this.isOverlay = true;
        }
        ActionSheet.prototype.getTransitionName = function (direction) {
            var key = 'actionSheet' + (direction === 'back' ? 'Leave' : 'Enter');
            return this._nav && this._nav.config.get(key);
        };
        ActionSheet.prototype.setTitle = function (title) {
            this.data.title = title;
        };
        ActionSheet.prototype.setSubTitle = function (subTitle) {
            this.data.subTitle = subTitle;
        };
        ActionSheet.prototype.addButton = function (button) {
            this.data.buttons.push(button);
        };
        ActionSheet.prototype.present = function (navOptions) {
            if (navOptions === void 0) { navOptions = {}; }
            return this._app.present(this, navOptions);
        };
        return ActionSheet;
    }(view_controller_1.ViewController));
    exports.ActionSheet = ActionSheet;
    var ActionSheetController = (function () {
        function ActionSheetController(_app) {
            this._app = _app;
        }
        ActionSheetController.prototype.create = function (opts) {
            if (opts === void 0) { opts = {}; }
            return new ActionSheet(this._app, opts);
        };
        ActionSheetController.decorators = [
            { type: core_1.Injectable },
        ];
        ActionSheetController.ctorParameters = [
            { type: app_1.App, },
        ];
        return ActionSheetController;
    }());
    exports.ActionSheetController = ActionSheetController;
});
//# sourceMappingURL=action-sheet.js.map
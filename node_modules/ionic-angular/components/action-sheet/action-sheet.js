var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { ActionSheetCmp } from './action-sheet-component';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { ViewController } from '../../navigation/view-controller';
export var ActionSheet = (function (_super) {
    __extends(ActionSheet, _super);
    function ActionSheet(app, opts) {
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        _super.call(this, ActionSheetCmp, opts, null);
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
}(ViewController));
export var ActionSheetController = (function () {
    function ActionSheetController(_app) {
        this._app = _app;
    }
    ActionSheetController.prototype.create = function (opts) {
        if (opts === void 0) { opts = {}; }
        return new ActionSheet(this._app, opts);
    };
    ActionSheetController.decorators = [
        { type: Injectable },
    ];
    ActionSheetController.ctorParameters = [
        { type: App, },
    ];
    return ActionSheetController;
}());
//# sourceMappingURL=action-sheet.js.map
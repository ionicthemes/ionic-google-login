var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PopoverCmp } from './popover-component';
import { ViewController } from '../../navigation/view-controller';
export var Popover = (function (_super) {
    __extends(Popover, _super);
    function Popover(app, component, data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.component = component;
        data.opts = opts;
        _super.call(this, PopoverCmp, data, null);
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
}(ViewController));
export var PopoverController = (function () {
    function PopoverController(_app) {
        this._app = _app;
    }
    PopoverController.prototype.create = function (component, data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        return new Popover(this._app, component, data, opts);
    };
    PopoverController.decorators = [
        { type: Injectable },
    ];
    PopoverController.ctorParameters = [
        { type: App, },
    ];
    return PopoverController;
}());
//# sourceMappingURL=popover.js.map
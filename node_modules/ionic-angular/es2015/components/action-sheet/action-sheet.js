import { Injectable } from '@angular/core';
import { ActionSheetCmp } from './action-sheet-component';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { ViewController } from '../../navigation/view-controller';
export class ActionSheet extends ViewController {
    constructor(app, opts) {
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        super(ActionSheetCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
    }
    getTransitionName(direction) {
        let key = 'actionSheet' + (direction === 'back' ? 'Leave' : 'Enter');
        return this._nav && this._nav.config.get(key);
    }
    setTitle(title) {
        this.data.title = title;
    }
    setSubTitle(subTitle) {
        this.data.subTitle = subTitle;
    }
    addButton(button) {
        this.data.buttons.push(button);
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}
export class ActionSheetController {
    constructor(_app) {
        this._app = _app;
    }
    create(opts = {}) {
        return new ActionSheet(this._app, opts);
    }
}
ActionSheetController.decorators = [
    { type: Injectable },
];
ActionSheetController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=action-sheet.js.map
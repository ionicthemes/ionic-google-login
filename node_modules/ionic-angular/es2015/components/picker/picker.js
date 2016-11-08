import { EventEmitter, Injectable, Output } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PickerCmp } from './picker-component';
import { ViewController } from '../../navigation/view-controller';
export class Picker extends ViewController {
    constructor(app, opts = {}) {
        opts.columns = opts.columns || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        super(PickerCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
        this.ionChange = new EventEmitter();
    }
    getTransitionName(direction) {
        let key = (direction === 'back' ? 'pickerLeave' : 'pickerEnter');
        return this._nav && this._nav.config.get(key);
    }
    addButton(button) {
        this.data.buttons.push(button);
    }
    addColumn(column) {
        this.data.columns.push(column);
    }
    getColumns() {
        return this.data.columns;
    }
    refresh() {
        this._cmp && this._cmp.instance.refresh && this._cmp.instance.refresh();
    }
    setCssClass(cssClass) {
        this.data.cssClass = cssClass;
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions);
    }
}
Picker.propDecorators = {
    'ionChange': [{ type: Output },],
};
export class PickerController {
    constructor(_app) {
        this._app = _app;
    }
    create(opts = {}) {
        return new Picker(this._app, opts);
    }
}
PickerController.decorators = [
    { type: Injectable },
];
PickerController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=picker.js.map
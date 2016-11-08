import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { LoadingCmp } from './loading-component';
import { ViewController } from '../../navigation/view-controller';
export class Loading extends ViewController {
    constructor(app, opts = {}) {
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.dismissOnPageChange = isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;
        super(LoadingCmp, opts, null);
        this._app = app;
        this.isOverlay = true;
    }
    getTransitionName(direction) {
        let key = (direction === 'back' ? 'loadingLeave' : 'loadingEnter');
        return this._nav && this._nav.config.get(key);
    }
    setContent(content) {
        this.data.content = content;
    }
    present(navOptions = {}) {
        return this._app.present(this, navOptions, AppPortal.LOADING);
    }
    dismissAll() {
        this._nav && this._nav.popAll();
    }
}
export class LoadingController {
    constructor(_app) {
        this._app = _app;
    }
    create(opts = {}) {
        return new Loading(this._app, opts);
    }
}
LoadingController.decorators = [
    { type: Injectable },
];
LoadingController.ctorParameters = [
    { type: App, },
];
//# sourceMappingURL=loading.js.map
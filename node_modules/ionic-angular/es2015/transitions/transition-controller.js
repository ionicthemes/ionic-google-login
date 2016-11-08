import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { isPresent } from '../util/util';
import { createTransition } from './transition-registry';
export class TransitionController {
    constructor(_config) {
        this._config = _config;
        this._ids = 0;
        this._trns = {};
    }
    getRootTrnsId(nav) {
        let parent = nav.parent;
        while (parent) {
            if (isPresent(parent._trnsId)) {
                return parent._trnsId;
            }
            parent = parent.parent;
        }
        return null;
    }
    nextId() {
        return this._ids++;
    }
    get(trnsId, enteringView, leavingView, opts) {
        const trns = createTransition(this._config, opts.animation, enteringView, leavingView, opts);
        trns.trnsId = trnsId;
        if (!this._trns[trnsId]) {
            this._trns[trnsId] = trns;
        }
        else {
            this._trns[trnsId].add(trns);
        }
        return trns;
    }
    destroy(trnsId) {
        if (this._trns[trnsId]) {
            this._trns[trnsId].destroy();
            delete this._trns[trnsId];
        }
    }
}
TransitionController.decorators = [
    { type: Injectable },
];
TransitionController.ctorParameters = [
    { type: Config, },
];
//# sourceMappingURL=transition-controller.js.map
import { forwardRef, Inject, Injectable } from '@angular/core';
import { App } from '../components/app/app';
export class GestureController {
    constructor(_app) {
        this._app = _app;
        this.id = 1;
        this.requestedStart = {};
        this.disabledGestures = {};
        this.disabledScroll = new Set();
        this.capturedID = null;
    }
    create(name, opts = {}) {
        return new GestureDelegate(name, this.newID(), this, opts);
    }
    newID() {
        let id = this.id;
        this.id++;
        return id;
    }
    start(gestureName, id, priority) {
        if (!this.canStart(gestureName)) {
            delete this.requestedStart[id];
            return false;
        }
        this.requestedStart[id] = priority;
        return true;
    }
    capture(gestureName, id, priority) {
        if (!this.start(gestureName, id, priority)) {
            return false;
        }
        let requestedStart = this.requestedStart;
        let maxPriority = -10000;
        for (let gestureID in requestedStart) {
            maxPriority = Math.max(maxPriority, requestedStart[gestureID]);
        }
        if (maxPriority === priority) {
            this.capturedID = id;
            this.requestedStart = {};
            return true;
        }
        delete requestedStart[id];
        (void 0);
        return false;
    }
    release(id) {
        delete this.requestedStart[id];
        if (this.capturedID && id === this.capturedID) {
            this.capturedID = null;
        }
    }
    disableGesture(gestureName, id) {
        let set = this.disabledGestures[gestureName];
        if (!set) {
            set = new Set();
            this.disabledGestures[gestureName] = set;
        }
        set.add(id);
    }
    enableGesture(gestureName, id) {
        let set = this.disabledGestures[gestureName];
        if (set) {
            set.delete(id);
        }
    }
    disableScroll(id) {
        let isEnabled = !this.isScrollDisabled();
        this.disabledScroll.add(id);
        if (this._app && isEnabled && this.isScrollDisabled()) {
            (void 0);
            this._app.setScrollDisabled(true);
        }
    }
    enableScroll(id) {
        let isDisabled = this.isScrollDisabled();
        this.disabledScroll.delete(id);
        if (this._app && isDisabled && !this.isScrollDisabled()) {
            (void 0);
            this._app.setScrollDisabled(false);
        }
    }
    canStart(gestureName) {
        if (this.capturedID) {
            return false;
        }
        if (this.isDisabled(gestureName)) {
            return false;
        }
        return true;
    }
    isCaptured() {
        return !!this.capturedID;
    }
    isScrollDisabled() {
        return this.disabledScroll.size > 0;
    }
    isDisabled(gestureName) {
        let disabled = this.disabledGestures[gestureName];
        if (disabled && disabled.size > 0) {
            return true;
        }
        return false;
    }
}
GestureController.decorators = [
    { type: Injectable },
];
GestureController.ctorParameters = [
    { type: App, decorators: [{ type: Inject, args: [forwardRef(() => App),] },] },
];
export class GestureDelegate {
    constructor(name, id, controller, opts) {
        this.name = name;
        this.id = id;
        this.controller = controller;
        this.priority = 0;
        this.disable = opts.disable || [];
        this.disableScroll = opts.disableScroll || 0;
        this.priority = opts.priority || 0;
        for (let gestureName of this.disable) {
            controller.disableGesture(gestureName, id);
        }
        if (this.disableScroll === 2) {
            controller.disableScroll(id);
        }
    }
    canStart() {
        if (!this.controller) {
            return false;
        }
        return this.controller.canStart(this.name);
    }
    start() {
        if (!this.controller) {
            return false;
        }
        return this.controller.start(this.name, this.id, this.priority);
    }
    capture() {
        if (!this.controller) {
            return false;
        }
        let captured = this.controller.capture(this.name, this.id, this.priority);
        if (captured && this.disableScroll === 1) {
            this.controller.disableScroll(this.id);
        }
        return captured;
    }
    release() {
        if (!this.controller) {
            return;
        }
        this.controller.release(this.id);
        if (this.disableScroll === 1) {
            this.controller.enableScroll(this.id);
        }
    }
    destroy() {
        if (!this.controller) {
            return;
        }
        this.release();
        for (let disabled of this.disable) {
            this.controller.enableGesture(disabled, this.id);
        }
        if (this.disableScroll === 2) {
            this.controller.enableScroll(this.id);
        }
        this.controller = null;
    }
}
//# sourceMappingURL=gesture-controller.js.map
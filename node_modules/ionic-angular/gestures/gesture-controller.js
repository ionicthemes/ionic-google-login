import { forwardRef, Inject, Injectable } from '@angular/core';
import { App } from '../components/app/app';
export var GestureController = (function () {
    function GestureController(_app) {
        this._app = _app;
        this.id = 1;
        this.requestedStart = {};
        this.disabledGestures = {};
        this.disabledScroll = new Set();
        this.capturedID = null;
    }
    GestureController.prototype.create = function (name, opts) {
        if (opts === void 0) { opts = {}; }
        return new GestureDelegate(name, this.newID(), this, opts);
    };
    GestureController.prototype.newID = function () {
        var id = this.id;
        this.id++;
        return id;
    };
    GestureController.prototype.start = function (gestureName, id, priority) {
        if (!this.canStart(gestureName)) {
            delete this.requestedStart[id];
            return false;
        }
        this.requestedStart[id] = priority;
        return true;
    };
    GestureController.prototype.capture = function (gestureName, id, priority) {
        if (!this.start(gestureName, id, priority)) {
            return false;
        }
        var requestedStart = this.requestedStart;
        var maxPriority = -10000;
        for (var gestureID in requestedStart) {
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
    };
    GestureController.prototype.release = function (id) {
        delete this.requestedStart[id];
        if (this.capturedID && id === this.capturedID) {
            this.capturedID = null;
        }
    };
    GestureController.prototype.disableGesture = function (gestureName, id) {
        var set = this.disabledGestures[gestureName];
        if (!set) {
            set = new Set();
            this.disabledGestures[gestureName] = set;
        }
        set.add(id);
    };
    GestureController.prototype.enableGesture = function (gestureName, id) {
        var set = this.disabledGestures[gestureName];
        if (set) {
            set.delete(id);
        }
    };
    GestureController.prototype.disableScroll = function (id) {
        var isEnabled = !this.isScrollDisabled();
        this.disabledScroll.add(id);
        if (this._app && isEnabled && this.isScrollDisabled()) {
            (void 0);
            this._app.setScrollDisabled(true);
        }
    };
    GestureController.prototype.enableScroll = function (id) {
        var isDisabled = this.isScrollDisabled();
        this.disabledScroll.delete(id);
        if (this._app && isDisabled && !this.isScrollDisabled()) {
            (void 0);
            this._app.setScrollDisabled(false);
        }
    };
    GestureController.prototype.canStart = function (gestureName) {
        if (this.capturedID) {
            return false;
        }
        if (this.isDisabled(gestureName)) {
            return false;
        }
        return true;
    };
    GestureController.prototype.isCaptured = function () {
        return !!this.capturedID;
    };
    GestureController.prototype.isScrollDisabled = function () {
        return this.disabledScroll.size > 0;
    };
    GestureController.prototype.isDisabled = function (gestureName) {
        var disabled = this.disabledGestures[gestureName];
        if (disabled && disabled.size > 0) {
            return true;
        }
        return false;
    };
    GestureController.decorators = [
        { type: Injectable },
    ];
    GestureController.ctorParameters = [
        { type: App, decorators: [{ type: Inject, args: [forwardRef(function () { return App; }),] },] },
    ];
    return GestureController;
}());
export var GestureDelegate = (function () {
    function GestureDelegate(name, id, controller, opts) {
        this.name = name;
        this.id = id;
        this.controller = controller;
        this.priority = 0;
        this.disable = opts.disable || [];
        this.disableScroll = opts.disableScroll || 0;
        this.priority = opts.priority || 0;
        for (var _i = 0, _a = this.disable; _i < _a.length; _i++) {
            var gestureName = _a[_i];
            controller.disableGesture(gestureName, id);
        }
        if (this.disableScroll === 2) {
            controller.disableScroll(id);
        }
    }
    GestureDelegate.prototype.canStart = function () {
        if (!this.controller) {
            return false;
        }
        return this.controller.canStart(this.name);
    };
    GestureDelegate.prototype.start = function () {
        if (!this.controller) {
            return false;
        }
        return this.controller.start(this.name, this.id, this.priority);
    };
    GestureDelegate.prototype.capture = function () {
        if (!this.controller) {
            return false;
        }
        var captured = this.controller.capture(this.name, this.id, this.priority);
        if (captured && this.disableScroll === 1) {
            this.controller.disableScroll(this.id);
        }
        return captured;
    };
    GestureDelegate.prototype.release = function () {
        if (!this.controller) {
            return;
        }
        this.controller.release(this.id);
        if (this.disableScroll === 1) {
            this.controller.enableScroll(this.id);
        }
    };
    GestureDelegate.prototype.destroy = function () {
        if (!this.controller) {
            return;
        }
        this.release();
        for (var _i = 0, _a = this.disable; _i < _a.length; _i++) {
            var disabled = _a[_i];
            this.controller.enableGesture(disabled, this.id);
        }
        if (this.disableScroll === 2) {
            this.controller.enableScroll(this.id);
        }
        this.controller = null;
    };
    return GestureDelegate;
}());
//# sourceMappingURL=gesture-controller.js.map
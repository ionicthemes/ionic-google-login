import { Injectable } from '@angular/core';
import { Platform } from '../platform/platform';
export var Haptic = (function () {
    function Haptic(platform) {
        var _this = this;
        if (platform) {
            platform.ready().then(function () {
                _this.plugin = window.TapticEngine;
            });
        }
    }
    Haptic.prototype.available = function () {
        return !!this.plugin;
    };
    Haptic.prototype.selection = function () {
        if (!this.plugin) {
            return;
        }
        this.plugin.selection();
    };
    Haptic.prototype.gestureSelectionStart = function () {
        if (!this.plugin) {
            return;
        }
        this.plugin.gestureSelectionStart();
    };
    Haptic.prototype.gestureSelectionChanged = function () {
        if (!this.plugin) {
            return;
        }
        this.plugin.gestureSelectionChanged();
    };
    Haptic.prototype.gestureSelectionEnd = function () {
        if (!this.plugin) {
            return;
        }
        this.plugin.gestureSelectionEnd();
    };
    Haptic.prototype.notification = function (options) {
        if (!this.plugin) {
            return;
        }
        this.plugin.notification(options);
    };
    Haptic.prototype.impact = function (options) {
        if (!this.plugin) {
            return;
        }
        this.plugin.impact(options);
    };
    Haptic.decorators = [
        { type: Injectable },
    ];
    Haptic.ctorParameters = [
        { type: Platform, },
    ];
    return Haptic;
}());
//# sourceMappingURL=haptic.js.map
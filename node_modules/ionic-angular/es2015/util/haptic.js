import { Injectable } from '@angular/core';
import { Platform } from '../platform/platform';
export class Haptic {
    constructor(platform) {
        if (platform) {
            platform.ready().then(() => {
                this.plugin = window.TapticEngine;
            });
        }
    }
    available() {
        return !!this.plugin;
    }
    selection() {
        if (!this.plugin) {
            return;
        }
        this.plugin.selection();
    }
    gestureSelectionStart() {
        if (!this.plugin) {
            return;
        }
        this.plugin.gestureSelectionStart();
    }
    gestureSelectionChanged() {
        if (!this.plugin) {
            return;
        }
        this.plugin.gestureSelectionChanged();
    }
    gestureSelectionEnd() {
        if (!this.plugin) {
            return;
        }
        this.plugin.gestureSelectionEnd();
    }
    notification(options) {
        if (!this.plugin) {
            return;
        }
        this.plugin.notification(options);
    }
    impact(options) {
        if (!this.plugin) {
            return;
        }
        this.plugin.impact(options);
    }
}
Haptic.decorators = [
    { type: Injectable },
];
Haptic.ctorParameters = [
    { type: Platform, },
];
//# sourceMappingURL=haptic.js.map
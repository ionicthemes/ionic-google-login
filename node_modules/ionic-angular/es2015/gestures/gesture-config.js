import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';
export class IonicGestureConfig extends HammerGestureConfig {
    buildHammer(element) {
        const mc = new window.Hammer(element);
        for (let eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}
IonicGestureConfig.decorators = [
    { type: Injectable },
];
IonicGestureConfig.ctorParameters = [];
//# sourceMappingURL=gesture-config.js.map
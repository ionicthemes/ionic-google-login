import { Attribute, Directive, NgZone } from '@angular/core';
import { Platform } from '../../platform/platform';
export class DisplayWhen {
    constructor(conditions, platform, zone) {
        this.platform = platform;
        this.zone = zone;
        this.isMatch = false;
        this.platform = platform;
        if (!conditions)
            return;
        this.conditions = conditions.split(',');
        for (let i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] && platform.is(this.conditions[i])) {
                this.isMatch = true;
                return;
            }
        }
        if (this.orientation()) {
            platform.onResize(() => {
                zone.run(() => {
                    this.orientation();
                });
            });
            return;
        }
    }
    orientation() {
        for (let i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] === 'portrait') {
                this.isMatch = this.platform.isPortrait();
                return true;
            }
            if (this.conditions[i] === 'landscape') {
                this.isMatch = this.platform.isLandscape();
                return true;
            }
        }
    }
}
export class ShowWhen extends DisplayWhen {
    constructor(showWhen, platform, zone) {
        super(showWhen, platform, zone);
    }
}
ShowWhen.decorators = [
    { type: Directive, args: [{
                selector: '[showWhen]',
                host: {
                    '[class.hidden-show-when]': '!isMatch'
                }
            },] },
];
ShowWhen.ctorParameters = [
    { type: undefined, decorators: [{ type: Attribute, args: ['showWhen',] },] },
    { type: Platform, },
    { type: NgZone, },
];
export class HideWhen extends DisplayWhen {
    constructor(hideWhen, platform, zone) {
        super(hideWhen, platform, zone);
    }
}
HideWhen.decorators = [
    { type: Directive, args: [{
                selector: '[hideWhen]',
                host: {
                    '[class.hidden-hide-when]': 'isMatch'
                }
            },] },
];
HideWhen.ctorParameters = [
    { type: undefined, decorators: [{ type: Attribute, args: ['hideWhen',] },] },
    { type: Platform, },
    { type: NgZone, },
];
//# sourceMappingURL=show-hide-when.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Attribute, Directive, NgZone } from '@angular/core';
import { Platform } from '../../platform/platform';
export var DisplayWhen = (function () {
    function DisplayWhen(conditions, platform, zone) {
        var _this = this;
        this.platform = platform;
        this.zone = zone;
        this.isMatch = false;
        this.platform = platform;
        if (!conditions)
            return;
        this.conditions = conditions.split(',');
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] && platform.is(this.conditions[i])) {
                this.isMatch = true;
                return;
            }
        }
        if (this.orientation()) {
            platform.onResize(function () {
                zone.run(function () {
                    _this.orientation();
                });
            });
            return;
        }
    }
    DisplayWhen.prototype.orientation = function () {
        for (var i = 0; i < this.conditions.length; i++) {
            if (this.conditions[i] === 'portrait') {
                this.isMatch = this.platform.isPortrait();
                return true;
            }
            if (this.conditions[i] === 'landscape') {
                this.isMatch = this.platform.isLandscape();
                return true;
            }
        }
    };
    return DisplayWhen;
}());
export var ShowWhen = (function (_super) {
    __extends(ShowWhen, _super);
    function ShowWhen(showWhen, platform, zone) {
        _super.call(this, showWhen, platform, zone);
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
    return ShowWhen;
}(DisplayWhen));
export var HideWhen = (function (_super) {
    __extends(HideWhen, _super);
    function HideWhen(hideWhen, platform, zone) {
        _super.call(this, hideWhen, platform, zone);
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
    return HideWhen;
}(DisplayWhen));
//# sourceMappingURL=show-hide-when.js.map
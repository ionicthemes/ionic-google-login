var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_1 = require('../../platform/platform');
    var DisplayWhen = (function () {
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
    exports.DisplayWhen = DisplayWhen;
    var ShowWhen = (function (_super) {
        __extends(ShowWhen, _super);
        function ShowWhen(showWhen, platform, zone) {
            _super.call(this, showWhen, platform, zone);
        }
        ShowWhen.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[showWhen]',
                        host: {
                            '[class.hidden-show-when]': '!isMatch'
                        }
                    },] },
        ];
        ShowWhen.ctorParameters = [
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['showWhen',] },] },
            { type: platform_1.Platform, },
            { type: core_1.NgZone, },
        ];
        return ShowWhen;
    }(DisplayWhen));
    exports.ShowWhen = ShowWhen;
    var HideWhen = (function (_super) {
        __extends(HideWhen, _super);
        function HideWhen(hideWhen, platform, zone) {
            _super.call(this, hideWhen, platform, zone);
        }
        HideWhen.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[hideWhen]',
                        host: {
                            '[class.hidden-hide-when]': 'isMatch'
                        }
                    },] },
        ];
        HideWhen.ctorParameters = [
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['hideWhen',] },] },
            { type: platform_1.Platform, },
            { type: core_1.NgZone, },
        ];
        return HideWhen;
    }(DisplayWhen));
    exports.HideWhen = HideWhen;
});
//# sourceMappingURL=show-hide-when.js.map
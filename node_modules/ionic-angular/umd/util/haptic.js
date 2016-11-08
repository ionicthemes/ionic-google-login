(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_1 = require('../platform/platform');
    var Haptic = (function () {
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
            { type: core_1.Injectable },
        ];
        Haptic.ctorParameters = [
            { type: platform_1.Platform, },
        ];
        return Haptic;
    }());
    exports.Haptic = Haptic;
});
//# sourceMappingURL=haptic.js.map
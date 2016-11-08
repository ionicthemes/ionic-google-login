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
        define(["require", "exports", '@angular/core', '@angular/platform-browser'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_browser_1 = require('@angular/platform-browser');
    var IonicGestureConfig = (function (_super) {
        __extends(IonicGestureConfig, _super);
        function IonicGestureConfig() {
            _super.apply(this, arguments);
        }
        IonicGestureConfig.prototype.buildHammer = function (element) {
            var mc = new window.Hammer(element);
            for (var eventName in this.overrides) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
            return mc;
        };
        IonicGestureConfig.decorators = [
            { type: core_1.Injectable },
        ];
        IonicGestureConfig.ctorParameters = [];
        return IonicGestureConfig;
    }(platform_browser_1.HammerGestureConfig));
    exports.IonicGestureConfig = IonicGestureConfig;
});
//# sourceMappingURL=gesture-config.js.map
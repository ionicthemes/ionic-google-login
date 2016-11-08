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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var Typography = (function (_super) {
        __extends(Typography, _super);
        function Typography(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this.mode = config.get('mode');
        }
        Object.defineProperty(Typography.prototype, "color", {
            set: function (val) {
                this._setColor('text', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Typography.prototype, "mode", {
            set: function (val) {
                this._setMode('text', val);
            },
            enumerable: true,
            configurable: true
        });
        Typography.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'h1[color], h2[color], h3[color], h4[color], h5[color], h6[color], a[color]:not([ion-button]), p[color], span[color], b[color], i[color], strong[color], em[color], small[color], sub[color], sup[color]'
                    },] },
        ];
        Typography.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Typography.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Typography;
    }(ion_1.Ion));
    exports.Typography = Typography;
});
//# sourceMappingURL=typography.js.map
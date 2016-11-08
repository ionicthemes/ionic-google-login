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
    var Chip = (function (_super) {
        __extends(Chip, _super);
        function Chip(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this.mode = config.get('mode');
        }
        Object.defineProperty(Chip.prototype, "color", {
            set: function (val) {
                this._setColor('chip', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chip.prototype, "mode", {
            set: function (val) {
                this._setMode('chip', val);
            },
            enumerable: true,
            configurable: true
        });
        Chip.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-chip'
                    },] },
        ];
        Chip.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Chip.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Chip;
    }(ion_1.Ion));
    exports.Chip = Chip;
});
//# sourceMappingURL=chip.js.map
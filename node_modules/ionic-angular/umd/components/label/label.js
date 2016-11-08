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
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(config, elementRef, renderer, isFloating, isStacked, isFixed, isInset) {
            _super.call(this, config, elementRef, renderer);
            this.mode = config.get('mode');
            this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
        }
        Object.defineProperty(Label.prototype, "color", {
            set: function (val) {
                this._setColor('label', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "mode", {
            set: function (val) {
                this._setMode('label', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (val) {
                this._id = val;
                if (val) {
                    this.setElementAttribute('id', val);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this.getNativeElement().textContent || '';
            },
            enumerable: true,
            configurable: true
        });
        Label.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-label'
                    },] },
        ];
        Label.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['floating',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['stacked',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['fixed',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['inset',] },] },
        ];
        Label.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'id': [{ type: core_1.Input },],
        };
        return Label;
    }(ion_1.Ion));
    exports.Label = Label;
});
//# sourceMappingURL=label.js.map
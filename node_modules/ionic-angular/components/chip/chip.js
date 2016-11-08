var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Chip = (function (_super) {
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
        { type: Directive, args: [{
                    selector: 'ion-chip'
                },] },
    ];
    Chip.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Chip.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return Chip;
}(Ion));
//# sourceMappingURL=chip.js.map
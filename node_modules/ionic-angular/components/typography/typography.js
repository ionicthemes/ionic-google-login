var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Typography = (function (_super) {
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
        { type: Directive, args: [{
                    selector: 'h1[color], h2[color], h3[color], h4[color], h5[color], h6[color], a[color]:not([ion-button]), p[color], span[color], b[color], i[color], strong[color], em[color], small[color], sub[color], sup[color]'
                },] },
    ];
    Typography.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Typography.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return Typography;
}(Ion));
//# sourceMappingURL=typography.js.map
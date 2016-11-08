var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Badge = (function (_super) {
    __extends(Badge, _super);
    function Badge(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer);
        this.mode = config.get('mode');
    }
    Object.defineProperty(Badge.prototype, "color", {
        set: function (val) {
            this._setColor('badge', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Badge.prototype, "mode", {
        set: function (val) {
            this._setMode('badge', val);
        },
        enumerable: true,
        configurable: true
    });
    Badge.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-badge'
                },] },
    ];
    Badge.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Badge.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return Badge;
}(Ion));
//# sourceMappingURL=badge.js.map
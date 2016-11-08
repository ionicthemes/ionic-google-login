import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Badge extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.mode = config.get('mode');
    }
    set color(val) {
        this._setColor('badge', val);
    }
    set mode(val) {
        this._setMode('badge', val);
    }
}
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
//# sourceMappingURL=badge.js.map
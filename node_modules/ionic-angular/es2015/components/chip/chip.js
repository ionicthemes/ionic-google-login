import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Chip extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.mode = config.get('mode');
    }
    set color(val) {
        this._setColor('chip', val);
    }
    set mode(val) {
        this._setMode('chip', val);
    }
}
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
//# sourceMappingURL=chip.js.map
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Typography extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.mode = config.get('mode');
    }
    set color(val) {
        this._setColor('text', val);
    }
    set mode(val) {
        this._setMode('text', val);
    }
}
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
//# sourceMappingURL=typography.js.map
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Card extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.mode = config.get('mode');
    }
    set color(val) {
        this._setColor('card', val);
    }
    set mode(val) {
        this._setMode('card', val);
    }
}
Card.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card'
            },] },
];
Card.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Card.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
export class CardContent {
}
CardContent.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-content'
            },] },
];
CardContent.ctorParameters = [];
export class CardHeader {
}
CardHeader.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-header'
            },] },
];
CardHeader.ctorParameters = [];
export class CardTitle {
}
CardTitle.decorators = [
    { type: Directive, args: [{
                selector: 'ion-card-title'
            },] },
];
CardTitle.ctorParameters = [];
//# sourceMappingURL=card.js.map
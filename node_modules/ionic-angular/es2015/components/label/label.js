import { Attribute, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Label extends Ion {
    constructor(config, elementRef, renderer, isFloating, isStacked, isFixed, isInset) {
        super(config, elementRef, renderer);
        this.mode = config.get('mode');
        this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
    }
    set color(val) {
        this._setColor('label', val);
    }
    set mode(val) {
        this._setMode('label', val);
    }
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
        if (val) {
            this.setElementAttribute('id', val);
        }
    }
    get text() {
        return this.getNativeElement().textContent || '';
    }
}
Label.decorators = [
    { type: Directive, args: [{
                selector: 'ion-label'
            },] },
];
Label.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: undefined, decorators: [{ type: Attribute, args: ['floating',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['stacked',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['fixed',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['inset',] },] },
];
Label.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'id': [{ type: Input },],
};
//# sourceMappingURL=label.js.map
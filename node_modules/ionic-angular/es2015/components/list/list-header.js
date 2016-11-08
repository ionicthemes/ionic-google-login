import { Attribute, Directive, ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class ListHeader extends Ion {
    constructor(config, renderer, elementRef, _id) {
        super(config, elementRef, renderer);
        this._id = _id;
        this._setMode('list-header', config.get('mode'));
    }
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
        this.setElementAttribute('id', val);
    }
}
ListHeader.decorators = [
    { type: Directive, args: [{
                selector: 'ion-list-header'
            },] },
];
ListHeader.ctorParameters = [
    { type: Config, },
    { type: Renderer, },
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Attribute, args: ['id',] },] },
];
//# sourceMappingURL=list-header.js.map
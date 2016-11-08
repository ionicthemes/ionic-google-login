import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { isPresent, isTrueProperty } from '../../util/util';
export class Option {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._selected = false;
        this._disabled = false;
        this.ionSelect = new EventEmitter();
    }
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = isTrueProperty(val);
    }
    get value() {
        if (isPresent(this._value)) {
            return this._value;
        }
        return this.text;
    }
    set value(val) {
        this._value = val;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
    }
    get text() {
        return this._elementRef.nativeElement.textContent;
    }
}
Option.decorators = [
    { type: Directive, args: [{
                selector: 'ion-option'
            },] },
];
Option.ctorParameters = [
    { type: ElementRef, },
];
Option.propDecorators = {
    'ionSelect': [{ type: Output },],
    'selected': [{ type: Input },],
    'value': [{ type: Input },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=option.js.map
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { isPresent, isTrueProperty } from '../../util/util';
export var Option = (function () {
    function Option(_elementRef) {
        this._elementRef = _elementRef;
        this._selected = false;
        this._disabled = false;
        this.ionSelect = new EventEmitter();
    }
    Object.defineProperty(Option.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (val) {
            this._selected = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Option.prototype, "value", {
        get: function () {
            if (isPresent(this._value)) {
                return this._value;
            }
            return this.text;
        },
        set: function (val) {
            this._value = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Option.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Option.prototype, "text", {
        get: function () {
            return this._elementRef.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
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
    return Option;
}());
//# sourceMappingURL=option.js.map
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
export const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Checkbox),
    multi: true
};
export class Checkbox extends Ion {
    constructor(config, _form, _item, elementRef, renderer) {
        super(config, elementRef, renderer);
        this._form = _form;
        this._item = _item;
        this._checked = false;
        this._disabled = false;
        this.ionChange = new EventEmitter();
        this.mode = config.get('mode');
        _form.register(this);
        if (_item) {
            this.id = 'chk-' + _item.registerInput('checkbox');
            this._labelId = 'lbl-' + _item.id;
            this._item.setElementClass('item-checkbox', true);
        }
    }
    set color(val) {
        this._setColor('checkbox', val);
    }
    set mode(val) {
        this._setMode('checkbox', val);
    }
    _click(ev) {
        (void 0);
        ev.preventDefault();
        ev.stopPropagation();
        this.onChange(!this._checked);
    }
    get checked() {
        return this._checked;
    }
    set checked(val) {
        this._setChecked(isTrueProperty(val));
        this.onChange(this._checked);
    }
    _setChecked(isChecked) {
        if (!this._disabled && isChecked !== this._checked) {
            this._checked = isChecked;
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._item && this._item.setElementClass('item-checkbox-checked', isChecked);
        }
    }
    writeValue(val) {
        this._setChecked(isTrueProperty(val));
    }
    registerOnChange(fn) {
        this._fn = fn;
        this.onChange = (isChecked) => {
            (void 0);
            fn(isChecked);
            this._setChecked(isChecked);
            this.onTouched();
        };
    }
    registerOnTouched(fn) { this.onTouched = fn; }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-checkbox-disabled', this._disabled);
    }
    onChange(isChecked) {
        (void 0);
        this._setChecked(isChecked);
        this.onTouched();
    }
    onTouched() { }
    ngAfterContentInit() {
        this._init = true;
    }
    ngOnDestroy() {
        this._form.deregister(this);
    }
}
Checkbox.decorators = [
    { type: Component, args: [{
                selector: 'ion-checkbox',
                template: '<div class="checkbox-icon" [class.checkbox-checked]="_checked">' +
                    '<div class="checkbox-inner"></div>' +
                    '</div>' +
                    '<button role="checkbox" ' +
                    'type="button" ' +
                    'ion-button="item-cover" ' +
                    '[id]="id" ' +
                    '[attr.aria-checked]="_checked" ' +
                    '[attr.aria-labelledby]="_labelId" ' +
                    '[attr.aria-disabled]="_disabled" ' +
                    'class="item-cover"> ' +
                    '</button>',
                host: {
                    '[class.checkbox-disabled]': '_disabled'
                },
                providers: [CHECKBOX_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
            },] },
];
Checkbox.ctorParameters = [
    { type: Config, },
    { type: Form, },
    { type: Item, decorators: [{ type: Optional },] },
    { type: ElementRef, },
    { type: Renderer, },
];
Checkbox.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'ionChange': [{ type: Output },],
    '_click': [{ type: HostListener, args: ['click', ['$event'],] },],
    'checked': [{ type: Input },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=checkbox.js.map
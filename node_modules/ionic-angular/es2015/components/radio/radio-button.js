import { Component, ElementRef, EventEmitter, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { isBlank, isCheckedProperty, isPresent, isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
import { RadioGroup } from './radio-group';
export class RadioButton extends Ion {
    constructor(_form, config, elementRef, renderer, _item, _group) {
        super(config, elementRef, renderer);
        this._form = _form;
        this._item = _item;
        this._group = _group;
        this._checked = false;
        this._disabled = false;
        this._value = null;
        this.ionSelect = new EventEmitter();
        this.mode = config.get('mode');
        _form.register(this);
        if (_group) {
            this.id = 'rb-' + _group.add(this);
        }
        if (_item) {
            this.id = 'rb-' + _item.registerInput('radio');
            this._labelId = 'lbl-' + _item.id;
            this._item.setElementClass('item-radio', true);
        }
    }
    set color(val) {
        this._setColor('radio', val);
        if (this._item) {
            this._item._updateColor(val, 'item-radio');
        }
    }
    set mode(val) {
        this._setMode('radio', val);
    }
    get value() {
        return isBlank(this._value) ? this.id : this._value;
    }
    set value(val) {
        this._value = val;
    }
    get checked() {
        return this._checked;
    }
    set checked(isChecked) {
        this._checked = isTrueProperty(isChecked);
        if (this._item) {
            this._item.setElementClass('item-radio-checked', this._checked);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-radio-disabled', this._disabled);
    }
    _click(ev) {
        (void 0);
        ev.preventDefault();
        ev.stopPropagation();
        this.checked = true;
        this.ionSelect.emit(this.value);
    }
    ngOnInit() {
        if (this._group && isPresent(this._group.value)) {
            this.checked = isCheckedProperty(this._group.value, this.value);
        }
    }
    ngOnDestroy() {
        this._form.deregister(this);
        this._group && this._group.remove(this);
    }
}
RadioButton.decorators = [
    { type: Component, args: [{
                selector: 'ion-radio',
                template: '<div class="radio-icon" [class.radio-checked]="_checked"> ' +
                    '<div class="radio-inner"></div> ' +
                    '</div> ' +
                    '<button role="radio" ' +
                    'type="button" ' +
                    'ion-button="item-cover" ' +
                    '[id]="id" ' +
                    '[attr.aria-checked]="_checked" ' +
                    '[attr.aria-labelledby]="_labelId" ' +
                    '[attr.aria-disabled]="_disabled" ' +
                    'class="item-cover"> ' +
                    '</button>',
                host: {
                    '[class.radio-disabled]': '_disabled'
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
RadioButton.ctorParameters = [
    { type: Form, },
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Item, decorators: [{ type: Optional },] },
    { type: RadioGroup, decorators: [{ type: Optional },] },
];
RadioButton.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'ionSelect': [{ type: Output },],
    'value': [{ type: Input },],
    'checked': [{ type: Input },],
    'disabled': [{ type: Input },],
    '_click': [{ type: HostListener, args: ['click', ['$event'],] },],
};
//# sourceMappingURL=radio-button.js.map
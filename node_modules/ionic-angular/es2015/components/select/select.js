import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Input, HostListener, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionSheet } from '../action-sheet/action-sheet';
import { Alert } from '../alert/alert';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { isBlank, isCheckedProperty, isTrueProperty, merge } from '../../util/util';
import { Item } from '../item/item';
import { NavController } from '../../navigation/nav-controller';
import { Option } from '../option/option';
export const SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Select),
    multi: true
};
export class Select extends Ion {
    constructor(_app, _form, config, elementRef, renderer, _item, _nav) {
        super(config, elementRef, renderer);
        this._app = _app;
        this._form = _form;
        this._item = _item;
        this._nav = _nav;
        this._disabled = false;
        this._multi = false;
        this._values = [];
        this._texts = [];
        this._text = '';
        this._isOpen = false;
        this.cancelText = 'Cancel';
        this.okText = 'OK';
        this.selectOptions = {};
        this.interface = '';
        this.selectedText = '';
        this.ionChange = new EventEmitter();
        this.ionCancel = new EventEmitter();
        this.mode = config.get('mode');
        _form.register(this);
        if (_item) {
            this.id = 'sel-' + _item.registerInput('select');
            this._labelId = 'lbl-' + _item.id;
            this._item.setElementClass('item-select', true);
        }
    }
    set mode(val) {
        this._setMode('select', val);
    }
    _click(ev) {
        if (ev.detail === 0) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    }
    _keyup() {
        if (!this._isOpen) {
            this.open();
        }
    }
    open() {
        if (this._disabled) {
            return;
        }
        (void 0);
        let selectOptions = merge({}, this.selectOptions);
        selectOptions.buttons = [{
                text: this.cancelText,
                role: 'cancel',
                handler: () => {
                    this.ionCancel.emit(null);
                }
            }];
        if (!selectOptions.title && this._item) {
            selectOptions.title = this._item.getLabelText();
        }
        let options = this._options.toArray();
        if (this.interface === 'action-sheet' && options.length > 6) {
            console.warn('Interface cannot be "action-sheet" with more than 6 options. Using the "alert" interface.');
            this.interface = 'alert';
        }
        if (this.interface === 'action-sheet' && this._multi) {
            console.warn('Interface cannot be "action-sheet" with a multi-value select. Using the "alert" interface.');
            this.interface = 'alert';
        }
        let overlay;
        if (this.interface === 'action-sheet') {
            selectOptions.buttons = selectOptions.buttons.concat(options.map(input => {
                return {
                    role: (input.selected ? 'selected' : ''),
                    text: input.text,
                    handler: () => {
                        this.onChange(input.value);
                        this.ionChange.emit(input.value);
                        input.ionSelect.emit(input.value);
                    }
                };
            }));
            var selectCssClass = 'select-action-sheet';
            selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
            selectOptions.cssClass = selectCssClass;
            overlay = new ActionSheet(this._app, selectOptions);
        }
        else {
            this.interface = 'alert';
            selectOptions.inputs = this._options.map(input => {
                return {
                    type: (this._multi ? 'checkbox' : 'radio'),
                    label: input.text,
                    value: input.value,
                    checked: input.selected,
                    disabled: input.disabled,
                    handler: (selectedOption) => {
                        if (selectedOption.checked) {
                            input.ionSelect.emit(input.value);
                        }
                    }
                };
            });
            var selectCssClass = 'select-alert';
            overlay = new Alert(this._app, selectOptions);
            if (this._multi) {
                selectCssClass += ' multiple-select-alert';
            }
            else {
                selectCssClass += ' single-select-alert';
            }
            selectCssClass += selectOptions.cssClass ? ' ' + selectOptions.cssClass : '';
            overlay.setCssClass(selectCssClass);
            overlay.addButton({
                text: this.okText,
                handler: (selectedValues) => {
                    this.onChange(selectedValues);
                    this.ionChange.emit(selectedValues);
                }
            });
        }
        overlay.present(selectOptions);
        this._isOpen = true;
        overlay.onDidDismiss(() => {
            this._isOpen = false;
        });
    }
    get multiple() {
        return this._multi;
    }
    set multiple(val) {
        this._multi = isTrueProperty(val);
    }
    get text() {
        return (this._multi ? this._texts : this._texts.join());
    }
    set options(val) {
        this._options = val;
        if (!this._values.length) {
            this._values = val.filter(o => o.selected).map(o => o.value);
        }
        this._updOpts();
    }
    _updOpts() {
        this._texts = [];
        if (this._options) {
            this._options.forEach(option => {
                option.selected = this._values.some(selectValue => {
                    return isCheckedProperty(selectValue, option.value);
                });
                if (option.selected) {
                    this._texts.push(option.text);
                }
            });
        }
        this._text = this._texts.join(', ');
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-select-disabled', this._disabled);
    }
    writeValue(val) {
        (void 0);
        this._values = (Array.isArray(val) ? val : isBlank(val) ? [] : [val]);
        this._updOpts();
    }
    ngAfterContentInit() {
        this._updOpts();
    }
    registerOnChange(fn) {
        this._fn = fn;
        this.onChange = (val) => {
            (void 0);
            fn(val);
            this._values = (Array.isArray(val) ? val : isBlank(val) ? [] : [val]);
            this._updOpts();
            this.onTouched();
        };
    }
    registerOnTouched(fn) { this.onTouched = fn; }
    onChange(val) {
        (void 0);
        this._values = (Array.isArray(val) ? val : isBlank(val) ? [] : [val]);
        this._updOpts();
        this.onTouched();
    }
    onTouched() { }
    ngOnDestroy() {
        this._form.deregister(this);
    }
}
Select.decorators = [
    { type: Component, args: [{
                selector: 'ion-select',
                template: '<div *ngIf="!_text" class="select-placeholder select-text">{{placeholder}}</div>' +
                    '<div *ngIf="_text" class="select-text">{{selectedText || _text}}</div>' +
                    '<div class="select-icon">' +
                    '<div class="select-icon-inner"></div>' +
                    '</div>' +
                    '<button aria-haspopup="true" ' +
                    '[id]="id" ' +
                    'ion-button="item-cover" ' +
                    '[attr.aria-labelledby]="_labelId" ' +
                    '[attr.aria-disabled]="_disabled" ' +
                    'class="item-cover">' +
                    '</button>',
                host: {
                    '[class.select-disabled]': '_disabled'
                },
                providers: [SELECT_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
            },] },
];
Select.ctorParameters = [
    { type: App, },
    { type: Form, },
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Item, decorators: [{ type: Optional },] },
    { type: NavController, decorators: [{ type: Optional },] },
];
Select.propDecorators = {
    'cancelText': [{ type: Input },],
    'okText': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'selectOptions': [{ type: Input },],
    'interface': [{ type: Input },],
    'selectedText': [{ type: Input },],
    'mode': [{ type: Input },],
    'ionChange': [{ type: Output },],
    'ionCancel': [{ type: Output },],
    '_click': [{ type: HostListener, args: ['click', ['$event'],] },],
    '_keyup': [{ type: HostListener, args: ['keyup.space',] },],
    'multiple': [{ type: Input },],
    'options': [{ type: ContentChildren, args: [Option,] },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=select.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
export var SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Select; }),
    multi: true
};
export var Select = (function (_super) {
    __extends(Select, _super);
    function Select(_app, _form, config, elementRef, renderer, _item, _nav) {
        _super.call(this, config, elementRef, renderer);
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
    Object.defineProperty(Select.prototype, "mode", {
        set: function (val) {
            this._setMode('select', val);
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype._click = function (ev) {
        if (ev.detail === 0) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    };
    Select.prototype._keyup = function () {
        if (!this._isOpen) {
            this.open();
        }
    };
    Select.prototype.open = function () {
        var _this = this;
        if (this._disabled) {
            return;
        }
        (void 0);
        var selectOptions = merge({}, this.selectOptions);
        selectOptions.buttons = [{
                text: this.cancelText,
                role: 'cancel',
                handler: function () {
                    _this.ionCancel.emit(null);
                }
            }];
        if (!selectOptions.title && this._item) {
            selectOptions.title = this._item.getLabelText();
        }
        var options = this._options.toArray();
        if (this.interface === 'action-sheet' && options.length > 6) {
            console.warn('Interface cannot be "action-sheet" with more than 6 options. Using the "alert" interface.');
            this.interface = 'alert';
        }
        if (this.interface === 'action-sheet' && this._multi) {
            console.warn('Interface cannot be "action-sheet" with a multi-value select. Using the "alert" interface.');
            this.interface = 'alert';
        }
        var overlay;
        if (this.interface === 'action-sheet') {
            selectOptions.buttons = selectOptions.buttons.concat(options.map(function (input) {
                return {
                    role: (input.selected ? 'selected' : ''),
                    text: input.text,
                    handler: function () {
                        _this.onChange(input.value);
                        _this.ionChange.emit(input.value);
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
            selectOptions.inputs = this._options.map(function (input) {
                return {
                    type: (_this._multi ? 'checkbox' : 'radio'),
                    label: input.text,
                    value: input.value,
                    checked: input.selected,
                    disabled: input.disabled,
                    handler: function (selectedOption) {
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
                handler: function (selectedValues) {
                    _this.onChange(selectedValues);
                    _this.ionChange.emit(selectedValues);
                }
            });
        }
        overlay.present(selectOptions);
        this._isOpen = true;
        overlay.onDidDismiss(function () {
            _this._isOpen = false;
        });
    };
    Object.defineProperty(Select.prototype, "multiple", {
        get: function () {
            return this._multi;
        },
        set: function (val) {
            this._multi = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "text", {
        get: function () {
            return (this._multi ? this._texts : this._texts.join());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "options", {
        set: function (val) {
            this._options = val;
            if (!this._values.length) {
                this._values = val.filter(function (o) { return o.selected; }).map(function (o) { return o.value; });
            }
            this._updOpts();
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype._updOpts = function () {
        var _this = this;
        this._texts = [];
        if (this._options) {
            this._options.forEach(function (option) {
                option.selected = _this._values.some(function (selectValue) {
                    return isCheckedProperty(selectValue, option.value);
                });
                if (option.selected) {
                    _this._texts.push(option.text);
                }
            });
        }
        this._text = this._texts.join(', ');
    };
    Object.defineProperty(Select.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = isTrueProperty(val);
            this._item && this._item.setElementClass('item-select-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.writeValue = function (val) {
        (void 0);
        this._values = (Array.isArray(val) ? val : isBlank(val) ? [] : [val]);
        this._updOpts();
    };
    Select.prototype.ngAfterContentInit = function () {
        this._updOpts();
    };
    Select.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            (void 0);
            fn(val);
            _this._values = (Array.isArray(val) ? val : isBlank(val) ? [] : [val]);
            _this._updOpts();
            _this.onTouched();
        };
    };
    Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Select.prototype.onChange = function (val) {
        (void 0);
        this._values = (Array.isArray(val) ? val : isBlank(val) ? [] : [val]);
        this._updOpts();
        this.onTouched();
    };
    Select.prototype.onTouched = function () { };
    Select.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
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
    return Select;
}(Ion));
//# sourceMappingURL=select.js.map
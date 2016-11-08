var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
export var CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Checkbox; }),
    multi: true
};
export var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(config, _form, _item, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer);
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
    Object.defineProperty(Checkbox.prototype, "color", {
        set: function (val) {
            this._setColor('checkbox', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox.prototype, "mode", {
        set: function (val) {
            this._setMode('checkbox', val);
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype._click = function (ev) {
        (void 0);
        ev.preventDefault();
        ev.stopPropagation();
        this.onChange(!this._checked);
    };
    Object.defineProperty(Checkbox.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (val) {
            this._setChecked(isTrueProperty(val));
            this.onChange(this._checked);
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype._setChecked = function (isChecked) {
        if (!this._disabled && isChecked !== this._checked) {
            this._checked = isChecked;
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._item && this._item.setElementClass('item-checkbox-checked', isChecked);
        }
    };
    Checkbox.prototype.writeValue = function (val) {
        this._setChecked(isTrueProperty(val));
    };
    Checkbox.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (isChecked) {
            (void 0);
            fn(isChecked);
            _this._setChecked(isChecked);
            _this.onTouched();
        };
    };
    Checkbox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(Checkbox.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = isTrueProperty(val);
            this._item && this._item.setElementClass('item-checkbox-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    Checkbox.prototype.onChange = function (isChecked) {
        (void 0);
        this._setChecked(isChecked);
        this.onTouched();
    };
    Checkbox.prototype.onTouched = function () { };
    Checkbox.prototype.ngAfterContentInit = function () {
        this._init = true;
    };
    Checkbox.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
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
    return Checkbox;
}(Ion));
//# sourceMappingURL=checkbox.js.map
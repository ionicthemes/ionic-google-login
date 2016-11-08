var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/forms', '../../config/config', '../../util/form', '../ion', '../../util/util', '../item/item'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var config_1 = require('../../config/config');
    var form_1 = require('../../util/form');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var item_1 = require('../item/item');
    exports.CHECKBOX_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Checkbox; }),
        multi: true
    };
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox(config, _form, _item, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this._form = _form;
            this._item = _item;
            this._checked = false;
            this._disabled = false;
            this.ionChange = new core_1.EventEmitter();
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
                this._setChecked(util_1.isTrueProperty(val));
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
            this._setChecked(util_1.isTrueProperty(val));
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
                this._disabled = util_1.isTrueProperty(val);
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
            { type: core_1.Component, args: [{
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
                        providers: [exports.CHECKBOX_VALUE_ACCESSOR],
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Checkbox.ctorParameters = [
            { type: config_1.Config, },
            { type: form_1.Form, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Checkbox.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
            '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
            'checked': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
        };
        return Checkbox;
    }(ion_1.Ion));
    exports.Checkbox = Checkbox;
});
//# sourceMappingURL=checkbox.js.map
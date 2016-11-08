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
        define(["require", "exports", '@angular/core', '../../config/config', '../../util/form', '../ion', '../../util/util', '../item/item', './radio-group'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var form_1 = require('../../util/form');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var item_1 = require('../item/item');
    var radio_group_1 = require('./radio-group');
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(_form, config, elementRef, renderer, _item, _group) {
            _super.call(this, config, elementRef, renderer);
            this._form = _form;
            this._item = _item;
            this._group = _group;
            this._checked = false;
            this._disabled = false;
            this._value = null;
            this.ionSelect = new core_1.EventEmitter();
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
        Object.defineProperty(RadioButton.prototype, "color", {
            set: function (val) {
                this._setColor('radio', val);
                if (this._item) {
                    this._item._updateColor(val, 'item-radio');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButton.prototype, "mode", {
            set: function (val) {
                this._setMode('radio', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButton.prototype, "value", {
            get: function () {
                return util_1.isBlank(this._value) ? this.id : this._value;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButton.prototype, "checked", {
            get: function () {
                return this._checked;
            },
            set: function (isChecked) {
                this._checked = util_1.isTrueProperty(isChecked);
                if (this._item) {
                    this._item.setElementClass('item-radio-checked', this._checked);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButton.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = util_1.isTrueProperty(val);
                this._item && this._item.setElementClass('item-radio-disabled', this._disabled);
            },
            enumerable: true,
            configurable: true
        });
        RadioButton.prototype._click = function (ev) {
            (void 0);
            ev.preventDefault();
            ev.stopPropagation();
            this.checked = true;
            this.ionSelect.emit(this.value);
        };
        RadioButton.prototype.ngOnInit = function () {
            if (this._group && util_1.isPresent(this._group.value)) {
                this.checked = util_1.isCheckedProperty(this._group.value, this.value);
            }
        };
        RadioButton.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
            this._group && this._group.remove(this);
        };
        RadioButton.decorators = [
            { type: core_1.Component, args: [{
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
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        RadioButton.ctorParameters = [
            { type: form_1.Form, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: radio_group_1.RadioGroup, decorators: [{ type: core_1.Optional },] },
        ];
        RadioButton.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'ionSelect': [{ type: core_1.Output },],
            'value': [{ type: core_1.Input },],
            'checked': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
            '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
        };
        return RadioButton;
    }(ion_1.Ion));
    exports.RadioButton = RadioButton;
});
//# sourceMappingURL=radio-button.js.map
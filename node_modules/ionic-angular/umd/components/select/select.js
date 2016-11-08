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
        define(["require", "exports", '@angular/core', '@angular/forms', '../action-sheet/action-sheet', '../alert/alert', '../app/app', '../../config/config', '../../util/form', '../ion', '../../util/util', '../item/item', '../../navigation/nav-controller', '../option/option'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var action_sheet_1 = require('../action-sheet/action-sheet');
    var alert_1 = require('../alert/alert');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var form_1 = require('../../util/form');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var item_1 = require('../item/item');
    var nav_controller_1 = require('../../navigation/nav-controller');
    var option_1 = require('../option/option');
    exports.SELECT_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Select; }),
        multi: true
    };
    var Select = (function (_super) {
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
            this.ionChange = new core_1.EventEmitter();
            this.ionCancel = new core_1.EventEmitter();
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
            var selectOptions = util_1.merge({}, this.selectOptions);
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
                overlay = new action_sheet_1.ActionSheet(this._app, selectOptions);
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
                overlay = new alert_1.Alert(this._app, selectOptions);
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
                this._multi = util_1.isTrueProperty(val);
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
                        return util_1.isCheckedProperty(selectValue, option.value);
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
                this._disabled = util_1.isTrueProperty(val);
                this._item && this._item.setElementClass('item-select-disabled', this._disabled);
            },
            enumerable: true,
            configurable: true
        });
        Select.prototype.writeValue = function (val) {
            (void 0);
            this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
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
                _this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
                _this._updOpts();
                _this.onTouched();
            };
        };
        Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        Select.prototype.onChange = function (val) {
            (void 0);
            this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
            this._updOpts();
            this.onTouched();
        };
        Select.prototype.onTouched = function () { };
        Select.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
        };
        Select.decorators = [
            { type: core_1.Component, args: [{
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
                        providers: [exports.SELECT_VALUE_ACCESSOR],
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Select.ctorParameters = [
            { type: app_1.App, },
            { type: form_1.Form, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
        ];
        Select.propDecorators = {
            'cancelText': [{ type: core_1.Input },],
            'okText': [{ type: core_1.Input },],
            'placeholder': [{ type: core_1.Input },],
            'selectOptions': [{ type: core_1.Input },],
            'interface': [{ type: core_1.Input },],
            'selectedText': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
            'ionCancel': [{ type: core_1.Output },],
            '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
            '_keyup': [{ type: core_1.HostListener, args: ['keyup.space',] },],
            'multiple': [{ type: core_1.Input },],
            'options': [{ type: core_1.ContentChildren, args: [option_1.Option,] },],
            'disabled': [{ type: core_1.Input },],
        };
        return Select;
    }(ion_1.Ion));
    exports.Select = Select;
});
//# sourceMappingURL=select.js.map
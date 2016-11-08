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
        define(["require", "exports", '@angular/core', '@angular/forms', '../../config/config', '../picker/picker', '../../util/form', '../ion', '../item/item', '../../util/util', '../../util/datetime-util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var config_1 = require('../../config/config');
    var picker_1 = require('../picker/picker');
    var form_1 = require('../../util/form');
    var ion_1 = require('../ion');
    var item_1 = require('../item/item');
    var util_1 = require('../../util/util');
    var datetime_util_1 = require('../../util/datetime-util');
    exports.DATETIME_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return DateTime; }),
        multi: true
    };
    var DateTime = (function (_super) {
        __extends(DateTime, _super);
        function DateTime(_form, config, elementRef, renderer, _item, _pickerCtrl) {
            _super.call(this, config, elementRef, renderer);
            this._form = _form;
            this._item = _item;
            this._pickerCtrl = _pickerCtrl;
            this._disabled = false;
            this._text = '';
            this._isOpen = false;
            this._value = {};
            this._locale = {};
            this.displayFormat = 'MMM D, YYYY';
            this.cancelText = 'Cancel';
            this.doneText = 'Done';
            this.pickerOptions = {};
            this.ionChange = new core_1.EventEmitter();
            this.ionCancel = new core_1.EventEmitter();
            this.mode = config.get('mode');
            _form.register(this);
            if (_item) {
                this.id = 'dt-' + _item.registerInput('datetime');
                this._labelId = 'lbl-' + _item.id;
                this._item.setElementClass('item-datetime', true);
            }
        }
        Object.defineProperty(DateTime.prototype, "mode", {
            set: function (val) {
                this._setMode('datetime', val);
            },
            enumerable: true,
            configurable: true
        });
        DateTime.prototype._click = function (ev) {
            if (ev.detail === 0) {
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();
            this.open();
        };
        DateTime.prototype._keyup = function () {
            if (!this._isOpen) {
                this.open();
            }
        };
        DateTime.prototype.open = function () {
            var _this = this;
            if (this._disabled) {
                return;
            }
            (void 0);
            var pickerOptions = util_1.merge({}, this.pickerOptions);
            var picker = this._pickerCtrl.create(pickerOptions);
            pickerOptions.buttons = [
                {
                    text: this.cancelText,
                    role: 'cancel',
                    handler: function () {
                        _this.ionCancel.emit(null);
                    }
                },
                {
                    text: this.doneText,
                    handler: function (data) {
                        (void 0);
                        _this.onChange(data);
                        _this.ionChange.emit(data);
                    }
                }
            ];
            this.generate(picker);
            this.validate(picker);
            picker.ionChange.subscribe(function () {
                _this.validate(picker);
            });
            picker.present(pickerOptions);
            this._isOpen = true;
            picker.onDidDismiss(function () {
                _this._isOpen = false;
            });
        };
        DateTime.prototype.generate = function (picker) {
            var _this = this;
            var template = this.pickerFormat || this.displayFormat;
            if (util_1.isPresent(template)) {
                this.calcMinMax();
                template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
                if (template.indexOf('D') === -1) {
                    template = template.replace('{~}', 'D');
                }
                template = template.replace(/{~}/g, '');
                datetime_util_1.parseTemplate(template).forEach(function (format) {
                    var key = datetime_util_1.convertFormatToKey(format);
                    var values;
                    if (util_1.isPresent(_this[key + 'Values'])) {
                        values = convertToArrayOfNumbers(_this[key + 'Values'], key);
                    }
                    else {
                        values = datetime_util_1.dateValueRange(format, _this._min, _this._max);
                    }
                    var column = {
                        name: key,
                        options: values.map(function (val) {
                            return {
                                value: val,
                                text: datetime_util_1.renderTextFormat(format, val, null, _this._locale),
                            };
                        })
                    };
                    if (column.options.length) {
                        var selected = column.options.find(function (opt) { return opt.value === datetime_util_1.getValueFromFormat(_this._value, format); });
                        if (selected) {
                            column.selectedIndex = column.options.indexOf(selected);
                        }
                        picker.addColumn(column);
                    }
                });
                this.divyColumns(picker);
            }
        };
        DateTime.prototype.validate = function (picker) {
            var i;
            var today = new Date();
            var columns = picker.getColumns();
            var yearCol = columns.find(function (col) { return col.name === 'year'; });
            var monthCol = columns.find(function (col) { return col.name === 'month'; });
            var dayCol = columns.find(function (col) { return col.name === 'day'; });
            var yearOpt;
            var monthOpt;
            var dayOpt;
            var selectedYear = today.getFullYear();
            if (yearCol) {
                yearOpt = yearCol.options[yearCol.selectedIndex];
                if (yearOpt) {
                    selectedYear = yearOpt.value;
                }
            }
            var numDaysInMonth = 31;
            var selectedMonth;
            if (monthCol) {
                monthOpt = monthCol.options[monthCol.selectedIndex];
                if (monthOpt) {
                    selectedMonth = monthOpt.value;
                    numDaysInMonth = datetime_util_1.daysInMonth(selectedMonth, selectedYear);
                }
            }
            var minCompareVal = datetime_util_1.dateDataSortValue(this._min);
            var maxCompareVal = datetime_util_1.dateDataSortValue(this._max);
            if (monthCol) {
                for (i = 0; i < monthCol.options.length; i++) {
                    monthOpt = monthCol.options[i];
                    monthOpt.disabled = (datetime_util_1.dateSortValue(selectedYear, monthOpt.value, 31) < minCompareVal ||
                        datetime_util_1.dateSortValue(selectedYear, monthOpt.value, 1) > maxCompareVal);
                }
            }
            if (dayCol) {
                if (util_1.isPresent(selectedMonth)) {
                    for (i = 0; i < 31; i++) {
                        dayOpt = dayCol.options[i];
                        var compareVal = datetime_util_1.dateSortValue(selectedYear, selectedMonth, dayOpt.value);
                        dayOpt.disabled = (compareVal < minCompareVal ||
                            compareVal > maxCompareVal ||
                            numDaysInMonth <= i);
                    }
                }
                else {
                    for (i = 0; i < 31; i++) {
                        dayCol.options[i].disabled = (numDaysInMonth <= i);
                    }
                }
            }
            picker.refresh();
        };
        DateTime.prototype.divyColumns = function (picker) {
            var pickerColumns = picker.getColumns();
            var columns = [];
            pickerColumns.forEach(function (col, i) {
                columns.push(0);
                col.options.forEach(function (opt) {
                    if (opt.text.length > columns[i]) {
                        columns[i] = opt.text.length;
                    }
                });
            });
            if (columns.length === 2) {
                var width = Math.max(columns[0], columns[1]);
                pickerColumns[0].columnWidth = pickerColumns[1].columnWidth = width * 16 + "px";
            }
            else if (columns.length === 3) {
                var width = Math.max(columns[0], columns[2]);
                pickerColumns[1].columnWidth = columns[1] * 16 + "px";
                pickerColumns[0].columnWidth = pickerColumns[2].columnWidth = width * 16 + "px";
            }
            else if (columns.length > 3) {
                columns.forEach(function (col, i) {
                    pickerColumns[i].columnWidth = col * 12 + "px";
                });
            }
        };
        DateTime.prototype.setValue = function (newData) {
            datetime_util_1.updateDate(this._value, newData);
        };
        DateTime.prototype.getValue = function () {
            return this._value;
        };
        DateTime.prototype.checkHasValue = function (inputValue) {
            if (this._item) {
                this._item.setElementClass('input-has-value', !!(inputValue && inputValue !== ''));
            }
        };
        DateTime.prototype.updateText = function () {
            this._text = datetime_util_1.renderDateTime(this.displayFormat, this._value, this._locale);
        };
        DateTime.prototype.calcMinMax = function () {
            var todaysYear = new Date().getFullYear();
            if (util_1.isBlank(this.min)) {
                if (util_1.isPresent(this.yearValues)) {
                    this.min = Math.min.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
                }
                else {
                    this.min = (todaysYear - 100).toString();
                }
            }
            if (util_1.isBlank(this.max)) {
                if (util_1.isPresent(this.yearValues)) {
                    this.max = Math.max.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
                }
                else {
                    this.max = todaysYear.toString();
                }
            }
            var min = this._min = datetime_util_1.parseDate(this.min);
            var max = this._max = datetime_util_1.parseDate(this.max);
            min.month = min.month || 1;
            min.day = min.day || 1;
            min.hour = min.hour || 0;
            min.minute = min.minute || 0;
            min.second = min.second || 0;
            max.month = max.month || 12;
            max.day = max.day || 31;
            max.hour = max.hour || 23;
            max.minute = max.minute || 59;
            max.second = max.second || 59;
        };
        Object.defineProperty(DateTime.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = util_1.isTrueProperty(val);
                this._item && this._item.setElementClass('item-datetime-disabled', this._disabled);
            },
            enumerable: true,
            configurable: true
        });
        DateTime.prototype.writeValue = function (val) {
            (void 0);
            this.setValue(val);
            this.updateText();
            this.checkHasValue(val);
        };
        DateTime.prototype.ngAfterContentInit = function () {
            var _this = this;
            ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(function (type) {
                _this._locale[type] = convertToArrayOfStrings(util_1.isPresent(_this[type]) ? _this[type] : _this._config.get(type), type);
            });
            this.updateText();
        };
        DateTime.prototype.registerOnChange = function (fn) {
            var _this = this;
            this._fn = fn;
            this.onChange = function (val) {
                (void 0);
                _this.setValue(val);
                _this.updateText();
                _this.checkHasValue(val);
                fn(datetime_util_1.convertDataToISO(_this._value));
                _this.onTouched();
            };
        };
        DateTime.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        DateTime.prototype.onChange = function (val) {
            (void 0);
            this.setValue(val);
            this.updateText();
            this.onTouched();
        };
        DateTime.prototype.onTouched = function () { };
        DateTime.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
        };
        DateTime.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-datetime',
                        template: '<div class="datetime-text">{{_text}}</div>' +
                            '<button aria-haspopup="true" ' +
                            'type="button" ' +
                            '[id]="id" ' +
                            'ion-button="item-cover" ' +
                            '[attr.aria-labelledby]="_labelId" ' +
                            '[attr.aria-disabled]="_disabled" ' +
                            'class="item-cover">' +
                            '</button>',
                        host: {
                            '[class.datetime-disabled]': '_disabled'
                        },
                        providers: [exports.DATETIME_VALUE_ACCESSOR],
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        DateTime.ctorParameters = [
            { type: form_1.Form, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: picker_1.PickerController, decorators: [{ type: core_1.Optional },] },
        ];
        DateTime.propDecorators = {
            'min': [{ type: core_1.Input },],
            'max': [{ type: core_1.Input },],
            'displayFormat': [{ type: core_1.Input },],
            'pickerFormat': [{ type: core_1.Input },],
            'cancelText': [{ type: core_1.Input },],
            'doneText': [{ type: core_1.Input },],
            'yearValues': [{ type: core_1.Input },],
            'monthValues': [{ type: core_1.Input },],
            'dayValues': [{ type: core_1.Input },],
            'hourValues': [{ type: core_1.Input },],
            'minuteValues': [{ type: core_1.Input },],
            'monthNames': [{ type: core_1.Input },],
            'monthShortNames': [{ type: core_1.Input },],
            'dayNames': [{ type: core_1.Input },],
            'dayShortNames': [{ type: core_1.Input },],
            'pickerOptions': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
            'ionCancel': [{ type: core_1.Output },],
            '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
            '_keyup': [{ type: core_1.HostListener, args: ['keyup.space',] },],
            'disabled': [{ type: core_1.Input },],
        };
        return DateTime;
    }(ion_1.Ion));
    exports.DateTime = DateTime;
    function convertToArrayOfNumbers(input, type) {
        var values = [];
        if (util_1.isString(input)) {
            input = input.replace(/\[|\]|\s/g, '').split(',');
        }
        if (util_1.isArray(input)) {
            input.forEach(function (num) {
                num = parseInt(num, 10);
                if (!isNaN(num)) {
                    values.push(num);
                }
            });
        }
        if (!values.length) {
            console.warn("Invalid \"" + type + "Values\". Must be an array of numbers, or a comma separated string of numbers.");
        }
        return values;
    }
    function convertToArrayOfStrings(input, type) {
        if (util_1.isPresent(input)) {
            var values = [];
            if (util_1.isString(input)) {
                input = input.replace(/\[|\]/g, '').split(',');
            }
            if (util_1.isArray(input)) {
                input.forEach(function (val) {
                    val = val.trim();
                    if (val) {
                        values.push(val);
                    }
                });
            }
            if (!values.length) {
                console.warn("Invalid \"" + type + "Names\". Must be an array of strings, or a comma separated string.");
            }
            return values;
        }
    }
});
//# sourceMappingURL=datetime.js.map
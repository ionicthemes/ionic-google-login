var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Config } from '../../config/config';
import { PickerController } from '../picker/picker';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { Item } from '../item/item';
import { merge, isBlank, isPresent, isTrueProperty, isArray, isString } from '../../util/util';
import { dateValueRange, renderDateTime, renderTextFormat, convertFormatToKey, getValueFromFormat, parseTemplate, parseDate, updateDate, convertDataToISO, daysInMonth, dateSortValue, dateDataSortValue } from '../../util/datetime-util';
export var DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DateTime; }),
    multi: true
};
export var DateTime = (function (_super) {
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
        this.ionChange = new EventEmitter();
        this.ionCancel = new EventEmitter();
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
        var pickerOptions = merge({}, this.pickerOptions);
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
        if (isPresent(template)) {
            this.calcMinMax();
            template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
            if (template.indexOf('D') === -1) {
                template = template.replace('{~}', 'D');
            }
            template = template.replace(/{~}/g, '');
            parseTemplate(template).forEach(function (format) {
                var key = convertFormatToKey(format);
                var values;
                if (isPresent(_this[key + 'Values'])) {
                    values = convertToArrayOfNumbers(_this[key + 'Values'], key);
                }
                else {
                    values = dateValueRange(format, _this._min, _this._max);
                }
                var column = {
                    name: key,
                    options: values.map(function (val) {
                        return {
                            value: val,
                            text: renderTextFormat(format, val, null, _this._locale),
                        };
                    })
                };
                if (column.options.length) {
                    var selected = column.options.find(function (opt) { return opt.value === getValueFromFormat(_this._value, format); });
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
                numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
            }
        }
        var minCompareVal = dateDataSortValue(this._min);
        var maxCompareVal = dateDataSortValue(this._max);
        if (monthCol) {
            for (i = 0; i < monthCol.options.length; i++) {
                monthOpt = monthCol.options[i];
                monthOpt.disabled = (dateSortValue(selectedYear, monthOpt.value, 31) < minCompareVal ||
                    dateSortValue(selectedYear, monthOpt.value, 1) > maxCompareVal);
            }
        }
        if (dayCol) {
            if (isPresent(selectedMonth)) {
                for (i = 0; i < 31; i++) {
                    dayOpt = dayCol.options[i];
                    var compareVal = dateSortValue(selectedYear, selectedMonth, dayOpt.value);
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
        updateDate(this._value, newData);
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
        this._text = renderDateTime(this.displayFormat, this._value, this._locale);
    };
    DateTime.prototype.calcMinMax = function () {
        var todaysYear = new Date().getFullYear();
        if (isBlank(this.min)) {
            if (isPresent(this.yearValues)) {
                this.min = Math.min.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
            }
            else {
                this.min = (todaysYear - 100).toString();
            }
        }
        if (isBlank(this.max)) {
            if (isPresent(this.yearValues)) {
                this.max = Math.max.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
            }
            else {
                this.max = todaysYear.toString();
            }
        }
        var min = this._min = parseDate(this.min);
        var max = this._max = parseDate(this.max);
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
            this._disabled = isTrueProperty(val);
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
            _this._locale[type] = convertToArrayOfStrings(isPresent(_this[type]) ? _this[type] : _this._config.get(type), type);
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
            fn(convertDataToISO(_this._value));
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
        { type: Component, args: [{
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
                    providers: [DATETIME_VALUE_ACCESSOR],
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    DateTime.ctorParameters = [
        { type: Form, },
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: Item, decorators: [{ type: Optional },] },
        { type: PickerController, decorators: [{ type: Optional },] },
    ];
    DateTime.propDecorators = {
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'displayFormat': [{ type: Input },],
        'pickerFormat': [{ type: Input },],
        'cancelText': [{ type: Input },],
        'doneText': [{ type: Input },],
        'yearValues': [{ type: Input },],
        'monthValues': [{ type: Input },],
        'dayValues': [{ type: Input },],
        'hourValues': [{ type: Input },],
        'minuteValues': [{ type: Input },],
        'monthNames': [{ type: Input },],
        'monthShortNames': [{ type: Input },],
        'dayNames': [{ type: Input },],
        'dayShortNames': [{ type: Input },],
        'pickerOptions': [{ type: Input },],
        'mode': [{ type: Input },],
        'ionChange': [{ type: Output },],
        'ionCancel': [{ type: Output },],
        '_click': [{ type: HostListener, args: ['click', ['$event'],] },],
        '_keyup': [{ type: HostListener, args: ['keyup.space',] },],
        'disabled': [{ type: Input },],
    };
    return DateTime;
}(Ion));
function convertToArrayOfNumbers(input, type) {
    var values = [];
    if (isString(input)) {
        input = input.replace(/\[|\]|\s/g, '').split(',');
    }
    if (isArray(input)) {
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
    if (isPresent(input)) {
        var values = [];
        if (isString(input)) {
            input = input.replace(/\[|\]/g, '').split(',');
        }
        if (isArray(input)) {
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
//# sourceMappingURL=datetime.js.map
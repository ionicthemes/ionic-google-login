import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Optional, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Config } from '../../config/config';
import { PickerController } from '../picker/picker';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { Item } from '../item/item';
import { merge, isBlank, isPresent, isTrueProperty, isArray, isString } from '../../util/util';
import { dateValueRange, renderDateTime, renderTextFormat, convertFormatToKey, getValueFromFormat, parseTemplate, parseDate, updateDate, convertDataToISO, daysInMonth, dateSortValue, dateDataSortValue } from '../../util/datetime-util';
export const DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTime),
    multi: true
};
export class DateTime extends Ion {
    constructor(_form, config, elementRef, renderer, _item, _pickerCtrl) {
        super(config, elementRef, renderer);
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
    set mode(val) {
        this._setMode('datetime', val);
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
        let pickerOptions = merge({}, this.pickerOptions);
        let picker = this._pickerCtrl.create(pickerOptions);
        pickerOptions.buttons = [
            {
                text: this.cancelText,
                role: 'cancel',
                handler: () => {
                    this.ionCancel.emit(null);
                }
            },
            {
                text: this.doneText,
                handler: (data) => {
                    (void 0);
                    this.onChange(data);
                    this.ionChange.emit(data);
                }
            }
        ];
        this.generate(picker);
        this.validate(picker);
        picker.ionChange.subscribe(() => {
            this.validate(picker);
        });
        picker.present(pickerOptions);
        this._isOpen = true;
        picker.onDidDismiss(() => {
            this._isOpen = false;
        });
    }
    generate(picker) {
        let template = this.pickerFormat || this.displayFormat;
        if (isPresent(template)) {
            this.calcMinMax();
            template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
            if (template.indexOf('D') === -1) {
                template = template.replace('{~}', 'D');
            }
            template = template.replace(/{~}/g, '');
            parseTemplate(template).forEach(format => {
                let key = convertFormatToKey(format);
                let values;
                if (isPresent(this[key + 'Values'])) {
                    values = convertToArrayOfNumbers(this[key + 'Values'], key);
                }
                else {
                    values = dateValueRange(format, this._min, this._max);
                }
                let column = {
                    name: key,
                    options: values.map(val => {
                        return {
                            value: val,
                            text: renderTextFormat(format, val, null, this._locale),
                        };
                    })
                };
                if (column.options.length) {
                    var selected = column.options.find(opt => opt.value === getValueFromFormat(this._value, format));
                    if (selected) {
                        column.selectedIndex = column.options.indexOf(selected);
                    }
                    picker.addColumn(column);
                }
            });
            this.divyColumns(picker);
        }
    }
    validate(picker) {
        let i;
        let today = new Date();
        let columns = picker.getColumns();
        let yearCol = columns.find(col => col.name === 'year');
        let monthCol = columns.find(col => col.name === 'month');
        let dayCol = columns.find(col => col.name === 'day');
        let yearOpt;
        let monthOpt;
        let dayOpt;
        let selectedYear = today.getFullYear();
        if (yearCol) {
            yearOpt = yearCol.options[yearCol.selectedIndex];
            if (yearOpt) {
                selectedYear = yearOpt.value;
            }
        }
        let numDaysInMonth = 31;
        let selectedMonth;
        if (monthCol) {
            monthOpt = monthCol.options[monthCol.selectedIndex];
            if (monthOpt) {
                selectedMonth = monthOpt.value;
                numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
            }
        }
        let minCompareVal = dateDataSortValue(this._min);
        let maxCompareVal = dateDataSortValue(this._max);
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
    }
    divyColumns(picker) {
        let pickerColumns = picker.getColumns();
        let columns = [];
        pickerColumns.forEach((col, i) => {
            columns.push(0);
            col.options.forEach(opt => {
                if (opt.text.length > columns[i]) {
                    columns[i] = opt.text.length;
                }
            });
        });
        if (columns.length === 2) {
            var width = Math.max(columns[0], columns[1]);
            pickerColumns[0].columnWidth = pickerColumns[1].columnWidth = `${width * 16}px`;
        }
        else if (columns.length === 3) {
            var width = Math.max(columns[0], columns[2]);
            pickerColumns[1].columnWidth = `${columns[1] * 16}px`;
            pickerColumns[0].columnWidth = pickerColumns[2].columnWidth = `${width * 16}px`;
        }
        else if (columns.length > 3) {
            columns.forEach((col, i) => {
                pickerColumns[i].columnWidth = `${col * 12}px`;
            });
        }
    }
    setValue(newData) {
        updateDate(this._value, newData);
    }
    getValue() {
        return this._value;
    }
    checkHasValue(inputValue) {
        if (this._item) {
            this._item.setElementClass('input-has-value', !!(inputValue && inputValue !== ''));
        }
    }
    updateText() {
        this._text = renderDateTime(this.displayFormat, this._value, this._locale);
    }
    calcMinMax() {
        let todaysYear = new Date().getFullYear();
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
        let min = this._min = parseDate(this.min);
        let max = this._max = parseDate(this.max);
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
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-datetime-disabled', this._disabled);
    }
    writeValue(val) {
        (void 0);
        this.setValue(val);
        this.updateText();
        this.checkHasValue(val);
    }
    ngAfterContentInit() {
        ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(type => {
            this._locale[type] = convertToArrayOfStrings(isPresent(this[type]) ? this[type] : this._config.get(type), type);
        });
        this.updateText();
    }
    registerOnChange(fn) {
        this._fn = fn;
        this.onChange = (val) => {
            (void 0);
            this.setValue(val);
            this.updateText();
            this.checkHasValue(val);
            fn(convertDataToISO(this._value));
            this.onTouched();
        };
    }
    registerOnTouched(fn) { this.onTouched = fn; }
    onChange(val) {
        (void 0);
        this.setValue(val);
        this.updateText();
        this.onTouched();
    }
    onTouched() { }
    ngOnDestroy() {
        this._form.deregister(this);
    }
}
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
function convertToArrayOfNumbers(input, type) {
    var values = [];
    if (isString(input)) {
        input = input.replace(/\[|\]|\s/g, '').split(',');
    }
    if (isArray(input)) {
        input.forEach((num) => {
            num = parseInt(num, 10);
            if (!isNaN(num)) {
                values.push(num);
            }
        });
    }
    if (!values.length) {
        console.warn(`Invalid "${type}Values". Must be an array of numbers, or a comma separated string of numbers.`);
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
            input.forEach((val) => {
                val = val.trim();
                if (val) {
                    values.push(val);
                }
            });
        }
        if (!values.length) {
            console.warn(`Invalid "${type}Names". Must be an array of strings, or a comma separated string.`);
        }
        return values;
    }
}
//# sourceMappingURL=datetime.js.map
import { ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Output, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListHeader } from '../list/list-header';
import { isCheckedProperty } from '../../util/util';
export var RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioGroup; }),
    multi: true
};
export var RadioGroup = (function () {
    function RadioGroup(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._btns = [];
        this._ids = -1;
        this._init = false;
        this.ionChange = new EventEmitter();
        this.id = ++radioGroupIds;
    }
    RadioGroup.prototype.ngAfterContentInit = function () {
        var activeButton = this._btns.find(function (b) { return b.checked; });
        if (activeButton) {
            this._setActive(activeButton);
        }
    };
    RadioGroup.prototype.writeValue = function (val) {
        (void 0);
        this.value = val;
        if (this._init) {
            this._update();
            this.onTouched();
            this.ionChange.emit(val);
        }
        this._init = true;
    };
    RadioGroup.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            (void 0);
            fn(val);
            _this.value = val;
            _this._update();
            _this.onTouched();
            _this.ionChange.emit(val);
        };
    };
    RadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RadioGroup.prototype._update = function () {
        var _this = this;
        var hasChecked = false;
        this._btns.forEach(function (radioButton) {
            radioButton.checked = isCheckedProperty(_this.value, radioButton.value) && !hasChecked;
            if (radioButton.checked) {
                _this._setActive(radioButton);
                hasChecked = true;
            }
        });
    };
    RadioGroup.prototype._setActive = function (radioButton) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-activedescendant', radioButton.id);
    };
    RadioGroup.prototype.add = function (button) {
        var _this = this;
        this._btns.push(button);
        button.ionSelect.subscribe(function (val) {
            _this.onChange(val);
        });
        return this.id + '-' + (++this._ids);
    };
    RadioGroup.prototype.remove = function (button) {
        var index = this._btns.indexOf(button);
        if (index > -1) {
            if (button.value === this.value) {
                this.value = null;
            }
            this._btns.splice(index, 1);
        }
    };
    Object.defineProperty(RadioGroup.prototype, "_header", {
        set: function (header) {
            if (header) {
                if (!header.id) {
                    header.id = 'rg-hdr-' + this.id;
                }
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-describedby', header.id);
            }
        },
        enumerable: true,
        configurable: true
    });
    RadioGroup.prototype.onChange = function (val) {
        (void 0);
        this.value = val;
        this._update();
        this.onTouched();
        this.ionChange.emit(val);
    };
    RadioGroup.prototype.onTouched = function () { };
    RadioGroup.decorators = [
        { type: Directive, args: [{
                    selector: '[radio-group]',
                    host: {
                        'role': 'radiogroup'
                    },
                    providers: [RADIO_VALUE_ACCESSOR]
                },] },
    ];
    RadioGroup.ctorParameters = [
        { type: Renderer, },
        { type: ElementRef, },
    ];
    RadioGroup.propDecorators = {
        'ionChange': [{ type: Output },],
        '_header': [{ type: ContentChild, args: [ListHeader,] },],
    };
    return RadioGroup;
}());
var radioGroupIds = -1;
//# sourceMappingURL=radio-group.js.map
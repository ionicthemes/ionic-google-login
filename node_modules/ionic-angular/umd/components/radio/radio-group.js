(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/forms', '../list/list-header', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var list_header_1 = require('../list/list-header');
    var util_1 = require('../../util/util');
    exports.RADIO_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return RadioGroup; }),
        multi: true
    };
    var RadioGroup = (function () {
        function RadioGroup(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this._btns = [];
            this._ids = -1;
            this._init = false;
            this.ionChange = new core_1.EventEmitter();
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
                radioButton.checked = util_1.isCheckedProperty(_this.value, radioButton.value) && !hasChecked;
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
            { type: core_1.Directive, args: [{
                        selector: '[radio-group]',
                        host: {
                            'role': 'radiogroup'
                        },
                        providers: [exports.RADIO_VALUE_ACCESSOR]
                    },] },
        ];
        RadioGroup.ctorParameters = [
            { type: core_1.Renderer, },
            { type: core_1.ElementRef, },
        ];
        RadioGroup.propDecorators = {
            'ionChange': [{ type: core_1.Output },],
            '_header': [{ type: core_1.ContentChild, args: [list_header_1.ListHeader,] },],
        };
        return RadioGroup;
    }());
    exports.RadioGroup = RadioGroup;
    var radioGroupIds = -1;
});
//# sourceMappingURL=radio-group.js.map
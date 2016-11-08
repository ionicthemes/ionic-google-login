(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var util_1 = require('../../util/util');
    var Option = (function () {
        function Option(_elementRef) {
            this._elementRef = _elementRef;
            this._selected = false;
            this._disabled = false;
            this.ionSelect = new core_1.EventEmitter();
        }
        Object.defineProperty(Option.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "value", {
            get: function () {
                if (util_1.isPresent(this._value)) {
                    return this._value;
                }
                return this.text;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Option.prototype, "text", {
            get: function () {
                return this._elementRef.nativeElement.textContent;
            },
            enumerable: true,
            configurable: true
        });
        Option.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-option'
                    },] },
        ];
        Option.ctorParameters = [
            { type: core_1.ElementRef, },
        ];
        Option.propDecorators = {
            'ionSelect': [{ type: core_1.Output },],
            'selected': [{ type: core_1.Input },],
            'value': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
        };
        return Option;
    }());
    exports.Option = Option;
});
//# sourceMappingURL=option.js.map
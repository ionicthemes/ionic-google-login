(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var Form = (function () {
        function Form() {
            this._focused = null;
            this._ids = -1;
            this._inputs = [];
        }
        Form.prototype.register = function (input) {
            this._inputs.push(input);
        };
        Form.prototype.deregister = function (input) {
            var index = this._inputs.indexOf(input);
            if (index > -1) {
                this._inputs.splice(index, 1);
            }
            if (input === this._focused) {
                this._focused = null;
            }
        };
        Form.prototype.focusOut = function () {
            var activeElement = document.activeElement;
            activeElement && activeElement.blur && activeElement.blur();
        };
        Form.prototype.setAsFocused = function (input) {
            this._focused = input;
        };
        Form.prototype.tabFocus = function (currentInput) {
            var index = this._inputs.indexOf(currentInput);
            if (index > -1 && (index + 1) < this._inputs.length) {
                var nextInput = this._inputs[index + 1];
                if (nextInput !== this._focused) {
                    (void 0);
                    return nextInput.initFocus();
                }
            }
            index = this._inputs.indexOf(this._focused);
            if (index > 0) {
                var previousInput = this._inputs[index - 1];
                if (previousInput) {
                    (void 0);
                    previousInput.initFocus();
                }
            }
        };
        Form.prototype.nextId = function () {
            return ++this._ids;
        };
        Form.decorators = [
            { type: core_1.Injectable },
        ];
        Form.ctorParameters = [];
        return Form;
    }());
    exports.Form = Form;
});
//# sourceMappingURL=form.js.map
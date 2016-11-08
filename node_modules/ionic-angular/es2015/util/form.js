import { Injectable } from '@angular/core';
export class Form {
    constructor() {
        this._focused = null;
        this._ids = -1;
        this._inputs = [];
    }
    register(input) {
        this._inputs.push(input);
    }
    deregister(input) {
        let index = this._inputs.indexOf(input);
        if (index > -1) {
            this._inputs.splice(index, 1);
        }
        if (input === this._focused) {
            this._focused = null;
        }
    }
    focusOut() {
        let activeElement = document.activeElement;
        activeElement && activeElement.blur && activeElement.blur();
    }
    setAsFocused(input) {
        this._focused = input;
    }
    tabFocus(currentInput) {
        let index = this._inputs.indexOf(currentInput);
        if (index > -1 && (index + 1) < this._inputs.length) {
            let nextInput = this._inputs[index + 1];
            if (nextInput !== this._focused) {
                (void 0);
                return nextInput.initFocus();
            }
        }
        index = this._inputs.indexOf(this._focused);
        if (index > 0) {
            let previousInput = this._inputs[index - 1];
            if (previousInput) {
                (void 0);
                previousInput.initFocus();
            }
        }
    }
    nextId() {
        return ++this._ids;
    }
}
Form.decorators = [
    { type: Injectable },
];
Form.ctorParameters = [];
//# sourceMappingURL=form.js.map
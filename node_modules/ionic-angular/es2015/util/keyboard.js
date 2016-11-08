import { Injectable, NgZone } from '@angular/core';
import { Config } from '../config/config';
import { Form } from './form';
import { hasFocusedTextInput, nativeRaf, zoneRafFrames, nativeTimeout } from './dom';
import { Key } from './key';
export class Keyboard {
    constructor(config, _form, _zone) {
        this._form = _form;
        this._zone = _zone;
        _zone.runOutsideAngular(() => {
            this.focusOutline(config.get('focusOutline'), document);
        });
    }
    isOpen() {
        return hasFocusedTextInput();
    }
    onClose(callback, pollingInternval = KEYBOARD_CLOSE_POLLING, pollingChecksMax = KEYBOARD_POLLING_CHECKS_MAX) {
        (void 0);
        const self = this;
        let checks = 0;
        let promise = null;
        if (!callback) {
            promise = new Promise(resolve => { callback = resolve; });
        }
        function checkKeyboard() {
            (void 0);
            if (!self.isOpen() || checks > pollingChecksMax) {
                zoneRafFrames(30, () => {
                    (void 0);
                    callback();
                });
            }
            else {
                nativeTimeout(checkKeyboard, pollingInternval);
            }
            checks++;
        }
        nativeTimeout(checkKeyboard, pollingInternval);
        return promise;
    }
    close() {
        (void 0);
        nativeRaf(() => {
            if (hasFocusedTextInput()) {
                this._form.focusOut();
            }
        });
    }
    focusOutline(setting, document) {
        let self = this;
        let isKeyInputEnabled = false;
        function cssClass() {
            nativeRaf(() => {
                document.body.classList[isKeyInputEnabled ? 'add' : 'remove']('focus-outline');
            });
        }
        if (setting === true) {
            isKeyInputEnabled = true;
            return cssClass();
        }
        else if (setting === false) {
            return;
        }
        function keyDown(ev) {
            if (!isKeyInputEnabled && ev.keyCode === Key.TAB) {
                isKeyInputEnabled = true;
                enableKeyInput();
            }
        }
        function pointerDown() {
            isKeyInputEnabled = false;
            enableKeyInput();
        }
        function enableKeyInput() {
            cssClass();
            self._zone.runOutsideAngular(() => {
                document.removeEventListener('mousedown', pointerDown);
                document.removeEventListener('touchstart', pointerDown);
                if (isKeyInputEnabled) {
                    document.addEventListener('mousedown', pointerDown);
                    document.addEventListener('touchstart', pointerDown);
                }
            });
        }
        document.addEventListener('keydown', keyDown);
    }
}
Keyboard.decorators = [
    { type: Injectable },
];
Keyboard.ctorParameters = [
    { type: Config, },
    { type: Form, },
    { type: NgZone, },
];
const KEYBOARD_CLOSE_POLLING = 150;
const KEYBOARD_POLLING_CHECKS_MAX = 100;
//# sourceMappingURL=keyboard.js.map
import { Injectable, NgZone } from '@angular/core';
import { Config } from '../config/config';
import { Form } from './form';
import { hasFocusedTextInput, nativeRaf, zoneRafFrames, nativeTimeout } from './dom';
import { Key } from './key';
export var Keyboard = (function () {
    function Keyboard(config, _form, _zone) {
        var _this = this;
        this._form = _form;
        this._zone = _zone;
        _zone.runOutsideAngular(function () {
            _this.focusOutline(config.get('focusOutline'), document);
        });
    }
    Keyboard.prototype.isOpen = function () {
        return hasFocusedTextInput();
    };
    Keyboard.prototype.onClose = function (callback, pollingInternval, pollingChecksMax) {
        if (pollingInternval === void 0) { pollingInternval = KEYBOARD_CLOSE_POLLING; }
        if (pollingChecksMax === void 0) { pollingChecksMax = KEYBOARD_POLLING_CHECKS_MAX; }
        (void 0);
        var self = this;
        var checks = 0;
        var promise = null;
        if (!callback) {
            promise = new Promise(function (resolve) { callback = resolve; });
        }
        function checkKeyboard() {
            (void 0);
            if (!self.isOpen() || checks > pollingChecksMax) {
                zoneRafFrames(30, function () {
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
    };
    Keyboard.prototype.close = function () {
        var _this = this;
        (void 0);
        nativeRaf(function () {
            if (hasFocusedTextInput()) {
                _this._form.focusOut();
            }
        });
    };
    Keyboard.prototype.focusOutline = function (setting, document) {
        var self = this;
        var isKeyInputEnabled = false;
        function cssClass() {
            nativeRaf(function () {
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
            self._zone.runOutsideAngular(function () {
                document.removeEventListener('mousedown', pointerDown);
                document.removeEventListener('touchstart', pointerDown);
                if (isKeyInputEnabled) {
                    document.addEventListener('mousedown', pointerDown);
                    document.addEventListener('touchstart', pointerDown);
                }
            });
        }
        document.addEventListener('keydown', keyDown);
    };
    Keyboard.decorators = [
        { type: Injectable },
    ];
    Keyboard.ctorParameters = [
        { type: Config, },
        { type: Form, },
        { type: NgZone, },
    ];
    return Keyboard;
}());
var KEYBOARD_CLOSE_POLLING = 150;
var KEYBOARD_POLLING_CHECKS_MAX = 100;
//# sourceMappingURL=keyboard.js.map
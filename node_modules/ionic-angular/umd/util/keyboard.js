(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../config/config', './form', './dom', './key'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../config/config');
    var form_1 = require('./form');
    var dom_1 = require('./dom');
    var key_1 = require('./key');
    var Keyboard = (function () {
        function Keyboard(config, _form, _zone) {
            var _this = this;
            this._form = _form;
            this._zone = _zone;
            _zone.runOutsideAngular(function () {
                _this.focusOutline(config.get('focusOutline'), document);
            });
        }
        Keyboard.prototype.isOpen = function () {
            return dom_1.hasFocusedTextInput();
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
                    dom_1.zoneRafFrames(30, function () {
                        (void 0);
                        callback();
                    });
                }
                else {
                    dom_1.nativeTimeout(checkKeyboard, pollingInternval);
                }
                checks++;
            }
            dom_1.nativeTimeout(checkKeyboard, pollingInternval);
            return promise;
        };
        Keyboard.prototype.close = function () {
            var _this = this;
            (void 0);
            dom_1.nativeRaf(function () {
                if (dom_1.hasFocusedTextInput()) {
                    _this._form.focusOut();
                }
            });
        };
        Keyboard.prototype.focusOutline = function (setting, document) {
            var self = this;
            var isKeyInputEnabled = false;
            function cssClass() {
                dom_1.nativeRaf(function () {
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
                if (!isKeyInputEnabled && ev.keyCode === key_1.Key.TAB) {
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
            { type: core_1.Injectable },
        ];
        Keyboard.ctorParameters = [
            { type: config_1.Config, },
            { type: form_1.Form, },
            { type: core_1.NgZone, },
        ];
        return Keyboard;
    }());
    exports.Keyboard = Keyboard;
    var KEYBOARD_CLOSE_POLLING = 150;
    var KEYBOARD_POLLING_CHECKS_MAX = 100;
});
//# sourceMappingURL=keyboard.js.map
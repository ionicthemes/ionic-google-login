var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/forms', '../app/app', '../../config/config', '../content/content', '../../util/form', './input-base', '../../util/util', '../item/item', './native-input', '../../navigation/nav-controller', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var content_1 = require('../content/content');
    var form_1 = require('../../util/form');
    var input_base_1 = require('./input-base');
    var util_1 = require('../../util/util');
    var item_1 = require('../item/item');
    var native_input_1 = require('./native-input');
    var nav_controller_1 = require('../../navigation/nav-controller');
    var platform_1 = require('../../platform/platform');
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl) {
            _super.call(this, config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl);
            this._clearInput = false;
            this.placeholder = '';
            this.blur = new core_1.EventEmitter();
            this.focus = new core_1.EventEmitter();
            this.mode = config.get('mode');
        }
        Object.defineProperty(TextInput.prototype, "clearInput", {
            get: function () {
                return this._clearInput;
            },
            set: function (val) {
                this._clearInput = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                _super.prototype.setValue.call(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (val) {
                _super.prototype.setType.call(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                _super.prototype.setDisabled.call(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "mode", {
            set: function (val) {
                this._setMode('input', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "_nativeInput", {
            set: function (nativeInput) {
                _super.prototype.setNativeInput.call(this, nativeInput);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "_nextInput", {
            set: function (nextInput) {
                _super.prototype.setNextInput.call(this, nextInput);
            },
            enumerable: true,
            configurable: true
        });
        TextInput.prototype.inputBlurred = function (ev) {
            this.blur.emit(ev);
        };
        TextInput.prototype.inputFocused = function (ev) {
            this.focus.emit(ev);
        };
        TextInput.prototype.ngOnInit = function () {
            if (this._item) {
                this._item.setElementClass('item-input', true);
                this._item.registerInput(this._type);
            }
        };
        TextInput.prototype.ngAfterContentChecked = function () {
            this.setItemInputControlCss();
        };
        TextInput.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
        };
        TextInput.prototype.clearTextInput = function () {
            (void 0);
            this._value = '';
            this.onChange(this._value);
            this.writeValue(this._value);
        };
        TextInput.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-input',
                        template: '<input [type]="type" [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" class="text-input" [ngClass]="\'text-input-\' + _mode">' +
                            '<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">' +
                            '<button ion-button clear [hidden]="!clearInput" type="button" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>' +
                            '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        TextInput.ctorParameters = [
            { type: config_1.Config, },
            { type: form_1.Form, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: app_1.App, },
            { type: platform_1.Platform, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: content_1.Content, decorators: [{ type: core_1.Optional },] },
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
            { type: forms_1.NgControl, decorators: [{ type: core_1.Optional },] },
        ];
        TextInput.propDecorators = {
            'placeholder': [{ type: core_1.Input },],
            'clearInput': [{ type: core_1.Input },],
            'value': [{ type: core_1.Input },],
            'type': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            '_nativeInput': [{ type: core_1.ViewChild, args: [native_input_1.NativeInput,] },],
            '_nextInput': [{ type: core_1.ViewChild, args: [native_input_1.NextInput,] },],
            'blur': [{ type: core_1.Output },],
            'focus': [{ type: core_1.Output },],
        };
        return TextInput;
    }(input_base_1.InputBase));
    exports.TextInput = TextInput;
    var TextArea = (function (_super) {
        __extends(TextArea, _super);
        function TextArea(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl) {
            _super.call(this, config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl);
            this.placeholder = '';
            this.blur = new core_1.EventEmitter();
            this.focus = new core_1.EventEmitter();
            this.mode = config.get('mode');
        }
        Object.defineProperty(TextArea.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                _super.prototype.setValue.call(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (val) {
                _super.prototype.setType.call(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                _super.prototype.setDisabled.call(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "mode", {
            set: function (val) {
                this._setMode('input', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "_nativeInput", {
            set: function (nativeInput) {
                _super.prototype.setNativeInput.call(this, nativeInput);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextArea.prototype, "_nextInput", {
            set: function (nextInput) {
                _super.prototype.setNextInput.call(this, nextInput);
            },
            enumerable: true,
            configurable: true
        });
        TextArea.prototype.ngOnInit = function () {
            if (this._item) {
                this._item.setElementClass('item-textarea', true);
                this._item.setElementClass('item-input', true);
                this._item.registerInput(this._type);
            }
        };
        TextArea.prototype.ngAfterContentChecked = function () {
            this.setItemInputControlCss();
        };
        TextArea.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
        };
        TextArea.prototype.inputBlurred = function (ev) {
            this.blur.emit(ev);
        };
        TextArea.prototype.inputFocused = function (ev) {
            this.focus.emit(ev);
        };
        TextArea.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-textarea',
                        template: '<textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" class="text-input" [ngClass]="\'text-input-\' + _mode"></textarea>' +
                            '<input type="text" aria-hidden="true" next-input *ngIf="_useAssist">' +
                            '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        TextArea.ctorParameters = [
            { type: config_1.Config, },
            { type: form_1.Form, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: app_1.App, },
            { type: platform_1.Platform, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: content_1.Content, decorators: [{ type: core_1.Optional },] },
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
            { type: forms_1.NgControl, decorators: [{ type: core_1.Optional },] },
        ];
        TextArea.propDecorators = {
            'placeholder': [{ type: core_1.Input },],
            'value': [{ type: core_1.Input },],
            'type': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            '_nativeInput': [{ type: core_1.ViewChild, args: [native_input_1.NativeInput,] },],
            '_nextInput': [{ type: core_1.ViewChild, args: [native_input_1.NextInput,] },],
            'blur': [{ type: core_1.Output },],
            'focus': [{ type: core_1.Output },],
        };
        return TextArea;
    }(input_base_1.InputBase));
    exports.TextArea = TextArea;
});
//# sourceMappingURL=input.js.map
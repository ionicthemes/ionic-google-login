var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Optional, ElementRef, EventEmitter, Input, Output, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Form } from '../../util/form';
import { InputBase } from './input-base';
import { isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
import { NativeInput, NextInput } from './native-input';
import { NavController } from '../../navigation/nav-controller';
import { Platform } from '../../platform/platform';
export var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl) {
        _super.call(this, config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl);
        this._clearInput = false;
        this.placeholder = '';
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.mode = config.get('mode');
    }
    Object.defineProperty(TextInput.prototype, "clearInput", {
        get: function () {
            return this._clearInput;
        },
        set: function (val) {
            this._clearInput = isTrueProperty(val);
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
        { type: Component, args: [{
                    selector: 'ion-input',
                    template: '<input [type]="type" [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" class="text-input" [ngClass]="\'text-input-\' + _mode">' +
                        '<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">' +
                        '<button ion-button clear [hidden]="!clearInput" type="button" class="text-input-clear-icon" (click)="clearTextInput()" (mousedown)="clearTextInput()"></button>' +
                        '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    TextInput.ctorParameters = [
        { type: Config, },
        { type: Form, },
        { type: Item, decorators: [{ type: Optional },] },
        { type: App, },
        { type: Platform, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: Content, decorators: [{ type: Optional },] },
        { type: NavController, decorators: [{ type: Optional },] },
        { type: NgControl, decorators: [{ type: Optional },] },
    ];
    TextInput.propDecorators = {
        'placeholder': [{ type: Input },],
        'clearInput': [{ type: Input },],
        'value': [{ type: Input },],
        'type': [{ type: Input },],
        'disabled': [{ type: Input },],
        'mode': [{ type: Input },],
        '_nativeInput': [{ type: ViewChild, args: [NativeInput,] },],
        '_nextInput': [{ type: ViewChild, args: [NextInput,] },],
        'blur': [{ type: Output },],
        'focus': [{ type: Output },],
    };
    return TextInput;
}(InputBase));
export var TextArea = (function (_super) {
    __extends(TextArea, _super);
    function TextArea(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl) {
        _super.call(this, config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl);
        this.placeholder = '';
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'ion-textarea',
                    template: '<textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" class="text-input" [ngClass]="\'text-input-\' + _mode"></textarea>' +
                        '<input type="text" aria-hidden="true" next-input *ngIf="_useAssist">' +
                        '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    TextArea.ctorParameters = [
        { type: Config, },
        { type: Form, },
        { type: Item, decorators: [{ type: Optional },] },
        { type: App, },
        { type: Platform, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: Content, decorators: [{ type: Optional },] },
        { type: NavController, decorators: [{ type: Optional },] },
        { type: NgControl, decorators: [{ type: Optional },] },
    ];
    TextArea.propDecorators = {
        'placeholder': [{ type: Input },],
        'value': [{ type: Input },],
        'type': [{ type: Input },],
        'disabled': [{ type: Input },],
        'mode': [{ type: Input },],
        '_nativeInput': [{ type: ViewChild, args: [NativeInput,] },],
        '_nextInput': [{ type: ViewChild, args: [NextInput,] },],
        'blur': [{ type: Output },],
        'focus': [{ type: Output },],
    };
    return TextArea;
}(InputBase));
//# sourceMappingURL=input.js.map
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
export class TextInput extends InputBase {
    constructor(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl) {
        super(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl);
        this._clearInput = false;
        this.placeholder = '';
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.mode = config.get('mode');
    }
    get clearInput() {
        return this._clearInput;
    }
    set clearInput(val) {
        this._clearInput = isTrueProperty(val);
    }
    get value() {
        return this._value;
    }
    set value(val) {
        super.setValue(val);
    }
    get type() {
        return this._type;
    }
    set type(val) {
        super.setType(val);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        super.setDisabled(val);
    }
    set mode(val) {
        this._setMode('input', val);
    }
    set _nativeInput(nativeInput) {
        super.setNativeInput(nativeInput);
    }
    set _nextInput(nextInput) {
        super.setNextInput(nextInput);
    }
    inputBlurred(ev) {
        this.blur.emit(ev);
    }
    inputFocused(ev) {
        this.focus.emit(ev);
    }
    ngOnInit() {
        if (this._item) {
            this._item.setElementClass('item-input', true);
            this._item.registerInput(this._type);
        }
    }
    ngAfterContentChecked() {
        this.setItemInputControlCss();
    }
    ngOnDestroy() {
        this._form.deregister(this);
    }
    clearTextInput() {
        (void 0);
        this._value = '';
        this.onChange(this._value);
        this.writeValue(this._value);
    }
}
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
export class TextArea extends InputBase {
    constructor(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl) {
        super(config, form, item, app, platform, elementRef, renderer, scrollView, nav, ngControl);
        this.placeholder = '';
        this.blur = new EventEmitter();
        this.focus = new EventEmitter();
        this.mode = config.get('mode');
    }
    get value() {
        return this._value;
    }
    set value(val) {
        super.setValue(val);
    }
    get type() {
        return this._type;
    }
    set type(val) {
        super.setType(val);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        super.setDisabled(val);
    }
    set mode(val) {
        this._setMode('input', val);
    }
    set _nativeInput(nativeInput) {
        super.setNativeInput(nativeInput);
    }
    set _nextInput(nextInput) {
        super.setNextInput(nextInput);
    }
    ngOnInit() {
        if (this._item) {
            this._item.setElementClass('item-textarea', true);
            this._item.setElementClass('item-input', true);
            this._item.registerInput(this._type);
        }
    }
    ngAfterContentChecked() {
        this.setItemInputControlCss();
    }
    ngOnDestroy() {
        this._form.deregister(this);
    }
    inputBlurred(ev) {
        this.blur.emit(ev);
    }
    inputFocused(ev) {
        this.focus.emit(ev);
    }
}
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
//# sourceMappingURL=input.js.map
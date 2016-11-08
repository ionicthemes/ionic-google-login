import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Form } from '../../util/form';
import { InputBase } from './input-base';
import { Item } from '../item/item';
import { NativeInput, NextInput } from './native-input';
import { NavController } from '../../navigation/nav-controller';
import { Platform } from '../../platform/platform';
export declare class TextInput extends InputBase {
    constructor(config: Config, form: Form, item: Item, app: App, platform: Platform, elementRef: ElementRef, renderer: Renderer, scrollView: Content, nav: NavController, ngControl: NgControl);
    _clearInput: boolean;
    placeholder: string;
    clearInput: any;
    value: any;
    type: any;
    disabled: any;
    mode: string;
    _nativeInput: NativeInput;
    _nextInput: NextInput;
    blur: EventEmitter<Event>;
    focus: EventEmitter<Event>;
    inputBlurred(ev: UIEvent): void;
    inputFocused(ev: UIEvent): void;
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    clearTextInput(): void;
}
export declare class TextArea extends InputBase {
    constructor(config: Config, form: Form, item: Item, app: App, platform: Platform, elementRef: ElementRef, renderer: Renderer, scrollView: Content, nav: NavController, ngControl: NgControl);
    placeholder: string;
    value: any;
    type: any;
    disabled: any;
    mode: string;
    _nativeInput: NativeInput;
    _nextInput: NextInput;
    blur: EventEmitter<Event>;
    focus: EventEmitter<Event>;
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    inputBlurred(ev: UIEvent): void;
    inputFocused(ev: UIEvent): void;
}

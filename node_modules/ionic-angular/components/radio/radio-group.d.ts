import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { RadioButton } from './radio-button';
export declare const RADIO_VALUE_ACCESSOR: any;
export declare class RadioGroup {
    private _renderer;
    private _elementRef;
    _btns: RadioButton[];
    _fn: Function;
    _ids: number;
    _init: boolean;
    value: any;
    id: number;
    ionChange: EventEmitter<RadioGroup>;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    ngAfterContentInit(): void;
    writeValue(val: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: any): void;
    _update(): void;
    _setActive(radioButton: RadioButton): void;
    add(button: RadioButton): string;
    remove(button: RadioButton): void;
    _header: any;
    onChange(val: any): void;
    onTouched(): void;
}

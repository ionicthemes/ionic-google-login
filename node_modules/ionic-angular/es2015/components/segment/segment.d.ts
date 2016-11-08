import { ElementRef, EventEmitter, QueryList, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export declare class SegmentButton {
    private _renderer;
    private _elementRef;
    _disabled: boolean;
    value: string;
    ionSelect: EventEmitter<SegmentButton>;
    constructor(_renderer: Renderer, _elementRef: ElementRef);
    disabled: boolean;
    _setElementClass(cssClass: string, shouldAdd: boolean): void;
    onClick(): void;
    ngOnInit(): void;
    isActive: any;
}
export declare class Segment extends Ion {
    _disabled: boolean;
    value: string;
    color: string;
    mode: string;
    ionChange: EventEmitter<SegmentButton>;
    _buttons: QueryList<SegmentButton>;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, ngControl: NgControl);
    disabled: boolean;
    writeValue(value: any): void;
    ngAfterViewInit(): void;
    onChange: (_: any) => void;
    onTouched: (_: any) => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}

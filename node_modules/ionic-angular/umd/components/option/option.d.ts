import { ElementRef, EventEmitter } from '@angular/core';
export declare class Option {
    private _elementRef;
    _selected: any;
    _disabled: any;
    _value: any;
    ionSelect: EventEmitter<any>;
    constructor(_elementRef: ElementRef);
    selected: any;
    value: any;
    disabled: any;
    readonly text: any;
}

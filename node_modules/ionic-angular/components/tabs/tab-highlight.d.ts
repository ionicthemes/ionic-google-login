import { ElementRef } from '@angular/core';
import { Tab } from './tab';
export declare class TabHighlight {
    private _elementRef;
    private _init;
    constructor(_elementRef: ElementRef);
    select(tab: Tab): void;
}

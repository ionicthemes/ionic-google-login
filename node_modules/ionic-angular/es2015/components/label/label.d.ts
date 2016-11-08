import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export declare class Label extends Ion {
    private _id;
    color: string;
    mode: string;
    type: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, isFloating: string, isStacked: string, isFixed: string, isInset: string);
    id: string;
    readonly text: string;
}

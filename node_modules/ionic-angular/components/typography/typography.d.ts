import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export declare class Typography extends Ion {
    color: string;
    mode: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
}

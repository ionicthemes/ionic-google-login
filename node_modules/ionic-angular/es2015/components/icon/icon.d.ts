import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export declare class Icon extends Ion {
    _iconMode: string;
    _isActive: boolean;
    _name: string;
    _ios: string;
    _md: string;
    _css: string;
    color: string;
    mode: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    ngOnDestroy(): void;
    name: string;
    ios: string;
    md: string;
    isActive: boolean;
    _hidden: boolean;
    update(): void;
}

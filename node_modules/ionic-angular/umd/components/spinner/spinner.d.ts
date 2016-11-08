import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export declare class Spinner extends Ion {
    _c: any[];
    _l: any[];
    _name: string;
    _dur: number;
    _init: boolean;
    _applied: string;
    color: string;
    mode: string;
    name: string;
    duration: number;
    paused: boolean;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    load(): void;
    _loadEle(spinner: any, index: number, total: number): any;
}

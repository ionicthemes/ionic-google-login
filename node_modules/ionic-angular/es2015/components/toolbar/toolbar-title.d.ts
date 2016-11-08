import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Navbar } from '../navbar/navbar';
import { Toolbar } from './toolbar';
export declare class ToolbarTitle extends Ion {
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, toolbar: Toolbar, navbar: Navbar);
    getTitleText(): any;
}

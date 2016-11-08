import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { ToolbarTitle } from './toolbar-title';
import { ViewController } from '../../navigation/view-controller';
export declare class Header extends Ion {
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, viewCtrl: ViewController);
}
export declare class Footer extends Ion {
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, viewCtrl: ViewController);
}
export declare class ToolbarBase extends Ion {
    private _title;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    _setTitle(titleCmp: ToolbarTitle): void;
    getTitleText(): any;
}
export declare class Toolbar extends ToolbarBase {
    _sbPadding: boolean;
    color: string;
    mode: string;
    constructor(viewCtrl: ViewController, config: Config, elementRef: ElementRef, renderer: Renderer);
}

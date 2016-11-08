import { ElementRef } from '@angular/core';
import { MenuController } from './menu-controller';
import { Navbar } from '../navbar/navbar';
import { ViewController } from '../../navigation/view-controller';
export declare class MenuToggle {
    private _menu;
    private _viewCtrl;
    private _navbar;
    menuToggle: string;
    private _inNavbar;
    constructor(_menu: MenuController, elementRef: ElementRef, _viewCtrl: ViewController, _navbar: Navbar);
    toggle(): void;
    readonly isHidden: boolean;
}

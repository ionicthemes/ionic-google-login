import { AfterContentInit } from '@angular/core';
import { DeepLinker } from '../../navigation/deep-linker';
import { NavController } from '../../navigation/nav-controller';
import { ViewController } from '../../navigation/view-controller';
export declare class NavPop {
    _nav: NavController;
    constructor(_nav: NavController);
    onClick(): boolean;
}
export declare class NavPopAnchor implements AfterContentInit {
    host: NavPop;
    linker: DeepLinker;
    viewCtrl: ViewController;
    _href: string;
    constructor(host: NavPop, linker: DeepLinker, viewCtrl: ViewController);
    updateHref(): void;
    ngAfterContentInit(): void;
}

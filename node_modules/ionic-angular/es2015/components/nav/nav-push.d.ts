import { AfterContentInit } from '@angular/core';
import { DeepLinker } from '../../navigation/deep-linker';
import { NavController } from '../../navigation/nav-controller';
export declare class NavPush {
    _nav: NavController;
    navPush: any[] | string;
    navParams: {
        [k: string]: any;
    };
    constructor(_nav: NavController);
    onClick(): boolean;
}
export declare class NavPushAnchor implements AfterContentInit {
    host: NavPush;
    linker: DeepLinker;
    _href: string;
    constructor(host: NavPush, linker: DeepLinker);
    updateHref(): void;
    ngAfterContentInit(): void;
}

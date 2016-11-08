import { AfterViewInit, ComponentFactoryResolver, ElementRef, NgZone, Renderer, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { GestureController } from '../../gestures/gesture-controller';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { NavOptions } from '../../navigation/nav-util';
import { TransitionController } from '../../transitions/transition-controller';
import { ViewController } from '../../navigation/view-controller';
export declare class Nav extends NavControllerBase implements AfterViewInit {
    private _root;
    private _hasInit;
    constructor(viewCtrl: ViewController, parent: NavControllerBase, app: App, config: Config, keyboard: Keyboard, elementRef: ElementRef, zone: NgZone, renderer: Renderer, cfr: ComponentFactoryResolver, gestureCtrl: GestureController, transCtrl: TransitionController, linker: DeepLinker);
    _vp: ViewContainerRef;
    ngAfterViewInit(): void;
    goToRoot(opts: NavOptions): void;
    root: any;
    rootParams: any;
    swipeBackEnabled: boolean;
    destroy(): void;
}

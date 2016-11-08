import { ComponentFactoryResolver, ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { Config } from '../../config/config';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export declare class PopoverCmp {
    _cfr: ComponentFactoryResolver;
    _elementRef: ElementRef;
    _renderer: Renderer;
    _config: Config;
    _navParams: NavParams;
    _viewCtrl: ViewController;
    _viewport: ViewContainerRef;
    d: {
        cssClass?: string;
        showBackdrop?: boolean;
        enableBackdropDismiss?: boolean;
    };
    _enabled: boolean;
    id: number;
    constructor(_cfr: ComponentFactoryResolver, _elementRef: ElementRef, _renderer: Renderer, _config: Config, _navParams: NavParams, _viewCtrl: ViewController);
    ionViewPreLoad(): void;
    _load(component: any): void;
    _setCssClass(componentRef: any, className: string): void;
    _bdClick(): Promise<boolean>;
    _keyUp(ev: KeyboardEvent): void;
}

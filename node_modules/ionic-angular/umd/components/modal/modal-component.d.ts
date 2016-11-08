import { ComponentFactoryResolver, Renderer, ViewContainerRef } from '@angular/core';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export declare class ModalCmp {
    _cfr: ComponentFactoryResolver;
    _renderer: Renderer;
    _navParams: NavParams;
    _viewCtrl: ViewController;
    _viewport: ViewContainerRef;
    _bdDismiss: boolean;
    _enabled: boolean;
    constructor(_cfr: ComponentFactoryResolver, _renderer: Renderer, _navParams: NavParams, _viewCtrl: ViewController);
    ionViewPreLoad(): void;
    _load(component: any): void;
    _setCssClass(componentRef: any, className: string): void;
    _bdClick(): Promise<boolean>;
    _keyUp(ev: KeyboardEvent): void;
}

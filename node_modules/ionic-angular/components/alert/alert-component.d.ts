import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export declare class AlertCmp {
    _viewCtrl: ViewController;
    _elementRef: ElementRef;
    _config: Config;
    activeId: string;
    descId: string;
    d: {
        cssClass?: string;
        message?: string;
        title?: string;
        subTitle?: string;
        buttons?: any[];
        inputs?: any[];
        enableBackdropDismiss?: boolean;
    };
    enabled: boolean;
    hdrId: string;
    id: number;
    inputType: string;
    lastClick: number;
    msgId: string;
    subHdrId: string;
    mode: string;
    constructor(_viewCtrl: ViewController, _elementRef: ElementRef, _config: Config, params: NavParams, renderer: Renderer);
    ionViewDidLoad(): void;
    keyUp(ev: KeyboardEvent): void;
    ionViewDidEnter(): void;
    btnClick(button: any, dismissDelay?: number): void;
    rbClick(checkedInput: any): void;
    cbClick(checkedInput: any): void;
    bdClick(): void;
    dismiss(role: any): Promise<any>;
    getValues(): any;
}

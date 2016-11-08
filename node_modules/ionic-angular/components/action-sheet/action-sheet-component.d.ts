import { Renderer, ElementRef } from '@angular/core';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export declare class ActionSheetCmp {
    private _viewCtrl;
    private _config;
    private _elementRef;
    private _form;
    d: {
        title?: string;
        subTitle?: string;
        cssClass?: string;
        buttons?: Array<any>;
        enableBackdropDismiss?: boolean;
        cancelButton: any;
    };
    descId: string;
    enabled: boolean;
    hdrId: string;
    id: number;
    mode: string;
    constructor(_viewCtrl: ViewController, _config: Config, _elementRef: ElementRef, _form: Form, params: NavParams, renderer: Renderer);
    ionViewDidLoad(): void;
    ionViewDidEnter(): void;
    keyUp(ev: KeyboardEvent): void;
    click(button: any, dismissDelay?: number): void;
    bdClick(): void;
    dismiss(role: any): Promise<any>;
}

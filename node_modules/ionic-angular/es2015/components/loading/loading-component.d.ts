import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
import { LoadingOptions } from './loading-options';
export declare class LoadingCmp {
    private _viewCtrl;
    private _config;
    private _elementRef;
    d: LoadingOptions;
    id: number;
    showSpinner: boolean;
    durationTimeout: number;
    constructor(_viewCtrl: ViewController, _config: Config, _elementRef: ElementRef, params: NavParams, renderer: Renderer);
    ngOnInit(): void;
    ionViewDidEnter(): void;
    dismiss(role: any): Promise<any>;
}

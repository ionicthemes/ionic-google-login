import { ElementRef, Renderer } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { NavController } from '../../navigation/nav-controller';
import { ToolbarBase } from '../toolbar/toolbar';
import { ViewController } from '../../navigation/view-controller';
export declare class Navbar extends ToolbarBase {
    _app: App;
    private navCtrl;
    _bbTxt: ElementRef;
    _bbIcon: string;
    _hidden: boolean;
    _hideBb: boolean;
    _sbPadding: boolean;
    color: string;
    mode: string;
    hideBackButton: boolean;
    constructor(_app: App, viewCtrl: ViewController, navCtrl: NavController, config: Config, elementRef: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
    backButtonClick(ev: UIEvent): void;
    setBackButtonText(text: string): void;
    didEnter(): void;
    setHidden(isHidden: boolean): void;
}

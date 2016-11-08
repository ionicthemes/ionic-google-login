import { App } from '../app/app';
import { AlertOptions, AlertInputOptions } from './alert-options';
import { NavOptions } from '../../navigation/nav-util';
import { ViewController } from '../../navigation/view-controller';
export declare class Alert extends ViewController {
    private _app;
    constructor(app: App, opts?: AlertOptions);
    getTransitionName(direction: string): any;
    setTitle(title: string): void;
    setSubTitle(subTitle: string): void;
    setMessage(message: string): void;
    addInput(input: AlertInputOptions): void;
    addButton(button: any): void;
    setCssClass(cssClass: string): void;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class AlertController {
    private _app;
    constructor(_app: App);
    create(opts?: AlertOptions): Alert;
}

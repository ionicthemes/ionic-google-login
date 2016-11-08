import { App } from '../app/app';
import { ModalOptions } from './modal-options';
import { NavOptions } from '../../navigation/nav-util';
import { ViewController } from '../../navigation/view-controller';
export declare class Modal extends ViewController {
    private _app;
    constructor(app: App, component: any, data?: any, opts?: ModalOptions);
    getTransitionName(direction: string): any;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class ModalController {
    private _app;
    constructor(_app: App);
    create(component: any, data?: any, opts?: ModalOptions): Modal;
}

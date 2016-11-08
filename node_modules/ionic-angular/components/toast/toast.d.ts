import { App } from '../app/app';
import { NavOptions } from '../../navigation/nav-util';
import { ToastOptions } from './toast-options';
import { ViewController } from '../../navigation/view-controller';
export declare class Toast extends ViewController {
    private _app;
    constructor(app: App, opts?: ToastOptions);
    getTransitionName(direction: string): any;
    isValidPosition(position: string): boolean;
    setMessage(message: string): void;
    present(navOptions?: NavOptions): Promise<any>;
    dismissAll(): void;
}
export declare class ToastController {
    private _app;
    constructor(_app: App);
    create(opts?: ToastOptions): Toast;
}

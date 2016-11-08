import { App } from '../app/app';
import { NavOptions } from '../../navigation/nav-util';
import { PopoverOptions } from './popover-options';
import { ViewController } from '../../navigation/view-controller';
export declare class Popover extends ViewController {
    private _app;
    constructor(app: App, component: any, data?: any, opts?: PopoverOptions);
    getTransitionName(direction: string): any;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class PopoverController {
    private _app;
    constructor(_app: App);
    create(component: any, data?: {}, opts?: PopoverOptions): Popover;
}

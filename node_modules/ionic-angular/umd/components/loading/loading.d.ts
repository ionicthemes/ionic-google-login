import { App } from '../app/app';
import { LoadingOptions } from './loading-options';
import { NavOptions } from '../../navigation/nav-util';
import { ViewController } from '../../navigation/view-controller';
export declare class Loading extends ViewController {
    private _app;
    constructor(app: App, opts?: LoadingOptions);
    getTransitionName(direction: string): any;
    setContent(content: string): void;
    present(navOptions?: NavOptions): Promise<any>;
    dismissAll(): void;
}
export declare class LoadingController {
    private _app;
    constructor(_app: App);
    create(opts?: LoadingOptions): Loading;
}

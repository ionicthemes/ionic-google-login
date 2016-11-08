import { ActionSheetOptions } from './action-sheet-options';
import { App } from '../app/app';
import { NavOptions } from '../../navigation/nav-util';
import { ViewController } from '../../navigation/view-controller';
export declare class ActionSheet extends ViewController {
    private _app;
    constructor(app: App, opts: ActionSheetOptions);
    getTransitionName(direction: string): any;
    setTitle(title: string): void;
    setSubTitle(subTitle: string): void;
    addButton(button: any): void;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class ActionSheetController {
    private _app;
    constructor(_app: App);
    create(opts?: ActionSheetOptions): ActionSheet;
}

import { EventEmitter } from '@angular/core';
import { App } from '../app/app';
import { NavOptions } from '../../navigation/nav-util';
import { PickerOptions, PickerColumn } from './picker-options';
import { ViewController } from '../../navigation/view-controller';
export declare class Picker extends ViewController {
    private _app;
    ionChange: EventEmitter<any>;
    constructor(app: App, opts?: PickerOptions);
    getTransitionName(direction: string): any;
    addButton(button: any): void;
    addColumn(column: PickerColumn): void;
    getColumns(): PickerColumn[];
    refresh(): void;
    setCssClass(cssClass: string): void;
    present(navOptions?: NavOptions): Promise<any>;
}
export declare class PickerController {
    private _app;
    constructor(_app: App);
    create(opts?: PickerOptions): Picker;
}

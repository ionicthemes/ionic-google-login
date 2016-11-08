import { NgZone } from '@angular/core';
import { Config } from '../config/config';
import { Form } from './form';
export declare class Keyboard {
    private _form;
    private _zone;
    constructor(config: Config, _form: Form, _zone: NgZone);
    isOpen(): boolean;
    onClose(callback: Function, pollingInternval?: number, pollingChecksMax?: number): Promise<any>;
    close(): void;
    focusOutline(setting: any, document: any): void;
}

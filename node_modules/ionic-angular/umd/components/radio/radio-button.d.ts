import { ElementRef, EventEmitter, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { Item } from '../item/item';
import { RadioGroup } from './radio-group';
export declare class RadioButton extends Ion implements OnDestroy, OnInit {
    private _form;
    private _item;
    private _group;
    _checked: boolean;
    _disabled: boolean;
    _labelId: string;
    _value: any;
    id: string;
    color: string;
    mode: string;
    ionSelect: EventEmitter<any>;
    constructor(_form: Form, config: Config, elementRef: ElementRef, renderer: Renderer, _item: Item, _group: RadioGroup);
    value: any;
    checked: boolean;
    disabled: boolean;
    _click(ev: UIEvent): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}

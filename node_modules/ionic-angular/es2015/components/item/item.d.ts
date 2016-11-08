import { ElementRef, QueryList, Renderer } from '@angular/core';
import { Button } from '../button/button';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Icon } from '../icon/icon';
import { Ion } from '../ion';
import { Label } from '../label/label';
export declare class Item extends Ion {
    _ids: number;
    _inputs: Array<string>;
    _label: Label;
    _viewLabel: boolean;
    id: string;
    labelId: string;
    color: string;
    mode: string;
    constructor(form: Form, config: Config, elementRef: ElementRef, renderer: Renderer);
    registerInput(type: string): string;
    ngAfterContentInit(): void;
    _updateColor(newColor: string, colorClass?: string): void;
    getLabelText(): string;
    contentLabel: Label;
    viewLabel: Label;
    _buttons: QueryList<Button>;
    _icons: QueryList<Icon>;
}
export declare class ItemContent {
}
export declare class ItemGroup {
}

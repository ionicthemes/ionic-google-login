import { PipeTransform } from '@angular/core';
import { Translate } from './translate';
export declare class TranslatePipe implements PipeTransform {
    private translate;
    constructor(translate: Translate);
    transform(value: any, args: any): any;
    supports(obj: any): boolean;
}

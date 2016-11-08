import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export declare class Card extends Ion {
    color: string;
    mode: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
}
export declare class CardContent {
}
export declare class CardHeader {
}
export declare class CardTitle {
}

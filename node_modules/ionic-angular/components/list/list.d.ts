import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { GestureController } from '../../gestures/gesture-controller';
export declare class List extends Ion {
    _gestureCtrl: GestureController;
    private _enableSliding;
    private _containsSlidingItems;
    private _slidingGesture;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer, _gestureCtrl: GestureController);
    mode: string;
    sliding: boolean;
    containsSlidingItem(contains: boolean): void;
    private _updateSlidingState();
    closeSlidingItems(): void;
    destroy(): void;
}

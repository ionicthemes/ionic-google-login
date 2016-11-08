import { ElementRef, Renderer } from '@angular/core';
import { GestureController } from '../../gestures/gesture-controller';
export declare class Backdrop {
    private _gestureCtrl;
    private _elementRef;
    private _renderer;
    private _gestureID;
    disableScroll: boolean;
    constructor(_gestureCtrl: GestureController, _elementRef: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getNativeElement(): HTMLElement;
    setElementClass(className: string, add: boolean): void;
}

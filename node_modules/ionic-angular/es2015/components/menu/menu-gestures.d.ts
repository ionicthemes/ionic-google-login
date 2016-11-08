import { Menu } from './menu';
import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
import { SlideData } from '../../gestures/slide-gesture';
import { GestureController } from '../../gestures/gesture-controller';
export declare class MenuContentGesture extends SlideEdgeGesture {
    menu: Menu;
    constructor(menu: Menu, contentEle: HTMLElement, gestureCtrl: GestureController, options?: any);
    canStart(ev: any): boolean;
    onSlideBeforeStart(ev: any): void;
    onSlide(slide: SlideData, ev: any): void;
    onSlideEnd(slide: SlideData, ev: any): void;
    getElementStartPos(slide: SlideData, ev: any): number;
    getSlideBoundaries(): {
        min: number;
        max: number;
    };
}

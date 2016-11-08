import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Gesture } from '../../gestures/gesture';
import { Ion } from '../ion';
import { Swiper } from './swiper-widget';
export declare class Slides extends Ion {
    rapidUpdate: Function;
    id: number;
    slideId: string;
    showPager: boolean;
    slider: Swiper;
    maxScale: number;
    zoomElement: HTMLElement;
    zoomGesture: Gesture;
    scale: number;
    zoomLastPosX: number;
    zoomLastPosY: number;
    viewportWidth: number;
    viewportHeight: number;
    enableZoom: boolean;
    touch: {
        x: number;
        y: number;
        startX: number;
        startY: number;
        deltaX: number;
        deltaY: number;
        lastX: number;
        lastY: number;
        target: HTMLElement;
        zoomable: HTMLElement;
        zoomableWidth: number;
        zoomableHeight: number;
    };
    options: any;
    pager: any;
    zoom: any;
    zoomDuration: any;
    zoomMax: any;
    ionWillChange: EventEmitter<any>;
    ionDidChange: EventEmitter<any>;
    ionDrag: EventEmitter<any>;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    onTap(swiper: any, e: any): void;
    onClick(swiper: any, e: any): void;
    onDoubleTap(swiper: any, e: any): void;
    onLazyImageLoad(swiper: any, slide: any, img: any): void;
    onLazyImageReady(swiper: any, slide: any, img: any): void;
    initZoom(): void;
    resetZoom(): void;
    toggleZoom(swiper: any, e: any): void;
    onTransitionStart(swiper: any, e: any): void;
    onTransitionEnd(swiper: any, e: any): void;
    onTouchStart(e: any): void;
    onTouchMove(e: any): boolean;
    onTouchEnd(e: UIEvent): void;
    update(): void;
    slideTo(index: number, speed?: number, runCallbacks?: boolean): void;
    slideNext(speed?: number, runCallbacks?: boolean): void;
    slidePrev(speed?: number, runCallbacks?: boolean): void;
    getActiveIndex(): number;
    getPreviousIndex(): number;
    length(): number;
    isEnd(): boolean;
    isBeginning(): boolean;
    getSlider(): Swiper;
}
export declare class Slide {
    slides: Slides;
    ele: HTMLElement;
    zoom: any;
    constructor(elementRef: ElementRef, slides: Slides);
    ngOnDestroy(): void;
}
export declare class SlideLazy {
}

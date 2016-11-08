import { ElementRef } from '@angular/core';
export declare class Scroll {
    private _elementRef;
    _scrollX: boolean;
    _scrollY: boolean;
    _zoom: boolean;
    _maxZoom: number;
    scrollX: any;
    scrollY: any;
    zoom: any;
    maxZoom: any;
    maxScale: number;
    zoomDuration: number;
    scrollElement: HTMLElement;
    constructor(_elementRef: ElementRef);
    ngOnInit(): void;
    addScrollEventListener(handler: any): () => void;
}

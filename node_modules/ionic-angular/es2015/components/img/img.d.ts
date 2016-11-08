import { ElementRef, NgZone } from '@angular/core';
import { Platform } from '../../platform/platform';
export declare class Img {
    private _elementRef;
    private _platform;
    private _zone;
    _src: string;
    _normalizeSrc: string;
    _imgs: HTMLImageElement[];
    _w: string;
    _h: string;
    _enabled: boolean;
    _init: boolean;
    constructor(_elementRef: ElementRef, _platform: Platform, _zone: NgZone);
    src: string;
    ngOnInit(): void;
    _update(): void;
    _loaded(isLoaded: boolean): void;
    enable(shouldEnable: boolean): void;
    width: string | number;
    height: string | number;
    alt: string;
    title: string;
    readonly _width: string;
    readonly _height: string;
}

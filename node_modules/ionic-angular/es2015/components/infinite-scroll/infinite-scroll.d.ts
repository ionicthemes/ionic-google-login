import { ElementRef, EventEmitter, NgZone } from '@angular/core';
import { Content } from '../content/content';
export declare class InfiniteScroll {
    private _content;
    private _zone;
    private _elementRef;
    _lastCheck: number;
    _highestY: number;
    _scLsn: Function;
    _thr: string;
    _thrPx: number;
    _thrPc: number;
    _init: boolean;
    state: string;
    threshold: string;
    enabled: boolean;
    ionInfinite: EventEmitter<InfiniteScroll>;
    constructor(_content: Content, _zone: NgZone, _elementRef: ElementRef);
    _onScroll(): number;
    complete(): void;
    enable(shouldEnable: boolean): void;
    _setListeners(shouldListen: boolean): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}

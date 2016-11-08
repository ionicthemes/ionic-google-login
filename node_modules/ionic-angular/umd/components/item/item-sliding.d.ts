import { ElementRef, EventEmitter, QueryList, Renderer, NgZone } from '@angular/core';
import { Item } from './item';
import { List } from '../list/list';
export declare const enum ItemSideFlags {
    None = 0,
    Left = 1,
    Right = 2,
    Both = 3,
}
export declare class ItemOptions {
    private _elementRef;
    private _renderer;
    side: string;
    ionSwipe: EventEmitter<ItemSliding>;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    getSides(): ItemSideFlags;
    width(): any;
}
export declare const enum SlidingState {
    Disabled = 2,
    Enabled = 4,
    Right = 8,
    Left = 16,
    SwipeRight = 32,
    SwipeLeft = 64,
}
export declare class ItemSliding {
    private _renderer;
    private _elementRef;
    private _zone;
    private _openAmount;
    private _startX;
    private _optsWidthRightSide;
    private _optsWidthLeftSide;
    private _sides;
    private _timer;
    private _leftOptions;
    private _rightOptions;
    private _optsDirty;
    private _state;
    item: Item;
    ionDrag: EventEmitter<ItemSliding>;
    constructor(list: List, _renderer: Renderer, _elementRef: ElementRef, _zone: NgZone);
    _itemOptions: QueryList<ItemOptions>;
    getOpenAmount(): number;
    getSlidingPercent(): number;
    startSliding(startX: number): void;
    moveSliding(x: number): number;
    endSliding(velocity: number): number;
    private fireSwipeEvent();
    private calculateOptsWidth();
    private _setOpenAmount(openAmount, isFinal);
    private _setState(state);
    close(): void;
    setElementClass(cssClass: string, shouldAdd: boolean): void;
}

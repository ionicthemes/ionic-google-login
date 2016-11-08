import { ElementRef, EventEmitter, NgZone, Renderer } from '@angular/core';
import { Content } from '../content/content';
import { ItemReorderGesture } from '../item/item-reorder-gesture';
export interface ReorderIndexes {
    from: number;
    to: number;
}
export declare class ItemReorder {
    private _rendered;
    private _zone;
    private _content;
    _enableReorder: boolean;
    _visibleReorder: boolean;
    _reorderGesture: ItemReorderGesture;
    _lastToIndex: number;
    _element: HTMLElement;
    ionItemReorder: EventEmitter<ReorderIndexes>;
    constructor(elementRef: ElementRef, _rendered: Renderer, _zone: NgZone, _content: Content);
    ngOnDestroy(): void;
    reorder: boolean;
    reorderPrepare(): void;
    reorderStart(): void;
    reorderEmit(fromIndex: number, toIndex: number): void;
    scrollContent(scroll: number): number;
    reorderReset(): void;
    reorderMove(fromIndex: number, toIndex: number, itemHeight: number): void;
    setElementClass(classname: string, add: boolean): void;
    getNativeElement(): HTMLElement;
}
export declare class Reorder {
    private item;
    private elementRef;
    constructor(item: ItemReorder, elementRef: ElementRef);
    getReorderNode(): HTMLElement;
    onClick(ev: any): void;
}
export declare function findReorderItem(node: any, listNode: any): HTMLElement;
export declare function indexForItem(element: any): number;
export declare function reorderListForItem(element: any): any;

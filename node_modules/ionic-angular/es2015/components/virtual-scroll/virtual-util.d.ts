import { ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
export declare function processRecords(stopAtHeight: number, records: any[], cells: VirtualCell[], headerFn: Function, footerFn: Function, data: VirtualData): void;
export declare function populateNodeData(startCellIndex: number, endCellIndex: number, viewportWidth: number, scrollingDown: boolean, cells: VirtualCell[], records: any[], nodes: VirtualNode[], viewContainer: ViewContainerRef, itmTmp: TemplateRef<Object>, hdrTmp: TemplateRef<Object>, ftrTmp: TemplateRef<Object>, initialLoad: boolean): boolean;
export declare function initReadNodes(nodes: VirtualNode[], cells: VirtualCell[], data: VirtualData): void;
export declare function updateDimensions(nodes: VirtualNode[], cells: VirtualCell[], data: VirtualData, initialUpdate: boolean): void;
export declare function writeToNodes(nodes: VirtualNode[], cells: VirtualCell[], totalRecords: number): void;
export declare function adjustRendered(cells: VirtualCell[], data: VirtualData): void;
export declare function getVirtualHeight(totalRecords: number, lastCell: VirtualCell): number;
export declare function estimateHeight(totalRecords: number, lastCell: VirtualCell, existingHeight: number, difference: number): number;
export declare function calcDimensions(data: VirtualData, viewportElement: HTMLElement, approxItemWidth: string, approxItemHeight: string, appoxHeaderWidth: string, approxHeaderHeight: string, approxFooterWidth: string, approxFooterHeight: string, bufferRatio: number): void;
export interface VirtualCell {
    record?: number;
    tmpl?: number;
    data?: any;
    row?: number;
    left?: number;
    width?: number;
    top?: number;
    height?: number;
    reads?: number;
    isLast?: boolean;
}
export interface VirtualNode {
    cell?: number;
    tmpl: number;
    view: EmbeddedViewRef<VirtualContext>;
    isLastRecord?: boolean;
    hidden?: boolean;
    hasChanges?: boolean;
    lastTransform?: string;
}
export declare class VirtualContext {
    $implicit: any;
    index: number;
    count: number;
    constructor($implicit: any, index: number, count: number);
    readonly first: boolean;
    readonly last: boolean;
    readonly even: boolean;
    readonly odd: boolean;
}
export interface VirtualData {
    scrollTop?: number;
    scrollDiff?: number;
    viewWidth?: number;
    viewHeight?: number;
    renderHeight?: number;
    topCell?: number;
    bottomCell?: number;
    topViewCell?: number;
    bottomViewCell?: number;
    valid?: boolean;
    itmWidth?: number;
    itmHeight?: number;
    hdrWidth?: number;
    hdrHeight?: number;
    ftrWidth?: number;
    ftrHeight?: number;
}

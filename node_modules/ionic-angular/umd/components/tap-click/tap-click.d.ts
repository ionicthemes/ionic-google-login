import { NgZone } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { PointerEventType } from '../../util/ui-event-manager';
export declare class TapClick {
    private app;
    private disableClick;
    private usePolyfill;
    private activator;
    private startCoord;
    private events;
    private pointerEvents;
    constructor(config: Config, app: App, zone: NgZone);
    pointerStart(ev: any): boolean;
    pointerMove(ev: UIEvent): void;
    pointerEnd(ev: any, type: PointerEventType): void;
    pointerCancel(ev: UIEvent): void;
    click(ev: any): void;
    handleTapPolyfill(ev: any): void;
    isDisabledNativeClick(): boolean;
}
export declare const isActivatable: (ele: HTMLElement) => boolean;
export declare function setupTapClick(config: Config, app: App, zone: NgZone): () => TapClick;

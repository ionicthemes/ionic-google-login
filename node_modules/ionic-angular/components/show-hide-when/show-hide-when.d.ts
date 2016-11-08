import { NgZone } from '@angular/core';
import { Platform } from '../../platform/platform';
export declare class DisplayWhen {
    platform: Platform;
    zone: NgZone;
    isMatch: boolean;
    conditions: string[];
    constructor(conditions: string, platform: Platform, zone: NgZone);
    orientation(): boolean;
}
export declare class ShowWhen extends DisplayWhen {
    constructor(showWhen: string, platform: Platform, zone: NgZone);
}
export declare class HideWhen extends DisplayWhen {
    constructor(hideWhen: string, platform: Platform, zone: NgZone);
}

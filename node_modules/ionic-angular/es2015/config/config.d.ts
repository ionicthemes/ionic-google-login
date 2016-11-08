import { OpaqueToken } from '@angular/core';
import { Platform } from '../platform/platform';
import { QueryParams } from '../platform/query-params';
export declare class Config {
    private _c;
    private _s;
    private _qp;
    private _modes;
    private _trns;
    platform: Platform;
    init(config: any, queryParams: QueryParams, platform: Platform): void;
    get(key: string, fallbackValue?: any): any;
    getBoolean(key: string, fallbackValue?: boolean): boolean;
    getNumber(key: string, fallbackValue?: number): number;
    set(...args: any[]): this;
    settings(arg0?: any, arg1?: any): any;
    setModeConfig(modeName: string, modeConfig: any): void;
    getModeConfig(modeName: string): any;
    setTransition(trnsName: string, trnsClass: any): void;
    getTransition(trnsName: string): any;
}
export declare const ConfigToken: OpaqueToken;
export declare function setupConfig(userConfig: any, queryParams: QueryParams, platform: Platform): Config;

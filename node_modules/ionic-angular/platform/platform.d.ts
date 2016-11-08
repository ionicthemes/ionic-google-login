import { EventEmitter, NgZone, OpaqueToken } from '@angular/core';
import { QueryParams } from './query-params';
export declare class Platform {
    private _versions;
    private _dir;
    private _lang;
    private _ua;
    private _qp;
    private _bPlt;
    private _onResizes;
    private _readyPromise;
    private _readyResolve;
    private _resizeTm;
    private _bbActions;
    private _registry;
    private _default;
    zone: NgZone;
    _platforms: string[];
    constructor();
    setZone(zone: NgZone): void;
    is(platformName: string): boolean;
    platforms(): Array<string>;
    versions(): {
        [name: string]: PlatformVersion;
    };
    version(): PlatformVersion;
    ready(): Promise<string>;
    triggerReady(readySource: string): void;
    prepareReady(): void;
    setDir(dir: string, updateDocument: boolean): void;
    dir(): string;
    isRTL(): boolean;
    setLang(language: string, updateDocument: boolean): void;
    lang(): string;
    exitApp(): void;
    backButton: EventEmitter<Event>;
    pause: EventEmitter<Event>;
    resume: EventEmitter<Event>;
    registerBackButtonAction(fn: Function, priority?: number): Function;
    runBackButtonAction(): void;
    setUserAgent(userAgent: string): void;
    setQueryParams(queryParams: QueryParams): void;
    userAgent(): string;
    setNavigatorPlatform(navigatorPlatform: string): void;
    navigatorPlatform(): string;
    width(): number;
    height(): number;
    isPortrait(): boolean;
    isLandscape(): boolean;
    windowResize(): void;
    onResize(cb: Function): Function;
    setPlatformConfigs(platformConfigs: {
        [key: string]: PlatformConfig;
    }): void;
    getPlatformConfig(platformName: string): PlatformConfig;
    registry(): {
        [name: string]: PlatformConfig;
    };
    setDefault(platformName: string): void;
    testQuery(queryValue: string, queryTestValue: string): boolean;
    testNavigatorPlatform(navigatorPlatformExpression: string): boolean;
    matchUserAgentVersion(userAgentExpression: RegExp): any;
    isPlatformMatch(queryStringName: string, userAgentAtLeastHas?: string[], userAgentMustNotHave?: string[]): boolean;
    init(): void;
    private matchPlatform(platformName);
}
export interface PlatformConfig {
    isEngine?: boolean;
    initialize?: Function;
    isMatch?: Function;
    superset?: string;
    subsets?: string[];
    settings?: any;
    versionParser?: any;
}
export interface PlatformVersion {
    str?: string;
    num?: number;
    major?: number;
    minor?: number;
}
export declare function setupPlatform(platformConfigs: {
    [key: string]: PlatformConfig;
}, queryParams: QueryParams, userAgent: string, navigatorPlatform: string, docDirection: string, docLanguage: string, zone: NgZone): Platform;
export declare const UserAgentToken: OpaqueToken;
export declare const NavigatorPlatformToken: OpaqueToken;
export declare const DocumentDirToken: OpaqueToken;
export declare const DocLangToken: OpaqueToken;

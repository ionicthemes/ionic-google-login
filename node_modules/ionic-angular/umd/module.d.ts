import { ModuleWithProviders } from '@angular/core';
import { HashLocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { Config } from './config/config';
export { Config, setupConfig, ConfigToken } from './config/config';
export { Platform, setupPlatform, UserAgentToken, DocumentDirToken, DocLangToken, NavigatorPlatformToken } from './platform/platform';
export { Haptic } from './util/haptic';
export { QueryParams, setupQueryParams, UrlToken } from './platform/query-params';
export { DeepLinker } from './navigation/deep-linker';
export { NavController } from './navigation/nav-controller';
export { NavParams } from './navigation/nav-params';
export { NavLink, NavOptions, DeepLink, DeepLinkConfig, DeepLinkMetadata, DeepLinkMetadataType } from './navigation/nav-util';
export { UrlSerializer, DeepLinkConfigToken } from './navigation/url-serializer';
export { ViewController } from './navigation/view-controller';
export declare class IonicModule {
    static forRoot(appRoot: any, config?: any, deepLinkConfig?: any): ModuleWithProviders;
}
export declare function provideLocationStrategy(platformLocationStrategy: PlatformLocation, baseHref: string, config: Config): HashLocationStrategy | PathLocationStrategy;
export declare function provideUserAgent(): string;
export declare function provideNavigatorPlatform(): string;
export declare function provideLocationHref(): string;
export declare function provideDocumentDirection(): string;
export declare function provideDocumentLang(): string;

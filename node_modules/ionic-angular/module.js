import { ANALYZE_FOR_ENTRY_COMPONENTS, APP_INITIALIZER, Inject, NgModule, NgZone, Optional } from '@angular/core';
import { APP_BASE_HREF, Location, LocationStrategy, HashLocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActionSheetController } from './components/action-sheet/action-sheet';
import { AlertController } from './components/alert/alert';
import { App } from './components/app/app';
import { Config, ConfigToken, setupConfig } from './config/config';
import { DeepLinker, setupDeepLinker } from './navigation/deep-linker';
import { Events, setupProvideEvents } from './util/events';
import { Form } from './util/form';
import { GestureController } from './gestures/gesture-controller';
import { Haptic } from './util/haptic';
import { IonicGestureConfig } from './gestures/gesture-config';
import { Keyboard } from './util/keyboard';
import { LoadingController } from './components/loading/loading';
import { MenuController } from './components/menu/menu-controller';
import { ModalController } from './components/modal/modal';
import { PickerController } from './components/picker/picker';
import { Platform, setupPlatform, UserAgentToken, NavigatorPlatformToken, DocumentDirToken, DocLangToken } from './platform/platform';
import { PlatformConfigToken, providePlatformConfigs } from './platform/platform-registry';
import { PopoverController } from './components/popover/popover';
import { QueryParams, setupQueryParams, UrlToken } from './platform/query-params';
import { TapClick, setupTapClick } from './components/tap-click/tap-click';
import { ToastController } from './components/toast/toast';
import { Translate } from './translation/translate';
import { registerModeConfigs } from './config/mode-registry';
import { registerTransitions } from './transitions/transition-registry';
import { TransitionController } from './transitions/transition-controller';
import { AppRootToken } from './components/app/app-root';
import { UrlSerializer, setupUrlSerializer, DeepLinkConfigToken } from './navigation/url-serializer';
import { ActionSheetCmp } from './components/action-sheet/action-sheet-component';
import { AlertCmp } from './components/alert/alert-component';
import { IONIC_DIRECTIVES } from './directives';
import { IonicApp } from './components/app/app-root';
import { LoadingCmp } from './components/loading/loading-component';
import { ModalCmp } from './components/modal/modal-component';
import { PickerCmp } from './components/picker/picker-component';
import { PopoverCmp } from './components/popover/popover-component';
import { ToastCmp } from './components/toast/toast-component';
export { Config, setupConfig, ConfigToken } from './config/config';
export { Platform, setupPlatform, UserAgentToken, DocumentDirToken, DocLangToken, NavigatorPlatformToken } from './platform/platform';
export { Haptic } from './util/haptic';
export { QueryParams, setupQueryParams, UrlToken } from './platform/query-params';
export { DeepLinker } from './navigation/deep-linker';
export { NavController } from './navigation/nav-controller';
export { NavParams } from './navigation/nav-params';
export { DeepLink, DeepLinkMetadata } from './navigation/nav-util';
export { UrlSerializer, DeepLinkConfigToken } from './navigation/url-serializer';
export { ViewController } from './navigation/view-controller';
export var IonicModule = (function () {
    function IonicModule() {
    }
    IonicModule.forRoot = function (appRoot, config, deepLinkConfig) {
        if (config === void 0) { config = null; }
        if (deepLinkConfig === void 0) { deepLinkConfig = null; }
        return {
            ngModule: IonicModule,
            providers: [
                { provide: AppRootToken, useValue: appRoot },
                { provide: ConfigToken, useValue: config },
                { provide: DeepLinkConfigToken, useValue: deepLinkConfig },
                { provide: UserAgentToken, useFactory: provideUserAgent },
                { provide: DocumentDirToken, useFactory: provideDocumentDirection },
                { provide: DocLangToken, useFactory: provideDocumentLang },
                { provide: NavigatorPlatformToken, useFactory: provideNavigatorPlatform },
                { provide: UrlToken, useFactory: provideLocationHref },
                { provide: PlatformConfigToken, useFactory: providePlatformConfigs },
                { provide: QueryParams, useFactory: setupQueryParams, deps: [UrlToken] },
                { provide: Platform, useFactory: setupPlatform, deps: [PlatformConfigToken, QueryParams, UserAgentToken, NavigatorPlatformToken, DocumentDirToken, DocLangToken, NgZone] },
                { provide: Config, useFactory: setupConfig, deps: [ConfigToken, QueryParams, Platform] },
                { provide: APP_INITIALIZER, useFactory: registerModeConfigs, deps: [Config], multi: true },
                { provide: APP_INITIALIZER, useFactory: registerTransitions, deps: [Config], multi: true },
                { provide: APP_INITIALIZER, useFactory: setupProvideEvents, deps: [Platform], multi: true },
                { provide: APP_INITIALIZER, useFactory: setupTapClick, deps: [Config, App, NgZone], multi: true },
                { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig },
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: appRoot, multi: true },
                ActionSheetController,
                AlertController,
                App,
                Events,
                Form,
                Haptic,
                GestureController,
                Keyboard,
                LoadingController,
                Location,
                MenuController,
                ModalController,
                PickerController,
                PopoverController,
                TapClick,
                ToastController,
                Translate,
                TransitionController,
                { provide: LocationStrategy, useFactory: provideLocationStrategy, deps: [PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()], Config] },
                { provide: UrlSerializer, useFactory: setupUrlSerializer, deps: [DeepLinkConfigToken] },
                { provide: DeepLinker, useFactory: setupDeepLinker, deps: [App, UrlSerializer, Location] },
            ]
        };
    };
    IonicModule.decorators = [
        { type: NgModule, args: [{
                    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule],
                    exports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, IONIC_DIRECTIVES],
                    declarations: [
                        ActionSheetCmp,
                        AlertCmp,
                        IONIC_DIRECTIVES,
                        LoadingCmp,
                        ModalCmp,
                        PickerCmp,
                        PopoverCmp,
                        ToastCmp
                    ],
                    entryComponents: [
                        ActionSheetCmp,
                        AlertCmp,
                        IonicApp,
                        LoadingCmp,
                        ModalCmp,
                        PickerCmp,
                        PopoverCmp,
                        ToastCmp
                    ]
                },] },
    ];
    IonicModule.ctorParameters = [];
    return IonicModule;
}());
export function provideLocationStrategy(platformLocationStrategy, baseHref, config) {
    return config.get('locationStrategy') === 'path' ?
        new PathLocationStrategy(platformLocationStrategy, baseHref) :
        new HashLocationStrategy(platformLocationStrategy, baseHref);
}
export function provideUserAgent() {
    return window && window.navigator.userAgent;
}
export function provideNavigatorPlatform() {
    return window && window.navigator.platform;
}
export function provideLocationHref() {
    return window && window.location.href;
}
export function provideDocumentDirection() {
    return document && document.documentElement.dir;
}
export function provideDocumentLang() {
    return document && document.documentElement.lang;
}
//# sourceMappingURL=module.js.map
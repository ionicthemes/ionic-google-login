(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/common', '@angular/platform-browser', '@angular/forms', '@angular/http', './components/action-sheet/action-sheet', './components/alert/alert', './components/app/app', './config/config', './navigation/deep-linker', './util/events', './util/form', './gestures/gesture-controller', './util/haptic', './gestures/gesture-config', './util/keyboard', './components/loading/loading', './components/menu/menu-controller', './components/modal/modal', './components/picker/picker', './platform/platform', './platform/platform-registry', './components/popover/popover', './platform/query-params', './components/tap-click/tap-click', './components/toast/toast', './translation/translate', './config/mode-registry', './transitions/transition-registry', './transitions/transition-controller', './components/app/app-root', './navigation/url-serializer', './components/action-sheet/action-sheet-component', './components/alert/alert-component', './directives', './components/app/app-root', './components/loading/loading-component', './components/modal/modal-component', './components/picker/picker-component', './components/popover/popover-component', './components/toast/toast-component', './config/config', './platform/platform', './util/haptic', './platform/query-params', './navigation/deep-linker', './navigation/nav-controller', './navigation/nav-params', './navigation/nav-util', './navigation/url-serializer', './navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var common_1 = require('@angular/common');
    var platform_browser_1 = require('@angular/platform-browser');
    var forms_1 = require('@angular/forms');
    var http_1 = require('@angular/http');
    var action_sheet_1 = require('./components/action-sheet/action-sheet');
    var alert_1 = require('./components/alert/alert');
    var app_1 = require('./components/app/app');
    var config_1 = require('./config/config');
    var deep_linker_1 = require('./navigation/deep-linker');
    var events_1 = require('./util/events');
    var form_1 = require('./util/form');
    var gesture_controller_1 = require('./gestures/gesture-controller');
    var haptic_1 = require('./util/haptic');
    var gesture_config_1 = require('./gestures/gesture-config');
    var keyboard_1 = require('./util/keyboard');
    var loading_1 = require('./components/loading/loading');
    var menu_controller_1 = require('./components/menu/menu-controller');
    var modal_1 = require('./components/modal/modal');
    var picker_1 = require('./components/picker/picker');
    var platform_1 = require('./platform/platform');
    var platform_registry_1 = require('./platform/platform-registry');
    var popover_1 = require('./components/popover/popover');
    var query_params_1 = require('./platform/query-params');
    var tap_click_1 = require('./components/tap-click/tap-click');
    var toast_1 = require('./components/toast/toast');
    var translate_1 = require('./translation/translate');
    var mode_registry_1 = require('./config/mode-registry');
    var transition_registry_1 = require('./transitions/transition-registry');
    var transition_controller_1 = require('./transitions/transition-controller');
    var app_root_1 = require('./components/app/app-root');
    var url_serializer_1 = require('./navigation/url-serializer');
    var action_sheet_component_1 = require('./components/action-sheet/action-sheet-component');
    var alert_component_1 = require('./components/alert/alert-component');
    var directives_1 = require('./directives');
    var app_root_2 = require('./components/app/app-root');
    var loading_component_1 = require('./components/loading/loading-component');
    var modal_component_1 = require('./components/modal/modal-component');
    var picker_component_1 = require('./components/picker/picker-component');
    var popover_component_1 = require('./components/popover/popover-component');
    var toast_component_1 = require('./components/toast/toast-component');
    var config_2 = require('./config/config');
    exports.Config = config_2.Config;
    exports.setupConfig = config_2.setupConfig;
    exports.ConfigToken = config_2.ConfigToken;
    var platform_2 = require('./platform/platform');
    exports.Platform = platform_2.Platform;
    exports.setupPlatform = platform_2.setupPlatform;
    exports.UserAgentToken = platform_2.UserAgentToken;
    exports.DocumentDirToken = platform_2.DocumentDirToken;
    exports.DocLangToken = platform_2.DocLangToken;
    exports.NavigatorPlatformToken = platform_2.NavigatorPlatformToken;
    var haptic_2 = require('./util/haptic');
    exports.Haptic = haptic_2.Haptic;
    var query_params_2 = require('./platform/query-params');
    exports.QueryParams = query_params_2.QueryParams;
    exports.setupQueryParams = query_params_2.setupQueryParams;
    exports.UrlToken = query_params_2.UrlToken;
    var deep_linker_2 = require('./navigation/deep-linker');
    exports.DeepLinker = deep_linker_2.DeepLinker;
    var nav_controller_1 = require('./navigation/nav-controller');
    exports.NavController = nav_controller_1.NavController;
    var nav_params_1 = require('./navigation/nav-params');
    exports.NavParams = nav_params_1.NavParams;
    var nav_util_1 = require('./navigation/nav-util');
    exports.DeepLink = nav_util_1.DeepLink;
    exports.DeepLinkMetadata = nav_util_1.DeepLinkMetadata;
    var url_serializer_2 = require('./navigation/url-serializer');
    exports.UrlSerializer = url_serializer_2.UrlSerializer;
    exports.DeepLinkConfigToken = url_serializer_2.DeepLinkConfigToken;
    var view_controller_1 = require('./navigation/view-controller');
    exports.ViewController = view_controller_1.ViewController;
    var IonicModule = (function () {
        function IonicModule() {
        }
        IonicModule.forRoot = function (appRoot, config, deepLinkConfig) {
            if (config === void 0) { config = null; }
            if (deepLinkConfig === void 0) { deepLinkConfig = null; }
            return {
                ngModule: IonicModule,
                providers: [
                    { provide: app_root_1.AppRootToken, useValue: appRoot },
                    { provide: config_1.ConfigToken, useValue: config },
                    { provide: url_serializer_1.DeepLinkConfigToken, useValue: deepLinkConfig },
                    { provide: platform_1.UserAgentToken, useFactory: provideUserAgent },
                    { provide: platform_1.DocumentDirToken, useFactory: provideDocumentDirection },
                    { provide: platform_1.DocLangToken, useFactory: provideDocumentLang },
                    { provide: platform_1.NavigatorPlatformToken, useFactory: provideNavigatorPlatform },
                    { provide: query_params_1.UrlToken, useFactory: provideLocationHref },
                    { provide: platform_registry_1.PlatformConfigToken, useFactory: platform_registry_1.providePlatformConfigs },
                    { provide: query_params_1.QueryParams, useFactory: query_params_1.setupQueryParams, deps: [query_params_1.UrlToken] },
                    { provide: platform_1.Platform, useFactory: platform_1.setupPlatform, deps: [platform_registry_1.PlatformConfigToken, query_params_1.QueryParams, platform_1.UserAgentToken, platform_1.NavigatorPlatformToken, platform_1.DocumentDirToken, platform_1.DocLangToken, core_1.NgZone] },
                    { provide: config_1.Config, useFactory: config_1.setupConfig, deps: [config_1.ConfigToken, query_params_1.QueryParams, platform_1.Platform] },
                    { provide: core_1.APP_INITIALIZER, useFactory: mode_registry_1.registerModeConfigs, deps: [config_1.Config], multi: true },
                    { provide: core_1.APP_INITIALIZER, useFactory: transition_registry_1.registerTransitions, deps: [config_1.Config], multi: true },
                    { provide: core_1.APP_INITIALIZER, useFactory: events_1.setupProvideEvents, deps: [platform_1.Platform], multi: true },
                    { provide: core_1.APP_INITIALIZER, useFactory: tap_click_1.setupTapClick, deps: [config_1.Config, app_1.App, core_1.NgZone], multi: true },
                    { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: gesture_config_1.IonicGestureConfig },
                    { provide: core_1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: appRoot, multi: true },
                    action_sheet_1.ActionSheetController,
                    alert_1.AlertController,
                    app_1.App,
                    events_1.Events,
                    form_1.Form,
                    haptic_1.Haptic,
                    gesture_controller_1.GestureController,
                    keyboard_1.Keyboard,
                    loading_1.LoadingController,
                    common_1.Location,
                    menu_controller_1.MenuController,
                    modal_1.ModalController,
                    picker_1.PickerController,
                    popover_1.PopoverController,
                    tap_click_1.TapClick,
                    toast_1.ToastController,
                    translate_1.Translate,
                    transition_controller_1.TransitionController,
                    { provide: common_1.LocationStrategy, useFactory: provideLocationStrategy, deps: [common_1.PlatformLocation, [new core_1.Inject(common_1.APP_BASE_HREF), new core_1.Optional()], config_1.Config] },
                    { provide: url_serializer_1.UrlSerializer, useFactory: url_serializer_1.setupUrlSerializer, deps: [url_serializer_1.DeepLinkConfigToken] },
                    { provide: deep_linker_1.DeepLinker, useFactory: deep_linker_1.setupDeepLinker, deps: [app_1.App, url_serializer_1.UrlSerializer, common_1.Location] },
                ]
            };
        };
        IonicModule.decorators = [
            { type: core_1.NgModule, args: [{
                        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
                        exports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, directives_1.IONIC_DIRECTIVES],
                        declarations: [
                            action_sheet_component_1.ActionSheetCmp,
                            alert_component_1.AlertCmp,
                            directives_1.IONIC_DIRECTIVES,
                            loading_component_1.LoadingCmp,
                            modal_component_1.ModalCmp,
                            picker_component_1.PickerCmp,
                            popover_component_1.PopoverCmp,
                            toast_component_1.ToastCmp
                        ],
                        entryComponents: [
                            action_sheet_component_1.ActionSheetCmp,
                            alert_component_1.AlertCmp,
                            app_root_2.IonicApp,
                            loading_component_1.LoadingCmp,
                            modal_component_1.ModalCmp,
                            picker_component_1.PickerCmp,
                            popover_component_1.PopoverCmp,
                            toast_component_1.ToastCmp
                        ]
                    },] },
        ];
        IonicModule.ctorParameters = [];
        return IonicModule;
    }());
    exports.IonicModule = IonicModule;
    function provideLocationStrategy(platformLocationStrategy, baseHref, config) {
        return config.get('locationStrategy') === 'path' ?
            new common_1.PathLocationStrategy(platformLocationStrategy, baseHref) :
            new common_1.HashLocationStrategy(platformLocationStrategy, baseHref);
    }
    exports.provideLocationStrategy = provideLocationStrategy;
    function provideUserAgent() {
        return window && window.navigator.userAgent;
    }
    exports.provideUserAgent = provideUserAgent;
    function provideNavigatorPlatform() {
        return window && window.navigator.platform;
    }
    exports.provideNavigatorPlatform = provideNavigatorPlatform;
    function provideLocationHref() {
        return window && window.location.href;
    }
    exports.provideLocationHref = provideLocationHref;
    function provideDocumentDirection() {
        return document && document.documentElement.dir;
    }
    exports.provideDocumentDirection = provideDocumentDirection;
    function provideDocumentLang() {
        return document && document.documentElement.lang;
    }
    exports.provideDocumentLang = provideDocumentLang;
});
//# sourceMappingURL=module.js.map
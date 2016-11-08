var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin, Cordova } from './plugin';
/**
 * @name FileOpener
 * @description
 * This plugin will open a file on your device file system with its default application.
 *
 * @usage
 * ```
 * import {FileOpener} from 'ionic-native';
 *
 *
 *
 * ```
 */
export var FileOpener = (function () {
    function FileOpener() {
    }
    /**
     * Open an file
     * @param filePath {string} File Path
     * @param fileMIMEType {string} File MIME Type
     */
    FileOpener.open = function (filePath, fileMIMEType) { return; };
    /**
     * Uninstalls a package
     * @param packageId {string}  Package ID
     */
    FileOpener.uninstall = function (packageId) { return; };
    /**
     * Check if an app is already installed
     * @param packageId {string} Package ID
     */
    FileOpener.appIsInstalled = function (packageId) { return; };
    __decorate([
        Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'error'
        })
    ], FileOpener, "open", null);
    __decorate([
        Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'error'
        })
    ], FileOpener, "uninstall", null);
    __decorate([
        Cordova({
            callbackStyle: 'object',
            successName: 'success',
            errorName: 'error'
        })
    ], FileOpener, "appIsInstalled", null);
    FileOpener = __decorate([
        Plugin({
            plugin: 'cordova-plugin-file-opener2',
            pluginRef: 'cordova.plugins.fileOpener2',
            repo: 'https://github.com/pwlin/cordova-plugin-file-opener2'
        })
    ], FileOpener);
    return FileOpener;
}());
//# sourceMappingURL=file-opener.js.map
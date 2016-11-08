"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var plugin_1 = require('./plugin');
/**
 * @name Google Analytics
 * @description
 * This plugin connects to Google's native Universal Analytics SDK
 * Prerequisites:
 * - A Cordova 3.0+ project for iOS and/or Android
 * - A Mobile App property through the Google Analytics Admin Console
 * - (Android) Google Play Services SDK installed via [Android SDK Manager](https://developer.android.com/sdk/installing/adding-packages.html)
 */
var GoogleAnalytics = (function () {
    function GoogleAnalytics() {
    }
    /**
     * In your 'deviceready' handler, set up your Analytics tracker.
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/
     * @param {string}  id  Your Google Analytics Mobile App property
     * @return {Promise<any>}
     */
    GoogleAnalytics.startTrackerWithId = function (id) { return; };
    /**
     * Enabling Advertising Features in Google Analytics allows you to take advantage of Remarketing, Demographics & Interests reports, and more
     * @param allow {boolean}
     * @return {Promise<any>}
     */
    GoogleAnalytics.setAllowIDFACollection = function (allow) { return; };
    /**
     * Set a UserId
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id
     * @param {string} id User ID
     * @return {Promise<any>}
     */
    GoogleAnalytics.setUserId = function (id) { return; };
    /**
     * Set a anonymize Ip address
     * @param anonymize {boolean} Set to true to anonymize the IP Address
     * @return {Promise<any>}
     */
    GoogleAnalytics.setAnonymizeIp = function (anonymize) { return; };
    /**
     * Sets the app version
     * @param appVersion {string} App version
     * @return {Promise<any>}
     */
    GoogleAnalytics.setAppVersion = function (appVersion) { return; };
    /**
     * Set OptOut
     * @param optout {boolean}
     * @return {Promise<any>}
     */
    GoogleAnalytics.setOptOut = function (optout) { return; };
    /**
     * Enable verbose logging
     * @return {Promise<any>}
     */
    GoogleAnalytics.debugMode = function () { return; };
    /**
     * Track custom metric
     * @param key {string}
     * @param value {any}
     * @return {Promise<any>}
     */
    GoogleAnalytics.trackMetric = function (key, value) { return; };
    /**
     * Track a screen
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/screens
     *
     * @param title {string} Screen title
     * @param campaignUrl {string} Campaign url for measuring referrals
     * @param newSession {boolean} Set to true to create a new session
     * @return {Promise<any>}
     */
    GoogleAnalytics.trackView = function (title, campaignUrl, newSession) { return; };
    /**
     * Add a Custom Dimension
     * https://developers.google.com/analytics/devguides/platform/customdimsmets
     * @param key {string}
     * @param value {string}
     * @return {Promise<any>}
     */
    GoogleAnalytics.addCustomDimension = function (key, value) { return; };
    /**
     * Track an event
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     * @param category {string}
     * @param action {string}
     * @param label {string}
     * @param value {number}
     * @param newSession {boolean} Set to true to create a new session
     * @return {Promise<any>}
     */
    GoogleAnalytics.trackEvent = function (category, action, label, value, newSession) { return; };
    /**
     * Track an exception
     * @param description {string}
     * @param fatal {boolean}
     * @return {Promise<any>}
     */
    GoogleAnalytics.trackException = function (description, fatal) { return; };
    /**
     * Track User Timing (App Speed)
     * @param category {string}
     * @param intervalInMilliseconds {number}
     * @param variable {string}
     * @param label {string}
     * @return {Promise<any>}
     */
    GoogleAnalytics.trackTiming = function (category, intervalInMilliseconds, variable, label) { return; };
    /**
     * Add a Transaction (Ecommerce)
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addTrans
     * @param id {string}
     * @param affiliation {string}
     * @param revenue {number}
     * @param tax {number}
     * @param shipping {number}
     * @param currencyCode {string}
     * @return {Promise<any>}
     */
    GoogleAnalytics.addTransaction = function (id, affiliation, revenue, tax, shipping, currencyCode) { return; };
    /**
     * Add a Transaction Item (Ecommerce)
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#addItem
     * @param {string}  id
     * @param {string}  name
     * @param {string}  sku
     * @param {string}  category
     * @param {number}  price
     * @param {number}  quantity
     * @param {string}  currencyCode
     * @return {Promise<any>}
     */
    GoogleAnalytics.addTransactionItem = function (id, name, sku, category, price, quantity, currencyCode) { return; };
    /**
     * Enable/disable automatic reporting of uncaught exceptions
     * @param shouldEnable {boolean}
     * @return {Promise<any>}
     */
    GoogleAnalytics.enableUncaughtExceptionReporting = function (shouldEnable) { return; };
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "startTrackerWithId", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "setAllowIDFACollection", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "setUserId", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "setAnonymizeIp", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "setAppVersion", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "setOptOut", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "debugMode", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 2,
            errorIndex: 3
        })
    ], GoogleAnalytics, "trackMetric", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 3,
            errorIndex: 4
        })
    ], GoogleAnalytics, "trackView", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "addCustomDimension", null);
    __decorate([
        plugin_1.Cordova({
            successIndex: 5,
            errorIndex: 6
        })
    ], GoogleAnalytics, "trackEvent", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "trackException", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "trackTiming", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "addTransaction", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "addTransactionItem", null);
    __decorate([
        plugin_1.Cordova()
    ], GoogleAnalytics, "enableUncaughtExceptionReporting", null);
    GoogleAnalytics = __decorate([
        plugin_1.Plugin({
            plugin: 'cordova-plugin-google-analytics',
            pluginRef: 'ga',
            repo: 'https://github.com/danwilson/google-analytics-plugin',
            platforms: ['Android', 'iOS']
        })
    ], GoogleAnalytics);
    return GoogleAnalytics;
}());
exports.GoogleAnalytics = GoogleAnalytics;
//# sourceMappingURL=googleanalytics.js.map
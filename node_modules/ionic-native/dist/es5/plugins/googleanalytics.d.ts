/**
 * @name Google Analytics
 * @description
 * This plugin connects to Google's native Universal Analytics SDK
 * Prerequisites:
 * - A Cordova 3.0+ project for iOS and/or Android
 * - A Mobile App property through the Google Analytics Admin Console
 * - (Android) Google Play Services SDK installed via [Android SDK Manager](https://developer.android.com/sdk/installing/adding-packages.html)
 */
export declare class GoogleAnalytics {
    /**
     * In your 'deviceready' handler, set up your Analytics tracker.
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/
     * @param {string}  id  Your Google Analytics Mobile App property
     * @return {Promise<any>}
     */
    static startTrackerWithId(id: string): Promise<any>;
    /**
     * Enabling Advertising Features in Google Analytics allows you to take advantage of Remarketing, Demographics & Interests reports, and more
     * @param allow {boolean}
     * @return {Promise<any>}
     */
    static setAllowIDFACollection(allow: boolean): Promise<any>;
    /**
     * Set a UserId
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id
     * @param {string} id User ID
     * @return {Promise<any>}
     */
    static setUserId(id: string): Promise<any>;
    /**
     * Set a anonymize Ip address
     * @param anonymize {boolean} Set to true to anonymize the IP Address
     * @return {Promise<any>}
     */
    static setAnonymizeIp(anonymize: boolean): Promise<any>;
    /**
     * Sets the app version
     * @param appVersion {string} App version
     * @return {Promise<any>}
     */
    static setAppVersion(appVersion: string): Promise<any>;
    /**
     * Set OptOut
     * @param optout {boolean}
     * @return {Promise<any>}
     */
    static setOptOut(optout: boolean): Promise<any>;
    /**
     * Enable verbose logging
     * @return {Promise<any>}
     */
    static debugMode(): Promise<any>;
    /**
     * Track custom metric
     * @param key {string}
     * @param value {any}
     * @return {Promise<any>}
     */
    static trackMetric(key: string, value?: any): Promise<any>;
    /**
     * Track a screen
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/screens
     *
     * @param title {string} Screen title
     * @param campaignUrl {string} Campaign url for measuring referrals
     * @param newSession {boolean} Set to true to create a new session
     * @return {Promise<any>}
     */
    static trackView(title: string, campaignUrl?: string, newSession?: boolean): Promise<any>;
    /**
     * Add a Custom Dimension
     * https://developers.google.com/analytics/devguides/platform/customdimsmets
     * @param key {string}
     * @param value {string}
     * @return {Promise<any>}
     */
    static addCustomDimension(key: number, value: string): Promise<any>;
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
    static trackEvent(category: string, action: string, label?: string, value?: number, newSession?: boolean): Promise<any>;
    /**
     * Track an exception
     * @param description {string}
     * @param fatal {boolean}
     * @return {Promise<any>}
     */
    static trackException(description: string, fatal: boolean): Promise<any>;
    /**
     * Track User Timing (App Speed)
     * @param category {string}
     * @param intervalInMilliseconds {number}
     * @param variable {string}
     * @param label {string}
     * @return {Promise<any>}
     */
    static trackTiming(category: string, intervalInMilliseconds: number, variable: string, label: string): Promise<any>;
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
    static addTransaction(id: string, affiliation: string, revenue: number, tax: number, shipping: number, currencyCode: string): Promise<any>;
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
    static addTransactionItem(id: string, name: string, sku: string, category: string, price: number, quantity: number, currencyCode: string): Promise<any>;
    /**
     * Enable/disable automatic reporting of uncaught exceptions
     * @param shouldEnable {boolean}
     * @return {Promise<any>}
     */
    static enableUncaughtExceptionReporting(shouldEnable: boolean): Promise<any>;
}

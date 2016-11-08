export declare class Translate {
    private _transMap;
    private _language;
    translations(lang: any, map: any): void;
    setLanguage(lang: any): void;
    getTranslations(lang: any): any;
    translate(key: any, lang: any): any;
    _getTranslation(map: any, key: any): any;
}

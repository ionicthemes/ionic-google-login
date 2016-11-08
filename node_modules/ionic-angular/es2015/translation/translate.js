export class Translate {
    constructor() {
        this._transMap = {};
        this._language = {};
    }
    translations(lang, map) {
        this._transMap[lang] = map;
    }
    setLanguage(lang) {
        this._language = lang;
        console.warn('Translate provider and TranslatePipe has been deprecated and will be removed in the next version. Please use NG2-Translate instead: http://ionicframework.com/docs/v2/resources/ng2-translate/');
    }
    getTranslations(lang) {
        return this._transMap[lang];
    }
    translate(key, lang) {
        if (!lang && !this._language) {
            return key;
        }
        let setLanguage = lang || this._language;
        let map = this.getTranslations(setLanguage);
        if (!map) {
            console.warn('I18N: No translation for key', key, 'using language', setLanguage);
            return '';
        }
        return this._getTranslation(map, key);
    }
    _getTranslation(map, key) {
        return map && map[key] || '';
    }
}
//# sourceMappingURL=translate.js.map
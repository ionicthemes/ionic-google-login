export var Translate = (function () {
    function Translate() {
        this._transMap = {};
        this._language = {};
    }
    Translate.prototype.translations = function (lang, map) {
        this._transMap[lang] = map;
    };
    Translate.prototype.setLanguage = function (lang) {
        this._language = lang;
        console.warn('Translate provider and TranslatePipe has been deprecated and will be removed in the next version. Please use NG2-Translate instead: http://ionicframework.com/docs/v2/resources/ng2-translate/');
    };
    Translate.prototype.getTranslations = function (lang) {
        return this._transMap[lang];
    };
    Translate.prototype.translate = function (key, lang) {
        if (!lang && !this._language) {
            return key;
        }
        var setLanguage = lang || this._language;
        var map = this.getTranslations(setLanguage);
        if (!map) {
            console.warn('I18N: No translation for key', key, 'using language', setLanguage);
            return '';
        }
        return this._getTranslation(map, key);
    };
    Translate.prototype._getTranslation = function (map, key) {
        return map && map[key] || '';
    };
    return Translate;
}());
//# sourceMappingURL=translate.js.map
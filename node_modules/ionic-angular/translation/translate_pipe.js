import { Injectable, Pipe } from '@angular/core';
import { Translate } from './translate';
export var TranslatePipe = (function () {
    function TranslatePipe(translate) {
        this.translate = {};
        this.translate = translate;
    }
    TranslatePipe.prototype.transform = function (value, args) {
        var lang;
        if (args.length > 0) {
            lang = args[0];
        }
        return this.translate.translate(value, lang);
    };
    TranslatePipe.prototype.supports = function (obj) { return true; };
    TranslatePipe.decorators = [
        { type: Pipe, args: [{ name: 'translate' },] },
        { type: Injectable },
    ];
    TranslatePipe.ctorParameters = [
        { type: Translate, },
    ];
    return TranslatePipe;
}());
//# sourceMappingURL=translate_pipe.js.map
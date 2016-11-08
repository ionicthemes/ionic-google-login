import { Injectable, Pipe } from '@angular/core';
import { Translate } from './translate';
export class TranslatePipe {
    constructor(translate) {
        this.translate = {};
        this.translate = translate;
    }
    transform(value, args) {
        let lang;
        if (args.length > 0) {
            lang = args[0];
        }
        return this.translate.translate(value, lang);
    }
    supports(obj) { return true; }
}
TranslatePipe.decorators = [
    { type: Pipe, args: [{ name: 'translate' },] },
    { type: Injectable },
];
TranslatePipe.ctorParameters = [
    { type: Translate, },
];
//# sourceMappingURL=translate_pipe.js.map
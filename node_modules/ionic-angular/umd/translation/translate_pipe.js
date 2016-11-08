(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './translate'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var translate_1 = require('./translate');
    var TranslatePipe = (function () {
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
            { type: core_1.Pipe, args: [{ name: 'translate' },] },
            { type: core_1.Injectable },
        ];
        TranslatePipe.ctorParameters = [
            { type: translate_1.Translate, },
        ];
        return TranslatePipe;
    }());
    exports.TranslatePipe = TranslatePipe;
});
//# sourceMappingURL=translate_pipe.js.map
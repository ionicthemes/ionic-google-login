(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var Note = (function () {
        function Note() {
        }
        Note.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-note'
                    },] },
        ];
        Note.ctorParameters = [];
        return Note;
    }());
    exports.Note = Note;
});
//# sourceMappingURL=note.js.map
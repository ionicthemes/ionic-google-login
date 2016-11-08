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
    var Thumbnail = (function () {
        function Thumbnail() {
        }
        Thumbnail.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-thumbnail'
                    },] },
        ];
        Thumbnail.ctorParameters = [];
        return Thumbnail;
    }());
    exports.Thumbnail = Thumbnail;
});
//# sourceMappingURL=thumbnail.js.map
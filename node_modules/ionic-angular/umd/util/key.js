(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function (Key) {
        Key[Key["ENTER"] = 13] = "ENTER";
        Key[Key["ESCAPE"] = 27] = "ESCAPE";
        Key[Key["TAB"] = 9] = "TAB";
    })(exports.Key || (exports.Key = {}));
    var Key = exports.Key;
    ;
});
//# sourceMappingURL=key.js.map
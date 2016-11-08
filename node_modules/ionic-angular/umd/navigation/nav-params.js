(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var NavParams = (function () {
        function NavParams(data) {
            if (data === void 0) { data = {}; }
            this.data = data;
        }
        NavParams.prototype.get = function (param) {
            return this.data[param];
        };
        return NavParams;
    }());
    exports.NavParams = NavParams;
});
//# sourceMappingURL=nav-params.js.map
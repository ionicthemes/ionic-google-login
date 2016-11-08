(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var NavController = (function () {
        function NavController() {
        }
        return NavController;
    }());
    exports.NavController = NavController;
});
//# sourceMappingURL=nav-controller.js.map
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var IonicErrorHandler = (function () {
        function IonicErrorHandler() {
        }
        IonicErrorHandler.handleError = function (err) {
            var server = window['IonicDevServer'];
            if (server) {
                server.handleError(err);
            }
        };
        return IonicErrorHandler;
    }());
    exports.IonicErrorHandler = IonicErrorHandler;
});
//# sourceMappingURL=ionic-error-handler.js.map
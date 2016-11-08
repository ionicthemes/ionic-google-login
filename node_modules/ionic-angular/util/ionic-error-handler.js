export var IonicErrorHandler = (function () {
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
//# sourceMappingURL=ionic-error-handler.js.map
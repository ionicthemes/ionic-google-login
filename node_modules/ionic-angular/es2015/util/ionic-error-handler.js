export class IonicErrorHandler {
    static handleError(err) {
        let server = window['IonicDevServer'];
        if (server) {
            server.handleError(err);
        }
    }
}
//# sourceMappingURL=ionic-error-handler.js.map
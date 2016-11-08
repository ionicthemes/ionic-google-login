export var NavParams = (function () {
    function NavParams(data) {
        if (data === void 0) { data = {}; }
        this.data = data;
    }
    NavParams.prototype.get = function (param) {
        return this.data[param];
    };
    return NavParams;
}());
//# sourceMappingURL=nav-params.js.map
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
    var QueryParams = (function () {
        function QueryParams(url) {
            this.data = {};
            if (url) {
                var startIndex = url.indexOf('?');
                if (startIndex > -1) {
                    var queries = url.slice(startIndex + 1).split('&');
                    for (var i = 0; i < queries.length; i++) {
                        if (queries[i].indexOf('=') > 0) {
                            var split = queries[i].split('=');
                            if (split.length > 1) {
                                this.data[split[0].toLowerCase()] = split[1].split('#')[0];
                            }
                        }
                    }
                }
            }
        }
        QueryParams.prototype.get = function (key) {
            return this.data[key.toLowerCase()];
        };
        return QueryParams;
    }());
    exports.QueryParams = QueryParams;
    exports.UrlToken = new core_1.OpaqueToken('USERURL');
    function setupQueryParams(url) {
        return new QueryParams(url);
    }
    exports.setupQueryParams = setupQueryParams;
});
//# sourceMappingURL=query-params.js.map
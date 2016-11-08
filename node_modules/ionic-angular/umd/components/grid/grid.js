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
    var Grid = (function () {
        function Grid() {
        }
        Grid.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-grid'
                    },] },
        ];
        Grid.ctorParameters = [];
        return Grid;
    }());
    exports.Grid = Grid;
    var Row = (function () {
        function Row() {
        }
        Row.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-row'
                    },] },
        ];
        Row.ctorParameters = [];
        return Row;
    }());
    exports.Row = Row;
    var Col = (function () {
        function Col() {
        }
        Col.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-col'
                    },] },
        ];
        Col.ctorParameters = [];
        return Col;
    }());
    exports.Col = Col;
});
//# sourceMappingURL=grid.js.map
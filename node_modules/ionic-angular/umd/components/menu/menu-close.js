(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './menu-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var menu_controller_1 = require('./menu-controller');
    var MenuClose = (function () {
        function MenuClose(_menu) {
            this._menu = _menu;
        }
        MenuClose.prototype.close = function () {
            var menu = this._menu.get(this.menuClose);
            menu && menu.close();
        };
        MenuClose.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[menuClose]'
                    },] },
        ];
        MenuClose.ctorParameters = [
            { type: menu_controller_1.MenuController, },
        ];
        MenuClose.propDecorators = {
            'menuClose': [{ type: core_1.Input },],
            'close': [{ type: core_1.HostListener, args: ['click',] },],
        };
        return MenuClose;
    }());
    exports.MenuClose = MenuClose;
});
//# sourceMappingURL=menu-close.js.map
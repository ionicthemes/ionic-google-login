(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './menu-controller', '../navbar/navbar', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var menu_controller_1 = require('./menu-controller');
    var navbar_1 = require('../navbar/navbar');
    var view_controller_1 = require('../../navigation/view-controller');
    var MenuToggle = (function () {
        function MenuToggle(_menu, elementRef, _viewCtrl, _navbar) {
            this._menu = _menu;
            this._viewCtrl = _viewCtrl;
            this._navbar = _navbar;
            this._inNavbar = !!_navbar;
        }
        MenuToggle.prototype.toggle = function () {
            var menu = this._menu.get(this.menuToggle);
            menu && menu.toggle();
        };
        Object.defineProperty(MenuToggle.prototype, "isHidden", {
            get: function () {
                if (this._inNavbar && this._viewCtrl) {
                    if (this._viewCtrl.isFirst()) {
                        return false;
                    }
                    var menu = this._menu.get(this.menuToggle);
                    if (menu) {
                        return !menu.persistent;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        MenuToggle.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[menuToggle]',
                        host: {
                            '[hidden]': 'isHidden',
                            'menuToggle': ''
                        }
                    },] },
        ];
        MenuToggle.ctorParameters = [
            { type: menu_controller_1.MenuController, },
            { type: core_1.ElementRef, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
            { type: navbar_1.Navbar, decorators: [{ type: core_1.Optional },] },
        ];
        MenuToggle.propDecorators = {
            'menuToggle': [{ type: core_1.Input },],
            'toggle': [{ type: core_1.HostListener, args: ['click',] },],
        };
        return MenuToggle;
    }());
    exports.MenuToggle = MenuToggle;
});
//# sourceMappingURL=menu-toggle.js.map
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MenuController = (function () {
        function MenuController() {
            this._menus = [];
        }
        MenuController.prototype.open = function (menuId) {
            var menu = this.get(menuId);
            if (menu) {
                var openedMenu = this.getOpen();
                if (openedMenu && menu !== openedMenu) {
                    openedMenu.setOpen(false, false);
                }
                return menu.open();
            }
            return Promise.resolve(false);
        };
        MenuController.prototype.close = function (menuId) {
            var menu;
            if (menuId) {
                menu = this.get(menuId);
            }
            else {
                menu = this.getOpen();
            }
            if (menu) {
                return menu.close();
            }
            return Promise.resolve(false);
        };
        MenuController.prototype.toggle = function (menuId) {
            var menu = this.get(menuId);
            if (menu) {
                var openedMenu = this.getOpen();
                if (openedMenu && menu !== openedMenu) {
                    openedMenu.setOpen(false, false);
                }
                return menu.toggle();
            }
            return Promise.resolve(false);
        };
        MenuController.prototype.enable = function (shouldEnable, menuId) {
            var menu = this.get(menuId);
            if (menu) {
                return menu.enable(shouldEnable);
            }
        };
        MenuController.prototype.swipeEnable = function (shouldEnable, menuId) {
            var menu = this.get(menuId);
            if (menu) {
                return menu.swipeEnable(shouldEnable);
            }
        };
        MenuController.prototype.isOpen = function (menuId) {
            var menu = this.get(menuId);
            return menu && menu.isOpen || false;
        };
        MenuController.prototype.isEnabled = function (menuId) {
            var menu = this.get(menuId);
            return menu && menu.enabled || false;
        };
        MenuController.prototype.get = function (menuId) {
            var menu;
            if (menuId === 'left' || menuId === 'right') {
                menu = this._menus.find(function (m) { return m.side === menuId && m.enabled; });
                if (menu)
                    return menu;
                return this._menus.find(function (m) { return m.side === menuId; }) || null;
            }
            else if (menuId) {
                return this._menus.find(function (m) { return m.id === menuId; }) || null;
            }
            menu = this._menus.find(function (m) { return m.enabled; });
            if (menu) {
                return menu;
            }
            return (this._menus.length ? this._menus[0] : null);
        };
        MenuController.prototype.getOpen = function () {
            return this._menus.find(function (m) { return m.isOpen; });
        };
        MenuController.prototype.getMenus = function () {
            return this._menus;
        };
        MenuController.prototype.register = function (menu) {
            this._menus.push(menu);
        };
        MenuController.prototype.unregister = function (menu) {
            var index = this._menus.indexOf(menu);
            if (index > -1) {
                this._menus.splice(index, 1);
            }
        };
        MenuController.registerType = function (name, cls) {
            menuTypes[name] = cls;
        };
        MenuController.create = function (type, menuCmp, platform) {
            return new menuTypes[type](menuCmp, platform);
        };
        return MenuController;
    }());
    exports.MenuController = MenuController;
    var menuTypes = {};
});
//# sourceMappingURL=menu-controller.js.map
export class MenuController {
    constructor() {
        this._menus = [];
    }
    open(menuId) {
        let menu = this.get(menuId);
        if (menu) {
            let openedMenu = this.getOpen();
            if (openedMenu && menu !== openedMenu) {
                openedMenu.setOpen(false, false);
            }
            return menu.open();
        }
        return Promise.resolve(false);
    }
    close(menuId) {
        let menu;
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
    }
    toggle(menuId) {
        let menu = this.get(menuId);
        if (menu) {
            let openedMenu = this.getOpen();
            if (openedMenu && menu !== openedMenu) {
                openedMenu.setOpen(false, false);
            }
            return menu.toggle();
        }
        return Promise.resolve(false);
    }
    enable(shouldEnable, menuId) {
        let menu = this.get(menuId);
        if (menu) {
            return menu.enable(shouldEnable);
        }
    }
    swipeEnable(shouldEnable, menuId) {
        let menu = this.get(menuId);
        if (menu) {
            return menu.swipeEnable(shouldEnable);
        }
    }
    isOpen(menuId) {
        let menu = this.get(menuId);
        return menu && menu.isOpen || false;
    }
    isEnabled(menuId) {
        let menu = this.get(menuId);
        return menu && menu.enabled || false;
    }
    get(menuId) {
        var menu;
        if (menuId === 'left' || menuId === 'right') {
            menu = this._menus.find(m => m.side === menuId && m.enabled);
            if (menu)
                return menu;
            return this._menus.find(m => m.side === menuId) || null;
        }
        else if (menuId) {
            return this._menus.find(m => m.id === menuId) || null;
        }
        menu = this._menus.find(m => m.enabled);
        if (menu) {
            return menu;
        }
        return (this._menus.length ? this._menus[0] : null);
    }
    getOpen() {
        return this._menus.find(m => m.isOpen);
    }
    getMenus() {
        return this._menus;
    }
    register(menu) {
        this._menus.push(menu);
    }
    unregister(menu) {
        let index = this._menus.indexOf(menu);
        if (index > -1) {
            this._menus.splice(index, 1);
        }
    }
    static registerType(name, cls) {
        menuTypes[name] = cls;
    }
    static create(type, menuCmp, platform) {
        return new menuTypes[type](menuCmp, platform);
    }
}
let menuTypes = {};
//# sourceMappingURL=menu-controller.js.map
import { Directive, ElementRef, Input, HostListener, Optional } from '@angular/core';
import { MenuController } from './menu-controller';
import { Navbar } from '../navbar/navbar';
import { ViewController } from '../../navigation/view-controller';
export var MenuToggle = (function () {
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
        { type: Directive, args: [{
                    selector: '[menuToggle]',
                    host: {
                        '[hidden]': 'isHidden',
                        'menuToggle': ''
                    }
                },] },
    ];
    MenuToggle.ctorParameters = [
        { type: MenuController, },
        { type: ElementRef, },
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: Navbar, decorators: [{ type: Optional },] },
    ];
    MenuToggle.propDecorators = {
        'menuToggle': [{ type: Input },],
        'toggle': [{ type: HostListener, args: ['click',] },],
    };
    return MenuToggle;
}());
//# sourceMappingURL=menu-toggle.js.map
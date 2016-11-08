import { Directive, ElementRef, Input, HostListener, Optional } from '@angular/core';
import { MenuController } from './menu-controller';
import { Navbar } from '../navbar/navbar';
import { ViewController } from '../../navigation/view-controller';
export class MenuToggle {
    constructor(_menu, elementRef, _viewCtrl, _navbar) {
        this._menu = _menu;
        this._viewCtrl = _viewCtrl;
        this._navbar = _navbar;
        this._inNavbar = !!_navbar;
    }
    toggle() {
        let menu = this._menu.get(this.menuToggle);
        menu && menu.toggle();
    }
    get isHidden() {
        if (this._inNavbar && this._viewCtrl) {
            if (this._viewCtrl.isFirst()) {
                return false;
            }
            let menu = this._menu.get(this.menuToggle);
            if (menu) {
                return !menu.persistent;
            }
        }
        return false;
    }
}
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
//# sourceMappingURL=menu-toggle.js.map
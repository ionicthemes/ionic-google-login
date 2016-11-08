import { Directive, HostListener, Input } from '@angular/core';
import { MenuController } from './menu-controller';
export var MenuClose = (function () {
    function MenuClose(_menu) {
        this._menu = _menu;
    }
    MenuClose.prototype.close = function () {
        var menu = this._menu.get(this.menuClose);
        menu && menu.close();
    };
    MenuClose.decorators = [
        { type: Directive, args: [{
                    selector: '[menuClose]'
                },] },
    ];
    MenuClose.ctorParameters = [
        { type: MenuController, },
    ];
    MenuClose.propDecorators = {
        'menuClose': [{ type: Input },],
        'close': [{ type: HostListener, args: ['click',] },],
    };
    return MenuClose;
}());
//# sourceMappingURL=menu-close.js.map
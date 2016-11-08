import { Directive, HostListener, Input } from '@angular/core';
import { MenuController } from './menu-controller';
export class MenuClose {
    constructor(_menu) {
        this._menu = _menu;
    }
    close() {
        const menu = this._menu.get(this.menuClose);
        menu && menu.close();
    }
}
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
//# sourceMappingURL=menu-close.js.map
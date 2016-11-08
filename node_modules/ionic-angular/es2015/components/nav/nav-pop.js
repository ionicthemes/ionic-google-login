import { Directive, HostListener, Optional } from '@angular/core';
import { DeepLinker } from '../../navigation/deep-linker';
import { NavController } from '../../navigation/nav-controller';
import { ViewController } from '../../navigation/view-controller';
export class NavPop {
    constructor(_nav) {
        this._nav = _nav;
        if (!_nav) {
            console.error('navPop must be within a NavController');
        }
    }
    onClick() {
        if (this._nav) {
            this._nav.pop(null, null);
            return false;
        }
        return true;
    }
}
NavPop.decorators = [
    { type: Directive, args: [{
                selector: '[navPop]'
            },] },
];
NavPop.ctorParameters = [
    { type: NavController, decorators: [{ type: Optional },] },
];
NavPop.propDecorators = {
    'onClick': [{ type: HostListener, args: ['click',] },],
};
export class NavPopAnchor {
    constructor(host, linker, viewCtrl) {
        this.host = host;
        this.linker = linker;
        this.viewCtrl = viewCtrl;
    }
    updateHref() {
        if (this.host && this.viewCtrl) {
            const previousView = this.host._nav.getPrevious(this.viewCtrl);
            this._href = (previousView && this.linker.createUrl(this.host._nav, this.viewCtrl.component, this.viewCtrl.data)) || '#';
        }
        else {
            this._href = '#';
        }
    }
    ngAfterContentInit() {
        this.updateHref();
    }
}
NavPopAnchor.decorators = [
    { type: Directive, args: [{
                selector: 'a[navPop]',
                host: {
                    '[attr.href]': '_href'
                }
            },] },
];
NavPopAnchor.ctorParameters = [
    { type: NavPop, decorators: [{ type: Optional },] },
    { type: DeepLinker, },
    { type: ViewController, decorators: [{ type: Optional },] },
];
//# sourceMappingURL=nav-pop.js.map
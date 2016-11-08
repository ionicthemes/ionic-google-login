import { Directive, Host, HostListener, Input, Optional } from '@angular/core';
import { DeepLinker } from '../../navigation/deep-linker';
import { NavController } from '../../navigation/nav-controller';
export class NavPush {
    constructor(_nav) {
        this._nav = _nav;
        if (!_nav) {
            console.error('navPush must be within a NavController');
        }
    }
    onClick() {
        if (this._nav) {
            this._nav.push(this.navPush, this.navParams, null);
            return false;
        }
        return true;
    }
}
NavPush.decorators = [
    { type: Directive, args: [{
                selector: '[navPush]'
            },] },
];
NavPush.ctorParameters = [
    { type: NavController, decorators: [{ type: Optional },] },
];
NavPush.propDecorators = {
    'navPush': [{ type: Input },],
    'navParams': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ['click',] },],
};
export class NavPushAnchor {
    constructor(host, linker) {
        this.host = host;
        this.linker = linker;
    }
    updateHref() {
        if (this.host && this.linker) {
            this._href = this.linker.createUrl(this.host._nav, this.host.navPush, this.host.navParams) || '#';
        }
        else {
            this._href = '#';
        }
    }
    ngAfterContentInit() {
        this.updateHref();
    }
}
NavPushAnchor.decorators = [
    { type: Directive, args: [{
                selector: 'a[navPush]',
                host: {
                    '[attr.href]': '_href'
                }
            },] },
];
NavPushAnchor.ctorParameters = [
    { type: NavPush, decorators: [{ type: Host },] },
    { type: DeepLinker, decorators: [{ type: Optional },] },
];
//# sourceMappingURL=nav-push.js.map
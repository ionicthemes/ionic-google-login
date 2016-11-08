import { Directive, Host, HostListener, Input, Optional } from '@angular/core';
import { DeepLinker } from '../../navigation/deep-linker';
import { NavController } from '../../navigation/nav-controller';
export var NavPush = (function () {
    function NavPush(_nav) {
        this._nav = _nav;
        if (!_nav) {
            console.error('navPush must be within a NavController');
        }
    }
    NavPush.prototype.onClick = function () {
        if (this._nav) {
            this._nav.push(this.navPush, this.navParams, null);
            return false;
        }
        return true;
    };
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
    return NavPush;
}());
export var NavPushAnchor = (function () {
    function NavPushAnchor(host, linker) {
        this.host = host;
        this.linker = linker;
    }
    NavPushAnchor.prototype.updateHref = function () {
        if (this.host && this.linker) {
            this._href = this.linker.createUrl(this.host._nav, this.host.navPush, this.host.navParams) || '#';
        }
        else {
            this._href = '#';
        }
    };
    NavPushAnchor.prototype.ngAfterContentInit = function () {
        this.updateHref();
    };
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
    return NavPushAnchor;
}());
//# sourceMappingURL=nav-push.js.map
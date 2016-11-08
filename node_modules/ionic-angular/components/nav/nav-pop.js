import { Directive, HostListener, Optional } from '@angular/core';
import { DeepLinker } from '../../navigation/deep-linker';
import { NavController } from '../../navigation/nav-controller';
import { ViewController } from '../../navigation/view-controller';
export var NavPop = (function () {
    function NavPop(_nav) {
        this._nav = _nav;
        if (!_nav) {
            console.error('navPop must be within a NavController');
        }
    }
    NavPop.prototype.onClick = function () {
        if (this._nav) {
            this._nav.pop(null, null);
            return false;
        }
        return true;
    };
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
    return NavPop;
}());
export var NavPopAnchor = (function () {
    function NavPopAnchor(host, linker, viewCtrl) {
        this.host = host;
        this.linker = linker;
        this.viewCtrl = viewCtrl;
    }
    NavPopAnchor.prototype.updateHref = function () {
        if (this.host && this.viewCtrl) {
            var previousView = this.host._nav.getPrevious(this.viewCtrl);
            this._href = (previousView && this.linker.createUrl(this.host._nav, this.viewCtrl.component, this.viewCtrl.data)) || '#';
        }
        else {
            this._href = '#';
        }
    };
    NavPopAnchor.prototype.ngAfterContentInit = function () {
        this.updateHref();
    };
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
    return NavPopAnchor;
}());
//# sourceMappingURL=nav-pop.js.map
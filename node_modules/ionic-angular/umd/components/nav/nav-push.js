(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../navigation/deep-linker', '../../navigation/nav-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var deep_linker_1 = require('../../navigation/deep-linker');
    var nav_controller_1 = require('../../navigation/nav-controller');
    var NavPush = (function () {
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
            { type: core_1.Directive, args: [{
                        selector: '[navPush]'
                    },] },
        ];
        NavPush.ctorParameters = [
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
        ];
        NavPush.propDecorators = {
            'navPush': [{ type: core_1.Input },],
            'navParams': [{ type: core_1.Input },],
            'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        };
        return NavPush;
    }());
    exports.NavPush = NavPush;
    var NavPushAnchor = (function () {
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
            { type: core_1.Directive, args: [{
                        selector: 'a[navPush]',
                        host: {
                            '[attr.href]': '_href'
                        }
                    },] },
        ];
        NavPushAnchor.ctorParameters = [
            { type: NavPush, decorators: [{ type: core_1.Host },] },
            { type: deep_linker_1.DeepLinker, decorators: [{ type: core_1.Optional },] },
        ];
        return NavPushAnchor;
    }());
    exports.NavPushAnchor = NavPushAnchor;
});
//# sourceMappingURL=nav-push.js.map
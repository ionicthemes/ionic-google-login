(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../navigation/deep-linker', '../../navigation/nav-controller', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var deep_linker_1 = require('../../navigation/deep-linker');
    var nav_controller_1 = require('../../navigation/nav-controller');
    var view_controller_1 = require('../../navigation/view-controller');
    var NavPop = (function () {
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
            { type: core_1.Directive, args: [{
                        selector: '[navPop]'
                    },] },
        ];
        NavPop.ctorParameters = [
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
        ];
        NavPop.propDecorators = {
            'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        };
        return NavPop;
    }());
    exports.NavPop = NavPop;
    var NavPopAnchor = (function () {
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
            { type: core_1.Directive, args: [{
                        selector: 'a[navPop]',
                        host: {
                            '[attr.href]': '_href'
                        }
                    },] },
        ];
        NavPopAnchor.ctorParameters = [
            { type: NavPop, decorators: [{ type: core_1.Optional },] },
            { type: deep_linker_1.DeepLinker, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
        ];
        return NavPopAnchor;
    }());
    exports.NavPopAnchor = NavPopAnchor;
});
//# sourceMappingURL=nav-pop.js.map
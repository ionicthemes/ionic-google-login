var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../util/util', '../../config/config', '../ion'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var util_1 = require('../../util/util');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var Icon = (function (_super) {
        __extends(Icon, _super);
        function Icon(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this._isActive = true;
            this._name = '';
            this._ios = '';
            this._md = '';
            this._css = '';
            this._hidden = false;
            this.mode = config.get('mode');
            this._iconMode = config.get('iconMode');
        }
        Object.defineProperty(Icon.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._setColor('icon', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "mode", {
            set: function (val) {
                this._setMode('icon', val);
            },
            enumerable: true,
            configurable: true
        });
        Icon.prototype.ngOnDestroy = function () {
            if (this._css) {
                this.setElementClass(this._css, false);
            }
        };
        Object.defineProperty(Icon.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                if (!(/^md-|^ios-|^logo-/.test(val))) {
                    this._name = this._iconMode + '-' + val;
                }
                else {
                    this._name = val;
                }
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "ios", {
            get: function () {
                return this._ios;
            },
            set: function (val) {
                this._ios = val;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "md", {
            get: function () {
                return this._md;
            },
            set: function (val) {
                this._md = val;
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Icon.prototype, "isActive", {
            get: function () {
                return this._isActive;
            },
            set: function (val) {
                this._isActive = util_1.isTrueProperty(val);
                this.update();
            },
            enumerable: true,
            configurable: true
        });
        Icon.prototype.update = function () {
            var name;
            if (this._ios && this._iconMode === 'ios') {
                name = this._ios;
            }
            else if (this._md && this._iconMode === 'md') {
                name = this._md;
            }
            else {
                name = this._name;
            }
            var hidden = this._hidden = (name === null);
            if (hidden) {
                return;
            }
            var iconMode = name.split('-', 2)[0];
            if (iconMode === 'ios' &&
                !this._isActive &&
                name.indexOf('logo-') < 0 &&
                name.indexOf('-outline') < 0) {
                name += '-outline';
            }
            var css = 'ion-' + name;
            if (this._css === css) {
                return;
            }
            if (this._css) {
                this.setElementClass(this._css, false);
            }
            this._css = css;
            this.setElementClass(css, true);
            var label = name
                .replace('ios-', '')
                .replace('md-', '')
                .replace('-', ' ');
            this.setElementAttribute('aria-label', label);
        };
        Icon.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-icon',
                        host: {
                            'role': 'img'
                        }
                    },] },
        ];
        Icon.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Icon.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'name': [{ type: core_1.Input },],
            'ios': [{ type: core_1.Input },],
            'md': [{ type: core_1.Input },],
            'isActive': [{ type: core_1.Input },],
            '_hidden': [{ type: core_1.HostBinding, args: ['class.hide',] },],
        };
        return Icon;
    }(ion_1.Ion));
    exports.Icon = Icon;
});
//# sourceMappingURL=icon.js.map
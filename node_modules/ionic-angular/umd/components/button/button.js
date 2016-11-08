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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(menuToggle, ionButton, config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this._role = 'button';
            this._style = 'default';
            this._mode = config.get('mode');
            if (config.get('hoverCSS') === false) {
                this.setElementClass('disable-hover', true);
            }
            if (ionButton.trim().length > 0) {
                this.setRole(ionButton);
            }
            if (menuToggle !== null) {
                this._mt = true;
            }
        }
        Object.defineProperty(Button.prototype, "large", {
            set: function (val) {
                this._attr('_size', 'large', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "small", {
            set: function (val) {
                this._attr('_size', 'small', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "default", {
            set: function (val) {
                this._attr('_size', 'default', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "outline", {
            set: function (val) {
                this._attr('_style', 'outline', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "clear", {
            set: function (val) {
                this._attr('_style', 'clear', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "solid", {
            set: function (val) {
                this._attr('_style', 'solid', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "round", {
            set: function (val) {
                this._attr('_shape', 'round', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "block", {
            set: function (val) {
                this._attr('_display', 'block', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "full", {
            set: function (val) {
                this._attr('_display', 'full', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "mode", {
            set: function (val) {
                this._assignCss(false);
                this._mode = val;
                this._assignCss(true);
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype._attr = function (type, attrName, attrValue) {
            if (type === '_style') {
                this._updateColor(this._color, util_1.isTrueProperty(attrValue));
            }
            this._setClass(this[type], false);
            if (util_1.isTrueProperty(attrValue)) {
                this[type] = attrName;
                this._setClass(attrName, true);
            }
            else {
                this[type] = (type === '_style' ? 'default' : null);
                this._setClass(this[type], true);
            }
        };
        Object.defineProperty(Button.prototype, "color", {
            set: function (val) {
                this._updateColor(this._color, false);
                this._updateColor(val, true);
                this._color = val;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.ngAfterContentInit = function () {
            this._init = true;
            this._assignCss(true);
        };
        Button.prototype.setRole = function (val) {
            this._assignCss(false);
            this._role = val;
            this._assignCss(true);
        };
        Button.prototype._assignCss = function (assignCssClass) {
            var role = this._role;
            if (role) {
                this.setElementClass(role, assignCssClass);
                this.setElementClass(role + "-" + this._mode, assignCssClass);
                this._setClass('menutoggle', this._mt);
                this._setClass(this._style, assignCssClass);
                this._setClass(this._shape, assignCssClass);
                this._setClass(this._display, assignCssClass);
                this._setClass(this._size, assignCssClass);
                this._updateColor(this._color, assignCssClass);
            }
        };
        Button.prototype._setClass = function (type, assignCssClass) {
            if (type && this._init) {
                type = type.toLocaleLowerCase();
                this.setElementClass(this._role + "-" + type, assignCssClass);
                this.setElementClass(this._role + "-" + type + "-" + this._mode, assignCssClass);
            }
        };
        Button.prototype._updateColor = function (color, isAdd) {
            if (color && this._init) {
                var className = this._role;
                var style = this._style;
                style = (this._role !== 'bar-button' && style === 'solid' ? 'default' : style);
                className += (style !== null && style !== '' && style !== 'default' ? '-' + style.toLowerCase() : '');
                if (color !== null && color !== '') {
                    this.setElementClass(className + "-" + this._mode + "-" + color, isAdd);
                }
            }
        };
        Button.decorators = [
            { type: core_1.Component, args: [{
                        selector: '[ion-button]',
                        template: '<span class="button-inner">' +
                            '<ng-content></ng-content>' +
                            '</span>' +
                            '<div class="button-effect"></div>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Button.ctorParameters = [
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['menuToggle',] },] },
            { type: undefined, decorators: [{ type: core_1.Attribute, args: ['ion-button',] },] },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Button.propDecorators = {
            'large': [{ type: core_1.Input },],
            'small': [{ type: core_1.Input },],
            'default': [{ type: core_1.Input },],
            'outline': [{ type: core_1.Input },],
            'clear': [{ type: core_1.Input },],
            'solid': [{ type: core_1.Input },],
            'round': [{ type: core_1.Input },],
            'block': [{ type: core_1.Input },],
            'full': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'color': [{ type: core_1.Input },],
        };
        return Button;
    }(ion_1.Ion));
    exports.Button = Button;
});
//# sourceMappingURL=button.js.map
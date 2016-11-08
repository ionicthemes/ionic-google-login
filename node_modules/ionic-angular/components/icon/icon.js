var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, HostBinding, Input, Renderer } from '@angular/core';
import { isTrueProperty } from '../../util/util';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Icon = (function (_super) {
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
            this._isActive = isTrueProperty(val);
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
        { type: Directive, args: [{
                    selector: 'ion-icon',
                    host: {
                        'role': 'img'
                    }
                },] },
    ];
    Icon.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Icon.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
        'name': [{ type: Input },],
        'ios': [{ type: Input },],
        'md': [{ type: Input },],
        'isActive': [{ type: Input },],
        '_hidden': [{ type: HostBinding, args: ['class.hide',] },],
    };
    return Icon;
}(Ion));
//# sourceMappingURL=icon.js.map
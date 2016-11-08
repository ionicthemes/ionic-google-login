import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
export class Button extends Ion {
    constructor(menuToggle, ionButton, config, elementRef, renderer) {
        super(config, elementRef, renderer);
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
    set large(val) {
        this._attr('_size', 'large', val);
    }
    set small(val) {
        this._attr('_size', 'small', val);
    }
    set default(val) {
        this._attr('_size', 'default', val);
    }
    set outline(val) {
        this._attr('_style', 'outline', val);
    }
    set clear(val) {
        this._attr('_style', 'clear', val);
    }
    set solid(val) {
        this._attr('_style', 'solid', val);
    }
    set round(val) {
        this._attr('_shape', 'round', val);
    }
    set block(val) {
        this._attr('_display', 'block', val);
    }
    set full(val) {
        this._attr('_display', 'full', val);
    }
    set mode(val) {
        this._assignCss(false);
        this._mode = val;
        this._assignCss(true);
    }
    _attr(type, attrName, attrValue) {
        if (type === '_style') {
            this._updateColor(this._color, isTrueProperty(attrValue));
        }
        this._setClass(this[type], false);
        if (isTrueProperty(attrValue)) {
            this[type] = attrName;
            this._setClass(attrName, true);
        }
        else {
            this[type] = (type === '_style' ? 'default' : null);
            this._setClass(this[type], true);
        }
    }
    set color(val) {
        this._updateColor(this._color, false);
        this._updateColor(val, true);
        this._color = val;
    }
    ngAfterContentInit() {
        this._init = true;
        this._assignCss(true);
    }
    setRole(val) {
        this._assignCss(false);
        this._role = val;
        this._assignCss(true);
    }
    _assignCss(assignCssClass) {
        let role = this._role;
        if (role) {
            this.setElementClass(role, assignCssClass);
            this.setElementClass(`${role}-${this._mode}`, assignCssClass);
            this._setClass('menutoggle', this._mt);
            this._setClass(this._style, assignCssClass);
            this._setClass(this._shape, assignCssClass);
            this._setClass(this._display, assignCssClass);
            this._setClass(this._size, assignCssClass);
            this._updateColor(this._color, assignCssClass);
        }
    }
    _setClass(type, assignCssClass) {
        if (type && this._init) {
            type = type.toLocaleLowerCase();
            this.setElementClass(`${this._role}-${type}`, assignCssClass);
            this.setElementClass(`${this._role}-${type}-${this._mode}`, assignCssClass);
        }
    }
    _updateColor(color, isAdd) {
        if (color && this._init) {
            let className = this._role;
            let style = this._style;
            style = (this._role !== 'bar-button' && style === 'solid' ? 'default' : style);
            className += (style !== null && style !== '' && style !== 'default' ? '-' + style.toLowerCase() : '');
            if (color !== null && color !== '') {
                this.setElementClass(`${className}-${this._mode}-${color}`, isAdd);
            }
        }
    }
}
Button.decorators = [
    { type: Component, args: [{
                selector: '[ion-button]',
                template: '<span class="button-inner">' +
                    '<ng-content></ng-content>' +
                    '</span>' +
                    '<div class="button-effect"></div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
Button.ctorParameters = [
    { type: undefined, decorators: [{ type: Attribute, args: ['menuToggle',] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['ion-button',] },] },
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Button.propDecorators = {
    'large': [{ type: Input },],
    'small': [{ type: Input },],
    'default': [{ type: Input },],
    'outline': [{ type: Input },],
    'clear': [{ type: Input },],
    'solid': [{ type: Input },],
    'round': [{ type: Input },],
    'block': [{ type: Input },],
    'full': [{ type: Input },],
    'mode': [{ type: Input },],
    'color': [{ type: Input },],
};
//# sourceMappingURL=button.js.map
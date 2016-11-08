import { Directive, ElementRef, HostBinding, Input, Renderer } from '@angular/core';
import { isTrueProperty } from '../../util/util';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class Icon extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this._isActive = true;
        this._name = '';
        this._ios = '';
        this._md = '';
        this._css = '';
        this._hidden = false;
        this.mode = config.get('mode');
        this._iconMode = config.get('iconMode');
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._setColor('icon', value);
    }
    set mode(val) {
        this._setMode('icon', val);
    }
    ngOnDestroy() {
        if (this._css) {
            this.setElementClass(this._css, false);
        }
    }
    get name() {
        return this._name;
    }
    set name(val) {
        if (!(/^md-|^ios-|^logo-/.test(val))) {
            this._name = this._iconMode + '-' + val;
        }
        else {
            this._name = val;
        }
        this.update();
    }
    get ios() {
        return this._ios;
    }
    set ios(val) {
        this._ios = val;
        this.update();
    }
    get md() {
        return this._md;
    }
    set md(val) {
        this._md = val;
        this.update();
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(val) {
        this._isActive = isTrueProperty(val);
        this.update();
    }
    update() {
        let name;
        if (this._ios && this._iconMode === 'ios') {
            name = this._ios;
        }
        else if (this._md && this._iconMode === 'md') {
            name = this._md;
        }
        else {
            name = this._name;
        }
        let hidden = this._hidden = (name === null);
        if (hidden) {
            return;
        }
        let iconMode = name.split('-', 2)[0];
        if (iconMode === 'ios' &&
            !this._isActive &&
            name.indexOf('logo-') < 0 &&
            name.indexOf('-outline') < 0) {
            name += '-outline';
        }
        let css = 'ion-' + name;
        if (this._css === css) {
            return;
        }
        if (this._css) {
            this.setElementClass(this._css, false);
        }
        this._css = css;
        this.setElementClass(css, true);
        let label = name
            .replace('ios-', '')
            .replace('md-', '')
            .replace('-', ' ');
        this.setElementAttribute('aria-label', label);
    }
}
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
//# sourceMappingURL=icon.js.map
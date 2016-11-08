import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, Optional, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { ViewController } from '../../navigation/view-controller';
export class Header extends Ion {
    constructor(config, elementRef, renderer, viewCtrl) {
        super(config, elementRef, renderer);
        this._setMode('header', config.get('mode'));
        viewCtrl && viewCtrl._setHeader(this);
    }
}
Header.decorators = [
    { type: Directive, args: [{
                selector: 'ion-header'
            },] },
];
Header.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewController, decorators: [{ type: Optional },] },
];
export class Footer extends Ion {
    constructor(config, elementRef, renderer, viewCtrl) {
        super(config, elementRef, renderer);
        this._setMode('footer', config.get('mode'));
        viewCtrl && viewCtrl._setFooter(this);
    }
}
Footer.decorators = [
    { type: Directive, args: [{
                selector: 'ion-footer'
            },] },
];
Footer.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewController, decorators: [{ type: Optional },] },
];
export class ToolbarBase extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
    }
    _setTitle(titleCmp) {
        this._title = titleCmp;
    }
    getTitleText() {
        return (this._title && this._title.getTitleText()) || '';
    }
}
export class Toolbar extends ToolbarBase {
    constructor(viewCtrl, config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.mode = config.get('mode');
        this._sbPadding = config.getBoolean('statusbarPadding');
    }
    set color(val) {
        this._setColor('toolbar', val);
    }
    set mode(val) {
        this._setMode('toolbar', val);
    }
}
Toolbar.decorators = [
    { type: Component, args: [{
                selector: 'ion-toolbar',
                template: '<div class="toolbar-background" [ngClass]="\'toolbar-background-\' + _mode"></div>' +
                    '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
                    '<ng-content select="ion-buttons[start]"></ng-content>' +
                    '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
                    '<div class="toolbar-content" [ngClass]="\'toolbar-content-\' + _mode">' +
                    '<ng-content></ng-content>' +
                    '</div>',
                host: {
                    'class': 'toolbar',
                    '[class.statusbar-padding]': '_sbPadding'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
Toolbar.ctorParameters = [
    { type: ViewController, decorators: [{ type: Optional },] },
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Toolbar.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
};
//# sourceMappingURL=toolbar.js.map
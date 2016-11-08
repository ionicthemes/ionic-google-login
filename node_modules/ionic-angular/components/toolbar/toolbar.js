var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Input, Optional, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { ViewController } from '../../navigation/view-controller';
export var Header = (function (_super) {
    __extends(Header, _super);
    function Header(config, elementRef, renderer, viewCtrl) {
        _super.call(this, config, elementRef, renderer);
        this._setMode('header', config.get('mode'));
        viewCtrl && viewCtrl._setHeader(this);
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
    return Header;
}(Ion));
export var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer(config, elementRef, renderer, viewCtrl) {
        _super.call(this, config, elementRef, renderer);
        this._setMode('footer', config.get('mode'));
        viewCtrl && viewCtrl._setFooter(this);
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
    return Footer;
}(Ion));
export var ToolbarBase = (function (_super) {
    __extends(ToolbarBase, _super);
    function ToolbarBase(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer);
    }
    ToolbarBase.prototype._setTitle = function (titleCmp) {
        this._title = titleCmp;
    };
    ToolbarBase.prototype.getTitleText = function () {
        return (this._title && this._title.getTitleText()) || '';
    };
    return ToolbarBase;
}(Ion));
export var Toolbar = (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(viewCtrl, config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer);
        this.mode = config.get('mode');
        this._sbPadding = config.getBoolean('statusbarPadding');
    }
    Object.defineProperty(Toolbar.prototype, "color", {
        set: function (val) {
            this._setColor('toolbar', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toolbar.prototype, "mode", {
        set: function (val) {
            this._setMode('toolbar', val);
        },
        enumerable: true,
        configurable: true
    });
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
    return Toolbar;
}(ToolbarBase));
//# sourceMappingURL=toolbar.js.map
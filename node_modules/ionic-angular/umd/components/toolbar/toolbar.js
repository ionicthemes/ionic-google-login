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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var view_controller_1 = require('../../navigation/view-controller');
    var Header = (function (_super) {
        __extends(Header, _super);
        function Header(config, elementRef, renderer, viewCtrl) {
            _super.call(this, config, elementRef, renderer);
            this._setMode('header', config.get('mode'));
            viewCtrl && viewCtrl._setHeader(this);
        }
        Header.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-header'
                    },] },
        ];
        Header.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
        ];
        return Header;
    }(ion_1.Ion));
    exports.Header = Header;
    var Footer = (function (_super) {
        __extends(Footer, _super);
        function Footer(config, elementRef, renderer, viewCtrl) {
            _super.call(this, config, elementRef, renderer);
            this._setMode('footer', config.get('mode'));
            viewCtrl && viewCtrl._setFooter(this);
        }
        Footer.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-footer'
                    },] },
        ];
        Footer.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
        ];
        return Footer;
    }(ion_1.Ion));
    exports.Footer = Footer;
    var ToolbarBase = (function (_super) {
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
    }(ion_1.Ion));
    exports.ToolbarBase = ToolbarBase;
    var Toolbar = (function (_super) {
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
            { type: core_1.Component, args: [{
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
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    },] },
        ];
        Toolbar.ctorParameters = [
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Toolbar.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Toolbar;
    }(ToolbarBase));
    exports.Toolbar = Toolbar;
});
//# sourceMappingURL=toolbar.js.map
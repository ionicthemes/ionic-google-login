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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var TabButton = (function (_super) {
        __extends(TabButton, _super);
        function TabButton(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this.ionSelect = new core_1.EventEmitter();
            this.disHover = (config.get('hoverCSS') === false);
            this.layout = config.get('tabsLayout');
        }
        TabButton.prototype.ngOnInit = function () {
            this.tab.btn = this;
            this.layout = this.tab.parent.tabsLayout || this.layout;
            this.hasTitle = !!this.tab.tabTitle;
            this.hasIcon = !!this.tab.tabIcon && this.layout !== 'icon-hide';
            this.hasTitleOnly = (this.hasTitle && !this.hasIcon);
            this.hasIconOnly = (this.hasIcon && !this.hasTitle);
            this.hasBadge = !!this.tab.tabBadge;
        };
        TabButton.prototype.onClick = function () {
            this.ionSelect.emit(this.tab);
            return false;
        };
        TabButton.prototype.updateHref = function (href) {
            this.setElementAttribute('href', href);
        };
        TabButton.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '.tab-button',
                        host: {
                            '[attr.id]': 'tab._btnId',
                            '[attr.aria-controls]': 'tab._tabId',
                            '[attr.aria-selected]': 'tab.isSelected',
                            '[class.has-title]': 'hasTitle',
                            '[class.has-icon]': 'hasIcon',
                            '[class.has-title-only]': 'hasTitleOnly',
                            '[class.icon-only]': 'hasIconOnly',
                            '[class.has-badge]': 'hasBadge',
                            '[class.disable-hover]': 'disHover'
                        }
                    },] },
        ];
        TabButton.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        TabButton.propDecorators = {
            'tab': [{ type: core_1.Input },],
            'ionSelect': [{ type: core_1.Output },],
            'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        };
        return TabButton;
    }(ion_1.Ion));
    exports.TabButton = TabButton;
});
//# sourceMappingURL=tab-button.js.map
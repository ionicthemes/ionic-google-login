import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export class TabButton extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.ionSelect = new EventEmitter();
        this.disHover = (config.get('hoverCSS') === false);
        this.layout = config.get('tabsLayout');
    }
    ngOnInit() {
        this.tab.btn = this;
        this.layout = this.tab.parent.tabsLayout || this.layout;
        this.hasTitle = !!this.tab.tabTitle;
        this.hasIcon = !!this.tab.tabIcon && this.layout !== 'icon-hide';
        this.hasTitleOnly = (this.hasTitle && !this.hasIcon);
        this.hasIconOnly = (this.hasIcon && !this.hasTitle);
        this.hasBadge = !!this.tab.tabBadge;
    }
    onClick() {
        this.ionSelect.emit(this.tab);
        return false;
    }
    updateHref(href) {
        this.setElementAttribute('href', href);
    }
}
TabButton.decorators = [
    { type: Directive, args: [{
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
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
TabButton.propDecorators = {
    'tab': [{ type: Input },],
    'ionSelect': [{ type: Output },],
    'onClick': [{ type: HostListener, args: ['click',] },],
};
//# sourceMappingURL=tab-button.js.map
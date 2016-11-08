import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Optional, Inject, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Navbar } from '../navbar/navbar';
import { Toolbar } from './toolbar';
export class ToolbarTitle extends Ion {
    constructor(config, elementRef, renderer, toolbar, navbar) {
        super(config, elementRef, renderer);
        this._setMode('title', this._mode = config.get('mode'));
        toolbar && toolbar._setTitle(this);
        navbar && navbar._setTitle(this);
    }
    getTitleText() {
        return this._elementRef.nativeElement.textContent;
    }
}
ToolbarTitle.decorators = [
    { type: Component, args: [{
                selector: 'ion-title',
                template: '<div class="toolbar-title" [ngClass]="\'toolbar-title-\' + _mode">' +
                    '<ng-content></ng-content>' +
                    '</div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
ToolbarTitle.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: Toolbar, decorators: [{ type: Optional },] },
    { type: Navbar, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(() => Navbar),] },] },
];
//# sourceMappingURL=toolbar-title.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Optional, Inject, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Navbar } from '../navbar/navbar';
import { Toolbar } from './toolbar';
export var ToolbarTitle = (function (_super) {
    __extends(ToolbarTitle, _super);
    function ToolbarTitle(config, elementRef, renderer, toolbar, navbar) {
        _super.call(this, config, elementRef, renderer);
        this._setMode('title', this._mode = config.get('mode'));
        toolbar && toolbar._setTitle(this);
        navbar && navbar._setTitle(this);
    }
    ToolbarTitle.prototype.getTitleText = function () {
        return this._elementRef.nativeElement.textContent;
    };
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
        { type: Navbar, decorators: [{ type: Optional }, { type: Inject, args: [forwardRef(function () { return Navbar; }),] },] },
    ];
    return ToolbarTitle;
}(Ion));
//# sourceMappingURL=toolbar-title.js.map
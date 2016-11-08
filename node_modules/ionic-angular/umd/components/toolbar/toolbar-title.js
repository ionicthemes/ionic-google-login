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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../navbar/navbar', './toolbar'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var navbar_1 = require('../navbar/navbar');
    var toolbar_1 = require('./toolbar');
    var ToolbarTitle = (function (_super) {
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
            { type: core_1.Component, args: [{
                        selector: 'ion-title',
                        template: '<div class="toolbar-title" [ngClass]="\'toolbar-title-\' + _mode">' +
                            '<ng-content></ng-content>' +
                            '</div>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        ToolbarTitle.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: toolbar_1.Toolbar, decorators: [{ type: core_1.Optional },] },
            { type: navbar_1.Navbar, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_1.forwardRef(function () { return navbar_1.Navbar; }),] },] },
        ];
        return ToolbarTitle;
    }(ion_1.Ion));
    exports.ToolbarTitle = ToolbarTitle;
});
//# sourceMappingURL=toolbar-title.js.map
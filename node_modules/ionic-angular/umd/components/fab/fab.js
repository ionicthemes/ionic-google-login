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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../../util/ui-event-manager', '../../util/util', '../../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    var util_1 = require('../../util/util');
    var dom_1 = require('../../util/dom');
    var FabButton = (function (_super) {
        __extends(FabButton, _super);
        function FabButton(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this.setElementClass('fab', true);
            this.mode = config.get('mode');
        }
        Object.defineProperty(FabButton.prototype, "color", {
            set: function (val) {
                this._setColor('fab', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FabButton.prototype, "mode", {
            set: function (val) {
                this._setMode('fab', val);
            },
            enumerable: true,
            configurable: true
        });
        FabButton.prototype.setActiveClose = function (closeVisible) {
            this.setElementClass('fab-close-active', closeVisible);
        };
        FabButton.decorators = [
            { type: core_1.Component, args: [{
                        selector: '[ion-fab]',
                        template: '<ion-icon name="close" class="fab-close-icon"></ion-icon>' +
                            '<span class="button-inner">' +
                            '<ng-content></ng-content>' +
                            '</span>' +
                            '<div class="button-effect"></div>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        FabButton.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        FabButton.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return FabButton;
    }(ion_1.Ion));
    exports.FabButton = FabButton;
    var FabList = (function () {
        function FabList(_elementRef, _renderer) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._visible = false;
            this._fabs = [];
        }
        Object.defineProperty(FabList.prototype, "_setbuttons", {
            set: function (query) {
                var fabs = this._fabs = query.toArray();
                for (var _i = 0, fabs_1 = fabs; _i < fabs_1.length; _i++) {
                    var fab = fabs_1[_i];
                    fab.setElementClass('fab-in-list', true);
                }
            },
            enumerable: true,
            configurable: true
        });
        FabList.prototype.setVisible = function (val) {
            var visible = util_1.isTrueProperty(val);
            if (visible === this._visible) {
                return;
            }
            this._visible = visible;
            var fabs = this._fabs;
            var i = 1;
            if (visible) {
                fabs.forEach(function (fab) {
                    dom_1.nativeTimeout(function () { return fab.setElementClass('show', true); }, i * 30);
                    i++;
                });
            }
            else {
                fabs.forEach(function (fab) { return fab.setElementClass('show', false); });
            }
            this.setElementClass('fab-list-active', visible);
        };
        FabList.prototype.setElementClass = function (className, add) {
            this._renderer.setElementClass(this._elementRef.nativeElement, className, add);
        };
        FabList.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-fab-list',
                    },] },
        ];
        FabList.ctorParameters = [
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        FabList.propDecorators = {
            '_setbuttons': [{ type: core_1.ContentChildren, args: [FabButton,] },],
        };
        return FabList;
    }());
    exports.FabList = FabList;
    var FabContainer = (function () {
        function FabContainer(_elementRef) {
            this._elementRef = _elementRef;
            this._events = new ui_event_manager_1.UIEventManager();
            this._listsActive = false;
        }
        FabContainer.prototype.ngAfterContentInit = function () {
            this._events.listen(this._mainButton.getNativeElement(), 'click', this.pointerUp.bind(this));
        };
        FabContainer.prototype.pointerUp = function (ev) {
            if (this.canActivateList(ev)) {
                this.toggleList();
            }
        };
        FabContainer.prototype.canActivateList = function (ev) {
            if (this._fabLists.length > 0 && this._mainButton && ev.target) {
                var ele = ev.target.closest('ion-fab>button');
                return (ele && ele === this._mainButton.getNativeElement());
            }
            return false;
        };
        FabContainer.prototype.toggleList = function () {
            this.setActiveLists(!this._listsActive);
        };
        FabContainer.prototype.setActiveLists = function (isActive) {
            if (isActive === this._listsActive) {
                return;
            }
            var lists = this._fabLists.toArray();
            for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
                var list = lists_1[_i];
                list.setVisible(isActive);
            }
            this._mainButton.setActiveClose(isActive);
            this._listsActive = isActive;
        };
        FabContainer.prototype.close = function () {
            this.setActiveLists(false);
        };
        FabContainer.prototype.ngOnDestroy = function () {
            this._events.unlistenAll();
        };
        FabContainer.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-fab',
                        template: '<ng-content></ng-content>'
                    },] },
        ];
        FabContainer.ctorParameters = [
            { type: core_1.ElementRef, },
        ];
        FabContainer.propDecorators = {
            '_mainButton': [{ type: core_1.ContentChild, args: [FabButton,] },],
            '_fabLists': [{ type: core_1.ContentChildren, args: [FabList,] },],
        };
        return FabContainer;
    }());
    exports.FabContainer = FabContainer;
});
//# sourceMappingURL=fab.js.map
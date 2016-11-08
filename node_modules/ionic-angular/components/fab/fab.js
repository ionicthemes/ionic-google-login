var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ContentChild, Input, ContentChildren, ChangeDetectionStrategy, Directive, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { UIEventManager } from '../../util/ui-event-manager';
import { isTrueProperty } from '../../util/util';
import { nativeTimeout } from '../../util/dom';
export var FabButton = (function (_super) {
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
        { type: Component, args: [{
                    selector: '[ion-fab]',
                    template: '<ion-icon name="close" class="fab-close-icon"></ion-icon>' +
                        '<span class="button-inner">' +
                        '<ng-content></ng-content>' +
                        '</span>' +
                        '<div class="button-effect"></div>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    FabButton.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    FabButton.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return FabButton;
}(Ion));
export var FabList = (function () {
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
        var visible = isTrueProperty(val);
        if (visible === this._visible) {
            return;
        }
        this._visible = visible;
        var fabs = this._fabs;
        var i = 1;
        if (visible) {
            fabs.forEach(function (fab) {
                nativeTimeout(function () { return fab.setElementClass('show', true); }, i * 30);
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
        { type: Directive, args: [{
                    selector: 'ion-fab-list',
                },] },
    ];
    FabList.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    FabList.propDecorators = {
        '_setbuttons': [{ type: ContentChildren, args: [FabButton,] },],
    };
    return FabList;
}());
export var FabContainer = (function () {
    function FabContainer(_elementRef) {
        this._elementRef = _elementRef;
        this._events = new UIEventManager();
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
        { type: Component, args: [{
                    selector: 'ion-fab',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    FabContainer.ctorParameters = [
        { type: ElementRef, },
    ];
    FabContainer.propDecorators = {
        '_mainButton': [{ type: ContentChild, args: [FabButton,] },],
        '_fabLists': [{ type: ContentChildren, args: [FabList,] },],
    };
    return FabContainer;
}());
//# sourceMappingURL=fab.js.map
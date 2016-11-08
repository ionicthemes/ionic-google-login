import { Component, ContentChild, Input, ContentChildren, ChangeDetectionStrategy, Directive, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { UIEventManager } from '../../util/ui-event-manager';
import { isTrueProperty } from '../../util/util';
import { nativeTimeout } from '../../util/dom';
export class FabButton extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.setElementClass('fab', true);
        this.mode = config.get('mode');
    }
    set color(val) {
        this._setColor('fab', val);
    }
    set mode(val) {
        this._setMode('fab', val);
    }
    setActiveClose(closeVisible) {
        this.setElementClass('fab-close-active', closeVisible);
    }
}
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
export class FabList {
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._visible = false;
        this._fabs = [];
    }
    set _setbuttons(query) {
        let fabs = this._fabs = query.toArray();
        for (var fab of fabs) {
            fab.setElementClass('fab-in-list', true);
        }
    }
    setVisible(val) {
        let visible = isTrueProperty(val);
        if (visible === this._visible) {
            return;
        }
        this._visible = visible;
        let fabs = this._fabs;
        let i = 1;
        if (visible) {
            fabs.forEach(fab => {
                nativeTimeout(() => fab.setElementClass('show', true), i * 30);
                i++;
            });
        }
        else {
            fabs.forEach(fab => fab.setElementClass('show', false));
        }
        this.setElementClass('fab-list-active', visible);
    }
    setElementClass(className, add) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, add);
    }
}
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
export class FabContainer {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._events = new UIEventManager();
        this._listsActive = false;
    }
    ngAfterContentInit() {
        this._events.listen(this._mainButton.getNativeElement(), 'click', this.pointerUp.bind(this));
    }
    pointerUp(ev) {
        if (this.canActivateList(ev)) {
            this.toggleList();
        }
    }
    canActivateList(ev) {
        if (this._fabLists.length > 0 && this._mainButton && ev.target) {
            let ele = ev.target.closest('ion-fab>button');
            return (ele && ele === this._mainButton.getNativeElement());
        }
        return false;
    }
    toggleList() {
        this.setActiveLists(!this._listsActive);
    }
    setActiveLists(isActive) {
        if (isActive === this._listsActive) {
            return;
        }
        let lists = this._fabLists.toArray();
        for (let list of lists) {
            list.setVisible(isActive);
        }
        this._mainButton.setActiveClose(isActive);
        this._listsActive = isActive;
    }
    close() {
        this.setActiveLists(false);
    }
    ngOnDestroy() {
        this._events.unlistenAll();
    }
}
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
//# sourceMappingURL=fab.js.map
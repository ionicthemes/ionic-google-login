import { Component, Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, NgZone, Renderer, Inject, Optional, Output } from '@angular/core';
import { Content } from '../content/content';
import { CSS, zoneRafFrames } from '../../util/dom';
import { Item } from './item';
import { ItemReorderGesture } from '../item/item-reorder-gesture';
import { isTrueProperty } from '../../util/util';
export class ItemReorder {
    constructor(elementRef, _rendered, _zone, _content) {
        this._rendered = _rendered;
        this._zone = _zone;
        this._content = _content;
        this._enableReorder = false;
        this._visibleReorder = false;
        this._lastToIndex = -1;
        this.ionItemReorder = new EventEmitter();
        this._element = elementRef.nativeElement;
    }
    ngOnDestroy() {
        this._element = null;
        this._reorderGesture && this._reorderGesture.destroy();
    }
    get reorder() {
        return this._enableReorder;
    }
    set reorder(val) {
        let enabled = isTrueProperty(val);
        if (!enabled && this._reorderGesture) {
            this._reorderGesture.destroy();
            this._reorderGesture = null;
            this._visibleReorder = false;
            setTimeout(() => this._enableReorder = false, 400);
        }
        else if (enabled && !this._reorderGesture) {
            (void 0);
            this._reorderGesture = new ItemReorderGesture(this);
            this._enableReorder = true;
            zoneRafFrames(2, () => this._visibleReorder = true);
        }
    }
    reorderPrepare() {
        let ele = this._element;
        let children = ele.children;
        for (let i = 0, ilen = children.length; i < ilen; i++) {
            var child = children[i];
            child.$ionIndex = i;
            child.$ionReorderList = ele;
        }
    }
    reorderStart() {
        this.setElementClass('reorder-list-active', true);
    }
    reorderEmit(fromIndex, toIndex) {
        this.reorderReset();
        if (fromIndex !== toIndex) {
            this._zone.run(() => {
                this.ionItemReorder.emit({
                    from: fromIndex,
                    to: toIndex,
                });
            });
        }
    }
    scrollContent(scroll) {
        let scrollTop = this._content.getScrollTop() + scroll;
        if (scroll !== 0) {
            this._content.scrollTo(0, scrollTop, 0);
        }
        return scrollTop;
    }
    reorderReset() {
        let children = this._element.children;
        let len = children.length;
        this.setElementClass('reorder-list-active', false);
        let transform = CSS.transform;
        for (let i = 0; i < len; i++) {
            children[i].style[transform] = '';
        }
        this._lastToIndex = -1;
    }
    reorderMove(fromIndex, toIndex, itemHeight) {
        if (this._lastToIndex === -1) {
            this._lastToIndex = fromIndex;
        }
        let lastToIndex = this._lastToIndex;
        this._lastToIndex = toIndex;
        let children = this._element.children;
        let transform = CSS.transform;
        if (toIndex >= lastToIndex) {
            for (var i = lastToIndex; i <= toIndex; i++) {
                if (i !== fromIndex) {
                    children[i].style[transform] = (i > fromIndex)
                        ? `translateY(${-itemHeight}px)` : '';
                }
            }
        }
        if (toIndex <= lastToIndex) {
            for (var i = toIndex; i <= lastToIndex; i++) {
                if (i !== fromIndex) {
                    children[i].style[transform] = (i < fromIndex)
                        ? `translateY(${itemHeight}px)` : '';
                }
            }
        }
    }
    setElementClass(classname, add) {
        this._rendered.setElementClass(this._element, classname, add);
    }
    getNativeElement() {
        return this._element;
    }
}
ItemReorder.decorators = [
    { type: Directive, args: [{
                selector: 'ion-list[reorder],ion-item-group[reorder]',
                host: {
                    '[class.reorder-enabled]': '_enableReorder',
                    '[class.reorder-visible]': '_visibleReorder',
                }
            },] },
];
ItemReorder.ctorParameters = [
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgZone, },
    { type: Content, decorators: [{ type: Optional },] },
];
ItemReorder.propDecorators = {
    'ionItemReorder': [{ type: Output },],
    'reorder': [{ type: Input },],
};
export class Reorder {
    constructor(item, elementRef) {
        this.item = item;
        this.elementRef = elementRef;
        elementRef.nativeElement['$ionComponent'] = this;
    }
    getReorderNode() {
        let node = this.item.getNativeElement();
        return findReorderItem(node, null);
    }
    onClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();
    }
}
Reorder.decorators = [
    { type: Component, args: [{
                selector: 'ion-reorder',
                template: `<ion-icon name="reorder"></ion-icon>`
            },] },
];
Reorder.ctorParameters = [
    { type: ItemReorder, decorators: [{ type: Inject, args: [forwardRef(() => Item),] },] },
    { type: ElementRef, },
];
Reorder.propDecorators = {
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};
export function findReorderItem(node, listNode) {
    let nested = 0;
    while (node && nested < 4) {
        if (indexForItem(node) !== undefined) {
            if (listNode && node.parentNode !== listNode) {
                return null;
            }
            return node;
        }
        node = node.parentNode;
        nested++;
    }
    return null;
}
export function indexForItem(element) {
    return element['$ionIndex'];
}
export function reorderListForItem(element) {
    return element['$ionReorderList'];
}
//# sourceMappingURL=item-reorder.js.map
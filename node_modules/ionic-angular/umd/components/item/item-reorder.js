(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../content/content', '../../util/dom', './item', '../item/item-reorder-gesture', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var content_1 = require('../content/content');
    var dom_1 = require('../../util/dom');
    var item_1 = require('./item');
    var item_reorder_gesture_1 = require('../item/item-reorder-gesture');
    var util_1 = require('../../util/util');
    var ItemReorder = (function () {
        function ItemReorder(elementRef, _rendered, _zone, _content) {
            this._rendered = _rendered;
            this._zone = _zone;
            this._content = _content;
            this._enableReorder = false;
            this._visibleReorder = false;
            this._lastToIndex = -1;
            this.ionItemReorder = new core_1.EventEmitter();
            this._element = elementRef.nativeElement;
        }
        ItemReorder.prototype.ngOnDestroy = function () {
            this._element = null;
            this._reorderGesture && this._reorderGesture.destroy();
        };
        Object.defineProperty(ItemReorder.prototype, "reorder", {
            get: function () {
                return this._enableReorder;
            },
            set: function (val) {
                var _this = this;
                var enabled = util_1.isTrueProperty(val);
                if (!enabled && this._reorderGesture) {
                    this._reorderGesture.destroy();
                    this._reorderGesture = null;
                    this._visibleReorder = false;
                    setTimeout(function () { return _this._enableReorder = false; }, 400);
                }
                else if (enabled && !this._reorderGesture) {
                    (void 0);
                    this._reorderGesture = new item_reorder_gesture_1.ItemReorderGesture(this);
                    this._enableReorder = true;
                    dom_1.zoneRafFrames(2, function () { return _this._visibleReorder = true; });
                }
            },
            enumerable: true,
            configurable: true
        });
        ItemReorder.prototype.reorderPrepare = function () {
            var ele = this._element;
            var children = ele.children;
            for (var i = 0, ilen = children.length; i < ilen; i++) {
                var child = children[i];
                child.$ionIndex = i;
                child.$ionReorderList = ele;
            }
        };
        ItemReorder.prototype.reorderStart = function () {
            this.setElementClass('reorder-list-active', true);
        };
        ItemReorder.prototype.reorderEmit = function (fromIndex, toIndex) {
            var _this = this;
            this.reorderReset();
            if (fromIndex !== toIndex) {
                this._zone.run(function () {
                    _this.ionItemReorder.emit({
                        from: fromIndex,
                        to: toIndex,
                    });
                });
            }
        };
        ItemReorder.prototype.scrollContent = function (scroll) {
            var scrollTop = this._content.getScrollTop() + scroll;
            if (scroll !== 0) {
                this._content.scrollTo(0, scrollTop, 0);
            }
            return scrollTop;
        };
        ItemReorder.prototype.reorderReset = function () {
            var children = this._element.children;
            var len = children.length;
            this.setElementClass('reorder-list-active', false);
            var transform = dom_1.CSS.transform;
            for (var i = 0; i < len; i++) {
                children[i].style[transform] = '';
            }
            this._lastToIndex = -1;
        };
        ItemReorder.prototype.reorderMove = function (fromIndex, toIndex, itemHeight) {
            if (this._lastToIndex === -1) {
                this._lastToIndex = fromIndex;
            }
            var lastToIndex = this._lastToIndex;
            this._lastToIndex = toIndex;
            var children = this._element.children;
            var transform = dom_1.CSS.transform;
            if (toIndex >= lastToIndex) {
                for (var i = lastToIndex; i <= toIndex; i++) {
                    if (i !== fromIndex) {
                        children[i].style[transform] = (i > fromIndex)
                            ? "translateY(" + -itemHeight + "px)" : '';
                    }
                }
            }
            if (toIndex <= lastToIndex) {
                for (var i = toIndex; i <= lastToIndex; i++) {
                    if (i !== fromIndex) {
                        children[i].style[transform] = (i < fromIndex)
                            ? "translateY(" + itemHeight + "px)" : '';
                    }
                }
            }
        };
        ItemReorder.prototype.setElementClass = function (classname, add) {
            this._rendered.setElementClass(this._element, classname, add);
        };
        ItemReorder.prototype.getNativeElement = function () {
            return this._element;
        };
        ItemReorder.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-list[reorder],ion-item-group[reorder]',
                        host: {
                            '[class.reorder-enabled]': '_enableReorder',
                            '[class.reorder-visible]': '_visibleReorder',
                        }
                    },] },
        ];
        ItemReorder.ctorParameters = [
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: core_1.NgZone, },
            { type: content_1.Content, decorators: [{ type: core_1.Optional },] },
        ];
        ItemReorder.propDecorators = {
            'ionItemReorder': [{ type: core_1.Output },],
            'reorder': [{ type: core_1.Input },],
        };
        return ItemReorder;
    }());
    exports.ItemReorder = ItemReorder;
    var Reorder = (function () {
        function Reorder(item, elementRef) {
            this.item = item;
            this.elementRef = elementRef;
            elementRef.nativeElement['$ionComponent'] = this;
        }
        Reorder.prototype.getReorderNode = function () {
            var node = this.item.getNativeElement();
            return findReorderItem(node, null);
        };
        Reorder.prototype.onClick = function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        };
        Reorder.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-reorder',
                        template: "<ion-icon name=\"reorder\"></ion-icon>"
                    },] },
        ];
        Reorder.ctorParameters = [
            { type: ItemReorder, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return item_1.Item; }),] },] },
            { type: core_1.ElementRef, },
        ];
        Reorder.propDecorators = {
            'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
        };
        return Reorder;
    }());
    exports.Reorder = Reorder;
    function findReorderItem(node, listNode) {
        var nested = 0;
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
    exports.findReorderItem = findReorderItem;
    function indexForItem(element) {
        return element['$ionIndex'];
    }
    exports.indexForItem = indexForItem;
    function reorderListForItem(element) {
        return element['$ionReorderList'];
    }
    exports.reorderListForItem = reorderListForItem;
});
//# sourceMappingURL=item-reorder.js.map
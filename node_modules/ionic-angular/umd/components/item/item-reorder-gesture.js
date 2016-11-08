(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../util/dom', '../item/item-reorder', '../../util/ui-event-manager'], factory);
    }
})(function (require, exports) {
    "use strict";
    var dom_1 = require('../../util/dom');
    var item_reorder_1 = require('../item/item-reorder');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    var AUTO_SCROLL_MARGIN = 60;
    var SCROLL_JUMP = 10;
    var ITEM_REORDER_ACTIVE = 'reorder-active';
    var ItemReorderGesture = (function () {
        function ItemReorderGesture(reorderList) {
            this.reorderList = reorderList;
            this.selectedItemEle = null;
            this.events = new ui_event_manager_1.UIEventManager(false);
            this.events.pointerEvents({
                element: this.reorderList.getNativeElement(),
                pointerDown: this.onDragStart.bind(this),
                pointerMove: this.onDragMove.bind(this),
                pointerUp: this.onDragEnd.bind(this)
            });
        }
        ItemReorderGesture.prototype.onDragStart = function (ev) {
            if (this.selectedItemEle) {
                return false;
            }
            var reorderElement = ev.target;
            if (reorderElement.nodeName !== 'ION-REORDER') {
                return false;
            }
            var reorderMark = reorderElement['$ionComponent'];
            if (!reorderMark) {
                console.error('ion-reorder does not contain $ionComponent');
                return false;
            }
            this.reorderList.reorderPrepare();
            var item = reorderMark.getReorderNode();
            if (!item) {
                console.error('reorder node not found');
                return false;
            }
            ev.preventDefault();
            this.selectedItemEle = item;
            this.selectedItemHeight = item.offsetHeight;
            this.lastYcoord = -100;
            this.lastToIndex = item_reorder_1.indexForItem(item);
            this.windowHeight = window.innerHeight - AUTO_SCROLL_MARGIN;
            this.lastScrollPosition = this.reorderList.scrollContent(0);
            this.offset = dom_1.pointerCoord(ev);
            this.offset.y += this.lastScrollPosition;
            item.classList.add(ITEM_REORDER_ACTIVE);
            this.reorderList.reorderStart();
            return true;
        };
        ItemReorderGesture.prototype.onDragMove = function (ev) {
            var selectedItem = this.selectedItemEle;
            if (!selectedItem) {
                return;
            }
            ev.preventDefault();
            var coord = dom_1.pointerCoord(ev);
            var posY = coord.y;
            var scrollPosition = this.scroll(posY);
            if (Math.abs(posY - this.lastYcoord) > 30) {
                var overItem = this.itemForCoord(coord);
                if (overItem) {
                    var toIndex = item_reorder_1.indexForItem(overItem);
                    if (toIndex !== undefined && (toIndex !== this.lastToIndex || this.emptyZone)) {
                        var fromIndex = item_reorder_1.indexForItem(selectedItem);
                        this.lastToIndex = toIndex;
                        this.lastYcoord = posY;
                        this.emptyZone = false;
                        this.reorderList.reorderMove(fromIndex, toIndex, this.selectedItemHeight);
                    }
                }
                else {
                    this.emptyZone = true;
                }
            }
            var ydiff = Math.round(posY - this.offset.y + scrollPosition);
            selectedItem.style[dom_1.CSS.transform] = "translateY(" + ydiff + "px)";
        };
        ItemReorderGesture.prototype.onDragEnd = function (ev) {
            var _this = this;
            var selectedItem = this.selectedItemEle;
            if (!selectedItem) {
                return;
            }
            if (ev) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            var toIndex = this.lastToIndex;
            var fromIndex = item_reorder_1.indexForItem(selectedItem);
            var reorderInactive = function () {
                _this.selectedItemEle.style.transition = '';
                _this.selectedItemEle.classList.remove(ITEM_REORDER_ACTIVE);
                _this.selectedItemEle = null;
            };
            if (toIndex === fromIndex) {
                selectedItem.style.transition = 'transform 200ms ease-in-out';
                setTimeout(reorderInactive, 200);
            }
            else {
                reorderInactive();
            }
            this.reorderList.reorderEmit(fromIndex, toIndex);
        };
        ItemReorderGesture.prototype.itemForCoord = function (coord) {
            return itemForPosition(this.offset.x - 100, coord.y, this.reorderList.getNativeElement());
        };
        ItemReorderGesture.prototype.scroll = function (posY) {
            if (posY < AUTO_SCROLL_MARGIN) {
                this.lastScrollPosition = this.reorderList.scrollContent(-SCROLL_JUMP);
            }
            else if (posY > this.windowHeight) {
                this.lastScrollPosition = this.reorderList.scrollContent(SCROLL_JUMP);
            }
            return this.lastScrollPosition;
        };
        ItemReorderGesture.prototype.destroy = function () {
            this.onDragEnd(null);
            this.events.unlistenAll();
            this.events = null;
            this.reorderList = null;
        };
        return ItemReorderGesture;
    }());
    exports.ItemReorderGesture = ItemReorderGesture;
    function itemForPosition(x, y, list) {
        var element = document.elementFromPoint(x, y);
        return item_reorder_1.findReorderItem(element, list);
    }
});
//# sourceMappingURL=item-reorder-gesture.js.map
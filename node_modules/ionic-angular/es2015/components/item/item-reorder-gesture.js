import { CSS, pointerCoord } from '../../util/dom';
import { indexForItem, findReorderItem } from '../item/item-reorder';
import { UIEventManager } from '../../util/ui-event-manager';
const AUTO_SCROLL_MARGIN = 60;
const SCROLL_JUMP = 10;
const ITEM_REORDER_ACTIVE = 'reorder-active';
export class ItemReorderGesture {
    constructor(reorderList) {
        this.reorderList = reorderList;
        this.selectedItemEle = null;
        this.events = new UIEventManager(false);
        this.events.pointerEvents({
            element: this.reorderList.getNativeElement(),
            pointerDown: this.onDragStart.bind(this),
            pointerMove: this.onDragMove.bind(this),
            pointerUp: this.onDragEnd.bind(this)
        });
    }
    onDragStart(ev) {
        if (this.selectedItemEle) {
            return false;
        }
        let reorderElement = ev.target;
        if (reorderElement.nodeName !== 'ION-REORDER') {
            return false;
        }
        let reorderMark = reorderElement['$ionComponent'];
        if (!reorderMark) {
            console.error('ion-reorder does not contain $ionComponent');
            return false;
        }
        this.reorderList.reorderPrepare();
        let item = reorderMark.getReorderNode();
        if (!item) {
            console.error('reorder node not found');
            return false;
        }
        ev.preventDefault();
        this.selectedItemEle = item;
        this.selectedItemHeight = item.offsetHeight;
        this.lastYcoord = -100;
        this.lastToIndex = indexForItem(item);
        this.windowHeight = window.innerHeight - AUTO_SCROLL_MARGIN;
        this.lastScrollPosition = this.reorderList.scrollContent(0);
        this.offset = pointerCoord(ev);
        this.offset.y += this.lastScrollPosition;
        item.classList.add(ITEM_REORDER_ACTIVE);
        this.reorderList.reorderStart();
        return true;
    }
    onDragMove(ev) {
        let selectedItem = this.selectedItemEle;
        if (!selectedItem) {
            return;
        }
        ev.preventDefault();
        let coord = pointerCoord(ev);
        let posY = coord.y;
        let scrollPosition = this.scroll(posY);
        if (Math.abs(posY - this.lastYcoord) > 30) {
            let overItem = this.itemForCoord(coord);
            if (overItem) {
                let toIndex = indexForItem(overItem);
                if (toIndex !== undefined && (toIndex !== this.lastToIndex || this.emptyZone)) {
                    let fromIndex = indexForItem(selectedItem);
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
        let ydiff = Math.round(posY - this.offset.y + scrollPosition);
        selectedItem.style[CSS.transform] = `translateY(${ydiff}px)`;
    }
    onDragEnd(ev) {
        let selectedItem = this.selectedItemEle;
        if (!selectedItem) {
            return;
        }
        if (ev) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        let toIndex = this.lastToIndex;
        let fromIndex = indexForItem(selectedItem);
        let reorderInactive = () => {
            this.selectedItemEle.style.transition = '';
            this.selectedItemEle.classList.remove(ITEM_REORDER_ACTIVE);
            this.selectedItemEle = null;
        };
        if (toIndex === fromIndex) {
            selectedItem.style.transition = 'transform 200ms ease-in-out';
            setTimeout(reorderInactive, 200);
        }
        else {
            reorderInactive();
        }
        this.reorderList.reorderEmit(fromIndex, toIndex);
    }
    itemForCoord(coord) {
        return itemForPosition(this.offset.x - 100, coord.y, this.reorderList.getNativeElement());
    }
    scroll(posY) {
        if (posY < AUTO_SCROLL_MARGIN) {
            this.lastScrollPosition = this.reorderList.scrollContent(-SCROLL_JUMP);
        }
        else if (posY > this.windowHeight) {
            this.lastScrollPosition = this.reorderList.scrollContent(SCROLL_JUMP);
        }
        return this.lastScrollPosition;
    }
    destroy() {
        this.onDragEnd(null);
        this.events.unlistenAll();
        this.events = null;
        this.reorderList = null;
    }
}
function itemForPosition(x, y, list) {
    let element = document.elementFromPoint(x, y);
    return findReorderItem(element, list);
}
//# sourceMappingURL=item-reorder-gesture.js.map
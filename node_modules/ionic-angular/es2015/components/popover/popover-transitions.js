import { Animation } from '../../animations/animation';
import { CSS, nativeRaf } from '../../util/dom';
import { PageTransition } from '../../transitions/page-transition';
export class PopoverTransition extends PageTransition {
    mdPositionView(nativeEle, ev) {
        let originY = 'top';
        let originX = 'left';
        let popoverWrapperEle = nativeEle.querySelector('.popover-wrapper');
        let popoverEle = nativeEle.querySelector('.popover-content');
        let popoverDim = popoverEle.getBoundingClientRect();
        let popoverWidth = popoverDim.width;
        let popoverHeight = popoverDim.height;
        let bodyWidth = window.innerWidth;
        let bodyHeight = window.innerHeight;
        let targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2) - (popoverWidth / 2);
        let targetHeight = targetDim && targetDim.height || 0;
        let popoverCSS = {
            top: targetTop,
            left: targetLeft
        };
        if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
            popoverCSS.left = POPOVER_MD_BODY_PADDING;
        }
        else if (popoverWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_MD_BODY_PADDING;
            originX = 'right';
        }
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            popoverCSS.top = targetTop - popoverHeight;
            nativeEle.className = nativeEle.className + ' popover-bottom';
            originY = 'bottom';
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
        }
        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        popoverEle.style[CSS.transformOrigin] = originY + ' ' + originX;
        popoverWrapperEle.style.opacity = '1';
    }
    iosPositionView(nativeEle, ev) {
        let originY = 'top';
        let originX = 'left';
        let popoverWrapperEle = nativeEle.querySelector('.popover-wrapper');
        let popoverEle = nativeEle.querySelector('.popover-content');
        let popoverDim = popoverEle.getBoundingClientRect();
        let popoverWidth = popoverDim.width;
        let popoverHeight = popoverDim.height;
        let bodyWidth = window.innerWidth;
        let bodyHeight = window.innerHeight;
        let targetDim = ev && ev.target && ev.target.getBoundingClientRect();
        let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2);
        let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2);
        let targetWidth = targetDim && targetDim.width || 0;
        let targetHeight = targetDim && targetDim.height || 0;
        var arrowEle = nativeEle.querySelector('.popover-arrow');
        let arrowDim = arrowEle.getBoundingClientRect();
        var arrowWidth = arrowDim.width;
        var arrowHeight = arrowDim.height;
        if (!targetDim) {
            arrowEle.style.display = 'none';
        }
        let arrowCSS = {
            top: targetTop + targetHeight,
            left: targetLeft + (targetWidth / 2) - (arrowWidth / 2)
        };
        let popoverCSS = {
            top: targetTop + targetHeight + (arrowHeight - 1),
            left: targetLeft + (targetWidth / 2) - (popoverWidth / 2)
        };
        if (popoverCSS.left < POPOVER_IOS_BODY_PADDING) {
            popoverCSS.left = POPOVER_IOS_BODY_PADDING;
        }
        else if (popoverWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left > bodyWidth) {
            popoverCSS.left = bodyWidth - popoverWidth - POPOVER_IOS_BODY_PADDING;
            originX = 'right';
        }
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
            arrowCSS.top = targetTop - (arrowHeight + 1);
            popoverCSS.top = targetTop - popoverHeight - (arrowHeight - 1);
            nativeEle.className = nativeEle.className + ' popover-bottom';
            originY = 'bottom';
        }
        else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
            popoverEle.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
        }
        arrowEle.style.top = arrowCSS.top + 'px';
        arrowEle.style.left = arrowCSS.left + 'px';
        popoverEle.style.top = popoverCSS.top + 'px';
        popoverEle.style.left = popoverCSS.left + 'px';
        popoverEle.style[CSS.transformOrigin] = originY + ' ' + originX;
        popoverWrapperEle.style.opacity = '1';
    }
}
export class PopoverPopIn extends PopoverTransition {
    init() {
        let ele = this.enteringView.pageRef().nativeElement;
        let backdrop = new Animation(ele.querySelector('ion-backdrop'));
        let wrapper = new Animation(ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1);
        backdrop.fromTo('opacity', 0.01, 0.08);
        this
            .easing('ease')
            .duration(100)
            .add(backdrop)
            .add(wrapper);
    }
    play() {
        nativeRaf(() => {
            this.iosPositionView(this.enteringView.pageRef().nativeElement, this.opts.ev);
            super.play();
        });
    }
}
export class PopoverPopOut extends PopoverTransition {
    init() {
        let ele = this.leavingView.pageRef().nativeElement;
        let backdrop = new Animation(ele.querySelector('ion-backdrop'));
        let wrapper = new Animation(ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        backdrop.fromTo('opacity', 0.08, 0);
        this
            .easing('ease')
            .duration(500)
            .add(backdrop)
            .add(wrapper);
    }
}
export class PopoverMdPopIn extends PopoverTransition {
    init() {
        let ele = this.enteringView.pageRef().nativeElement;
        let content = new Animation(ele.querySelector('.popover-content'));
        let viewport = new Animation(ele.querySelector('.popover-viewport'));
        content.fromTo('scale', 0.001, 1);
        viewport.fromTo('opacity', 0.01, 1);
        this
            .easing('cubic-bezier(0.36,0.66,0.04,1)')
            .duration(300)
            .add(content)
            .add(viewport);
    }
    play() {
        nativeRaf(() => {
            this.mdPositionView(this.enteringView.pageRef().nativeElement, this.opts.ev);
            super.play();
        });
    }
}
export class PopoverMdPopOut extends PopoverTransition {
    init() {
        let ele = this.leavingView.pageRef().nativeElement;
        let wrapper = new Animation(ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        this
            .easing('ease')
            .duration(500)
            .fromTo('opacity', 0.01, 1)
            .add(wrapper);
    }
}
const POPOVER_IOS_BODY_PADDING = 2;
const POPOVER_MD_BODY_PADDING = 12;
//# sourceMappingURL=popover-transitions.js.map
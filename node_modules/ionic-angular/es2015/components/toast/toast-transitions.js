import { Animation } from '../../animations/animation';
import { Transition } from '../../transitions/transition';
export class ToastSlideIn extends Transition {
    init() {
        let ele = this.enteringView.pageRef().nativeElement;
        const wrapperEle = ele.querySelector('.toast-wrapper');
        let wrapper = new Animation(wrapperEle);
        if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_TOP) {
            wrapper.fromTo('translateY', '-100%', `${10}px`);
        }
        else if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_MIDDLE) {
            let topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapper.fromTo('opacity', 0.01, 1);
        }
        else {
            wrapper.fromTo('translateY', '100%', `${0 - 10}px`);
        }
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(wrapper);
    }
}
export class ToastSlideOut extends Transition {
    init() {
        let ele = this.leavingView.pageRef().nativeElement;
        const wrapperEle = ele.querySelector('.toast-wrapper');
        let wrapper = new Animation(wrapperEle);
        if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_TOP) {
            wrapper.fromTo('translateY', `${10}px`, '-100%');
        }
        else if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_MIDDLE) {
            wrapper.fromTo('opacity', 0.99, 0);
        }
        else {
            wrapper.fromTo('translateY', `${0 - 10}px`, '100%');
        }
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add(wrapper);
    }
}
export class ToastMdSlideIn extends Transition {
    init() {
        let ele = this.enteringView.pageRef().nativeElement;
        const wrapperEle = ele.querySelector('.toast-wrapper');
        let wrapper = new Animation(wrapperEle);
        if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_TOP) {
            wrapper.fromTo('translateY', '-100%', `0%`);
        }
        else if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_MIDDLE) {
            let topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapper.fromTo('opacity', 0.01, 1);
        }
        else {
            wrapper.fromTo('translateY', '100%', `0%`);
        }
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(wrapper);
    }
}
export class ToastMdSlideOut extends Transition {
    init() {
        let ele = this.leavingView.pageRef().nativeElement;
        const wrapperEle = ele.querySelector('.toast-wrapper');
        let wrapper = new Animation(wrapperEle);
        if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_TOP) {
            wrapper.fromTo('translateY', `${0}%`, '-100%');
        }
        else if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_MIDDLE) {
            wrapper.fromTo('opacity', 0.99, 0);
        }
        else {
            wrapper.fromTo('translateY', `${0}%`, '100%');
        }
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(wrapper);
    }
}
export class ToastWpPopIn extends Transition {
    init() {
        let ele = this.enteringView.pageRef().nativeElement;
        const wrapperEle = ele.querySelector('.toast-wrapper');
        let wrapper = new Animation(wrapperEle);
        if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_TOP) {
            wrapper.fromTo('opacity', 0.01, 1);
            wrapper.fromTo('scale', 1.3, 1);
        }
        else if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_MIDDLE) {
            let topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapper.fromTo('opacity', 0.01, 1);
            wrapper.fromTo('scale', 1.3, 1);
        }
        else {
            wrapper.fromTo('opacity', 0.01, 1);
            wrapper.fromTo('scale', 1.3, 1);
        }
        this.easing('cubic-bezier(0,0,0.05,1)').duration(200).add(wrapper);
    }
}
export class ToastWpPopOut extends Transition {
    init() {
        let ele = this.leavingView.pageRef().nativeElement;
        const wrapperEle = ele.querySelector('.toast-wrapper');
        let wrapper = new Animation(wrapperEle);
        if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_TOP) {
            wrapper.fromTo('opacity', 0.99, 0);
            wrapper.fromTo('scale', 1, 1.3);
        }
        else if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_MIDDLE) {
            wrapper.fromTo('opacity', 0.99, 0);
            wrapper.fromTo('scale', 1, 1.3);
        }
        else {
            wrapper.fromTo('opacity', 0.99, 0);
            wrapper.fromTo('scale', 1, 1.3);
        }
        const EASE = 'ease-out';
        const DURATION = 150;
        this.easing(EASE).duration(DURATION).add(wrapper);
    }
}
const TOAST_POSITION_TOP = 'top';
const TOAST_POSITION_MIDDLE = 'middle';
//# sourceMappingURL=toast-transitions.js.map
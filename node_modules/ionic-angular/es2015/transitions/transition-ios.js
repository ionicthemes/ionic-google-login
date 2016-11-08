import { Animation } from '../animations/animation';
import { isPresent } from '../util/util';
import { PageTransition } from './page-transition';
const DURATION = 500;
const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
const OPACITY = 'opacity';
const TRANSFORM = 'transform';
const TRANSLATEX = 'translateX';
const OFF_RIGHT = '99.5%';
const OFF_LEFT = '-33%';
const CENTER = '0%';
const OFF_OPACITY = 0.8;
const SHOW_BACK_BTN_CSS = 'show-back-button';
export class IOSTransition extends PageTransition {
    init() {
        super.init();
        const enteringView = this.enteringView;
        const leavingView = this.leavingView;
        const opts = this.opts;
        this.duration(isPresent(opts.duration) ? opts.duration : DURATION);
        this.easing(isPresent(opts.easing) ? opts.easing : EASING);
        const backDirection = (opts.direction === 'back');
        const enteringHasNavbar = (enteringView && enteringView.hasNavbar());
        const leavingHasNavbar = (leavingView && leavingView.hasNavbar());
        if (enteringView) {
            const enteringPageEle = enteringView.pageRef().nativeElement;
            const enteringContent = new Animation(enteringView.contentRef());
            enteringContent.element(enteringPageEle.querySelectorAll('ion-header > *:not(ion-navbar),ion-footer > *'));
            this.add(enteringContent);
            if (backDirection) {
                enteringContent
                    .fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
                    .fromTo(OPACITY, OFF_OPACITY, 1, true);
            }
            else {
                enteringContent
                    .beforeClearStyles([OPACITY])
                    .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
            }
            if (enteringHasNavbar) {
                const enteringNavbarEle = enteringPageEle.querySelector('ion-navbar');
                const enteringNavBar = new Animation(enteringNavbarEle);
                this.add(enteringNavBar);
                const enteringTitle = new Animation(enteringNavbarEle.querySelector('ion-title'));
                const enteringNavbarItems = new Animation(enteringNavbarEle.querySelectorAll('ion-buttons,[menuToggle]'));
                const enteringNavbarBg = new Animation(enteringNavbarEle.querySelector('.toolbar-background'));
                const enteringBackButton = new Animation(enteringNavbarEle.querySelector('.back-button'));
                enteringNavBar
                    .add(enteringTitle)
                    .add(enteringNavbarItems)
                    .add(enteringNavbarBg)
                    .add(enteringBackButton);
                enteringTitle.fromTo(OPACITY, 0.01, 1, true);
                enteringNavbarItems.fromTo(OPACITY, 0.01, 1, true);
                if (backDirection) {
                    enteringTitle.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true);
                    if (enteringView.enableBack()) {
                        enteringBackButton
                            .beforeAddClass(SHOW_BACK_BTN_CSS)
                            .fromTo(OPACITY, 0.01, 1, true);
                    }
                }
                else {
                    enteringTitle.fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                    enteringNavbarBg
                        .beforeClearStyles([OPACITY])
                        .fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true);
                    if (enteringView.enableBack()) {
                        enteringBackButton
                            .beforeAddClass(SHOW_BACK_BTN_CSS)
                            .fromTo(OPACITY, 0.01, 1, true);
                        const enteringBackBtnText = new Animation(enteringNavbarEle.querySelector('.back-button-text'));
                        enteringBackBtnText.fromTo(TRANSLATEX, '100px', '0px');
                        enteringNavBar.add(enteringBackBtnText);
                    }
                    else {
                        enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
                    }
                }
            }
        }
        if (leavingView && leavingView.pageRef()) {
            const leavingPageEle = leavingView.pageRef().nativeElement;
            const leavingContent = new Animation(leavingView.contentRef());
            leavingContent.element(leavingPageEle.querySelectorAll('ion-header > *:not(ion-navbar),ion-footer > *'));
            this.add(leavingContent);
            if (backDirection) {
                leavingContent
                    .beforeClearStyles([OPACITY])
                    .fromTo(TRANSLATEX, CENTER, '100%');
            }
            else {
                leavingContent
                    .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                    .fromTo(OPACITY, 1, OFF_OPACITY)
                    .afterClearStyles([TRANSFORM, OPACITY]);
            }
            if (leavingHasNavbar) {
                const leavingNavbarEle = leavingPageEle.querySelector('ion-navbar');
                const leavingNavBar = new Animation(leavingNavbarEle);
                const leavingTitle = new Animation(leavingNavbarEle.querySelector('ion-title'));
                const leavingNavbarItems = new Animation(leavingNavbarEle.querySelectorAll('ion-buttons,[menuToggle]'));
                const leavingNavbarBg = new Animation(leavingNavbarEle.querySelector('.toolbar-background'));
                const leavingBackButton = new Animation(leavingNavbarEle.querySelector('.back-button'));
                leavingNavBar
                    .add(leavingTitle)
                    .add(leavingNavbarItems)
                    .add(leavingBackButton)
                    .add(leavingNavbarBg);
                this.add(leavingNavBar);
                leavingBackButton.fromTo(OPACITY, 0.99, 0);
                leavingTitle.fromTo(OPACITY, 0.99, 0);
                leavingNavbarItems.fromTo(OPACITY, 0.99, 0);
                if (backDirection) {
                    leavingTitle.fromTo(TRANSLATEX, CENTER, '100%');
                    leavingNavbarBg
                        .beforeClearStyles([OPACITY])
                        .fromTo(TRANSLATEX, CENTER, '100%');
                    let leavingBackBtnText = new Animation(leavingNavbarEle.querySelector('.back-button-text'));
                    leavingBackBtnText.fromTo(TRANSLATEX, CENTER, (300) + 'px');
                    leavingNavBar.add(leavingBackBtnText);
                }
                else {
                    leavingTitle
                        .fromTo(TRANSLATEX, CENTER, OFF_LEFT)
                        .afterClearStyles([TRANSFORM]);
                    leavingBackButton.afterClearStyles([OPACITY]);
                    leavingTitle.afterClearStyles([OPACITY]);
                    leavingNavbarItems.afterClearStyles([OPACITY]);
                }
            }
        }
    }
}
//# sourceMappingURL=transition-ios.js.map
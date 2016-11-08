import { Animation } from '../../animations/animation';
import { MenuController } from './menu-controller';
export class MenuType {
    constructor() {
        this.ani = new Animation();
    }
    setOpen(shouldOpen, animated, done) {
        let ani = this.ani
            .onFinish(done, true)
            .reverse(!shouldOpen);
        if (animated) {
            ani.play();
        }
        else {
            ani.play({ duration: 0 });
        }
    }
    setProgressStart(isOpen) {
        this.isOpening = !isOpen;
        this.ani
            .reverse(isOpen)
            .progressStart();
    }
    setProgessStep(stepValue) {
        this.ani.progressStep(stepValue);
    }
    setProgressEnd(shouldComplete, currentStepValue, done) {
        let isOpen = (this.isOpening && shouldComplete);
        if (!this.isOpening && !shouldComplete) {
            isOpen = true;
        }
        this.ani.onFinish(() => {
            this.isOpening = false;
            done(isOpen);
        }, true);
        this.ani.progressEnd(shouldComplete, currentStepValue);
    }
    destroy() {
        this.ani && this.ani.destroy();
    }
}
class MenuRevealType extends MenuType {
    constructor(menu, platform) {
        super();
        let openedX = (menu.width() * (menu.side === 'right' ? -1 : 1)) + 'px';
        this.ani
            .easing('ease')
            .duration(250);
        let contentOpen = new Animation(menu.getContentElement());
        contentOpen.fromTo('translateX', '0px', openedX);
        this.ani.add(contentOpen);
    }
}
MenuController.registerType('reveal', MenuRevealType);
class MenuPushType extends MenuType {
    constructor(menu, platform) {
        super();
        this.ani
            .easing('ease')
            .duration(250);
        let contentOpenedX, menuClosedX, menuOpenedX;
        if (menu.side === 'right') {
            contentOpenedX = -menu.width() + 'px';
            menuClosedX = menu.width() + 'px';
            menuOpenedX = '0px';
        }
        else {
            contentOpenedX = menu.width() + 'px';
            menuOpenedX = '0px';
            menuClosedX = -menu.width() + 'px';
        }
        let menuAni = new Animation(menu.getMenuElement());
        menuAni.fromTo('translateX', menuClosedX, menuOpenedX);
        this.ani.add(menuAni);
        let contentApi = new Animation(menu.getContentElement());
        contentApi.fromTo('translateX', '0px', contentOpenedX);
        this.ani.add(contentApi);
    }
}
MenuController.registerType('push', MenuPushType);
class MenuOverlayType extends MenuType {
    constructor(menu, platform) {
        super();
        this.ani
            .easing('ease')
            .duration(250);
        let closedX, openedX;
        if (menu.side === 'right') {
            closedX = 8 + menu.width() + 'px';
            openedX = '0px';
        }
        else {
            closedX = -(8 + menu.width()) + 'px';
            openedX = '0px';
        }
        let menuAni = new Animation(menu.getMenuElement());
        menuAni.fromTo('translateX', closedX, openedX);
        this.ani.add(menuAni);
        let backdropApi = new Animation(menu.getBackdropElement());
        backdropApi.fromTo('opacity', 0.01, 0.35);
        this.ani.add(backdropApi);
    }
}
MenuController.registerType('overlay', MenuOverlayType);
//# sourceMappingURL=menu-types.js.map
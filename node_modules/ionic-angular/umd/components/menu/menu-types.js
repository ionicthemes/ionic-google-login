var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../animations/animation', './menu-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var animation_1 = require('../../animations/animation');
    var menu_controller_1 = require('./menu-controller');
    var MenuType = (function () {
        function MenuType() {
            this.ani = new animation_1.Animation();
        }
        MenuType.prototype.setOpen = function (shouldOpen, animated, done) {
            var ani = this.ani
                .onFinish(done, true)
                .reverse(!shouldOpen);
            if (animated) {
                ani.play();
            }
            else {
                ani.play({ duration: 0 });
            }
        };
        MenuType.prototype.setProgressStart = function (isOpen) {
            this.isOpening = !isOpen;
            this.ani
                .reverse(isOpen)
                .progressStart();
        };
        MenuType.prototype.setProgessStep = function (stepValue) {
            this.ani.progressStep(stepValue);
        };
        MenuType.prototype.setProgressEnd = function (shouldComplete, currentStepValue, done) {
            var _this = this;
            var isOpen = (this.isOpening && shouldComplete);
            if (!this.isOpening && !shouldComplete) {
                isOpen = true;
            }
            this.ani.onFinish(function () {
                _this.isOpening = false;
                done(isOpen);
            }, true);
            this.ani.progressEnd(shouldComplete, currentStepValue);
        };
        MenuType.prototype.destroy = function () {
            this.ani && this.ani.destroy();
        };
        return MenuType;
    }());
    exports.MenuType = MenuType;
    var MenuRevealType = (function (_super) {
        __extends(MenuRevealType, _super);
        function MenuRevealType(menu, platform) {
            _super.call(this);
            var openedX = (menu.width() * (menu.side === 'right' ? -1 : 1)) + 'px';
            this.ani
                .easing('ease')
                .duration(250);
            var contentOpen = new animation_1.Animation(menu.getContentElement());
            contentOpen.fromTo('translateX', '0px', openedX);
            this.ani.add(contentOpen);
        }
        return MenuRevealType;
    }(MenuType));
    menu_controller_1.MenuController.registerType('reveal', MenuRevealType);
    var MenuPushType = (function (_super) {
        __extends(MenuPushType, _super);
        function MenuPushType(menu, platform) {
            _super.call(this);
            this.ani
                .easing('ease')
                .duration(250);
            var contentOpenedX, menuClosedX, menuOpenedX;
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
            var menuAni = new animation_1.Animation(menu.getMenuElement());
            menuAni.fromTo('translateX', menuClosedX, menuOpenedX);
            this.ani.add(menuAni);
            var contentApi = new animation_1.Animation(menu.getContentElement());
            contentApi.fromTo('translateX', '0px', contentOpenedX);
            this.ani.add(contentApi);
        }
        return MenuPushType;
    }(MenuType));
    menu_controller_1.MenuController.registerType('push', MenuPushType);
    var MenuOverlayType = (function (_super) {
        __extends(MenuOverlayType, _super);
        function MenuOverlayType(menu, platform) {
            _super.call(this);
            this.ani
                .easing('ease')
                .duration(250);
            var closedX, openedX;
            if (menu.side === 'right') {
                closedX = 8 + menu.width() + 'px';
                openedX = '0px';
            }
            else {
                closedX = -(8 + menu.width()) + 'px';
                openedX = '0px';
            }
            var menuAni = new animation_1.Animation(menu.getMenuElement());
            menuAni.fromTo('translateX', closedX, openedX);
            this.ani.add(menuAni);
            var backdropApi = new animation_1.Animation(menu.getBackdropElement());
            backdropApi.fromTo('opacity', 0.01, 0.35);
            this.ani.add(backdropApi);
        }
        return MenuOverlayType;
    }(MenuType));
    menu_controller_1.MenuController.registerType('overlay', MenuOverlayType);
});
//# sourceMappingURL=menu-types.js.map
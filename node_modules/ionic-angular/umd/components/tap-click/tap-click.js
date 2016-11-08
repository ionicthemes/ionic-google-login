(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './activator', '../app/app', '../../config/config', '../../util/dom', './ripple', '../../util/ui-event-manager'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var activator_1 = require('./activator');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var dom_1 = require('../../util/dom');
    var ripple_1 = require('./ripple');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    var TapClick = (function () {
        function TapClick(config, app, zone) {
            this.app = app;
            this.disableClick = 0;
            this.events = new ui_event_manager_1.UIEventManager(false);
            var activator = config.get('activator');
            if (activator === 'ripple') {
                this.activator = new ripple_1.RippleActivator(app, config);
            }
            else if (activator === 'highlight') {
                this.activator = new activator_1.Activator(app, config);
            }
            this.usePolyfill = (config.get('tapPolyfill') === true);
            this.events.listen(document, 'click', this.click.bind(this), true);
            this.pointerEvents = this.events.pointerEvents({
                element: document,
                pointerDown: this.pointerStart.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerEnd.bind(this),
                passive: true
            });
            this.pointerEvents.mouseWait = DISABLE_NATIVE_CLICK_AMOUNT;
        }
        TapClick.prototype.pointerStart = function (ev) {
            if (this.startCoord) {
                return false;
            }
            var activatableEle = getActivatableTarget(ev.target);
            if (!activatableEle) {
                this.startCoord = null;
                return false;
            }
            this.startCoord = dom_1.pointerCoord(ev);
            this.activator && this.activator.downAction(ev, activatableEle, this.startCoord);
            return true;
        };
        TapClick.prototype.pointerMove = function (ev) {
            if (!this.startCoord ||
                dom_1.hasPointerMoved(POINTER_TOLERANCE, this.startCoord, dom_1.pointerCoord(ev)) ||
                this.app.isScrolling()) {
                this.pointerCancel(ev);
            }
        };
        TapClick.prototype.pointerEnd = function (ev, type) {
            if (!this.startCoord) {
                return;
            }
            if (type === 2 && this.usePolyfill && this.app.isEnabled()) {
                this.handleTapPolyfill(ev);
            }
            if (this.activator) {
                var activatableEle = getActivatableTarget(ev.target);
                if (activatableEle) {
                    this.activator.upAction(ev, activatableEle, this.startCoord);
                }
            }
            this.startCoord = null;
        };
        TapClick.prototype.pointerCancel = function (ev) {
            (void 0);
            this.startCoord = null;
            this.activator && this.activator.clearState();
            this.pointerEvents.stop();
        };
        TapClick.prototype.click = function (ev) {
            var preventReason = null;
            if (!this.app.isEnabled()) {
                preventReason = 'appDisabled';
            }
            else if (!ev.isIonicTap && this.isDisabledNativeClick()) {
                preventReason = 'nativeClick';
            }
            if (preventReason !== null) {
                (void 0);
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        TapClick.prototype.handleTapPolyfill = function (ev) {
            var endCoord = dom_1.pointerCoord(ev);
            if (dom_1.hasPointerMoved(POINTER_TOLERANCE, this.startCoord, endCoord)) {
                (void 0);
                return;
            }
            this.disableClick = Date.now() + DISABLE_NATIVE_CLICK_AMOUNT;
            if (this.app.isScrolling()) {
                (void 0);
            }
            else {
                (void 0);
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
                clickEvent.isIonicTap = true;
                ev.target.dispatchEvent(clickEvent);
            }
        };
        TapClick.prototype.isDisabledNativeClick = function () {
            return this.disableClick > Date.now();
        };
        TapClick.decorators = [
            { type: core_1.Injectable },
        ];
        TapClick.ctorParameters = [
            { type: config_1.Config, },
            { type: app_1.App, },
            { type: core_1.NgZone, },
        ];
        return TapClick;
    }());
    exports.TapClick = TapClick;
    function getActivatableTarget(ele) {
        var targetEle = ele;
        for (var x = 0; x < 4; x++) {
            if (!targetEle)
                break;
            if (exports.isActivatable(targetEle))
                return targetEle;
            targetEle = targetEle.parentElement;
        }
        return null;
    }
    exports.isActivatable = function (ele) {
        if (ACTIVATABLE_ELEMENTS.indexOf(ele.tagName) > -1) {
            return true;
        }
        var attributes = ele.attributes;
        for (var i = 0, l = attributes.length; i < l; i++) {
            if (ACTIVATABLE_ATTRIBUTES.indexOf(attributes[i].name) > -1) {
                return true;
            }
        }
        return false;
    };
    var ACTIVATABLE_ELEMENTS = ['A', 'BUTTON'];
    var ACTIVATABLE_ATTRIBUTES = ['tappable', 'button'];
    var POINTER_TOLERANCE = 60;
    var DISABLE_NATIVE_CLICK_AMOUNT = 2500;
    function setupTapClick(config, app, zone) {
        return function () {
            return new TapClick(config, app, zone);
        };
    }
    exports.setupTapClick = setupTapClick;
});
//# sourceMappingURL=tap-click.js.map
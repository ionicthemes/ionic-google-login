(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/dom', '../util/scroll-view'], factory);
    }
})(function (require, exports) {
    "use strict";
    var dom_1 = require('../util/dom');
    var scroll_view_1 = require('../util/scroll-view');
    var Events = (function () {
        function Events() {
            this._channels = [];
        }
        Events.prototype.subscribe = function (topic) {
            var _this = this;
            var handlers = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                handlers[_i - 1] = arguments[_i];
            }
            if (!this._channels[topic]) {
                this._channels[topic] = [];
            }
            handlers.forEach(function (handler) {
                _this._channels[topic].push(handler);
            });
        };
        Events.prototype.unsubscribe = function (topic, handler) {
            if (handler === void 0) { handler = null; }
            var t = this._channels[topic];
            if (!t) {
                return false;
            }
            if (!handler) {
                delete this._channels[topic];
                return true;
            }
            var i = t.indexOf(handler);
            if (i < 0) {
                return false;
            }
            t.splice(i, 1);
            if (!t.length) {
                delete this._channels[topic];
            }
            return true;
        };
        Events.prototype.publish = function (topic) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var t = this._channels[topic];
            if (!t) {
                return null;
            }
            var responses = [];
            t.forEach(function (handler) {
                responses.push(handler(args));
            });
            return responses;
        };
        return Events;
    }());
    exports.Events = Events;
    function setupEvents(platform) {
        var events = new Events();
        dom_1.nativeTimeout(function () {
            window.addEventListener('online', function (ev) {
                events.publish('app:online', ev);
            }, false);
            window.addEventListener('offline', function (ev) {
                events.publish('app:offline', ev);
            }, false);
            window.addEventListener('orientationchange', function (ev) {
                events.publish('app:rotated', ev);
            });
            window.addEventListener('statusTap', function (ev) {
                var el = document.elementFromPoint(platform.width() / 2, platform.height() / 2);
                if (!el) {
                    return;
                }
                var content = el.closest('.scroll-content');
                if (content) {
                    var scroll = new scroll_view_1.ScrollView(content);
                    content.style['WebkitBackfaceVisibility'] = 'hidden';
                    content.style['WebkitTransform'] = 'translate3d(0,0,0)';
                    dom_1.nativeRaf(function () {
                        content.style.overflow = 'hidden';
                        function finish() {
                            content.style.overflow = '';
                            content.style['WebkitBackfaceVisibility'] = '';
                            content.style['WebkitTransform'] = '';
                        }
                        var didScrollTimeout = setTimeout(function () {
                            finish();
                        }, 400);
                        scroll.scrollTo(0, 0, 300).then(function () {
                            clearTimeout(didScrollTimeout);
                            finish();
                        });
                    });
                }
            });
            window.addEventListener('resize', function () {
                platform.windowResize();
            });
        }, 2000);
        return events;
    }
    exports.setupEvents = setupEvents;
    function setupProvideEvents(platform) {
        return function () {
            return setupEvents(platform);
        };
    }
    exports.setupProvideEvents = setupProvideEvents;
});
//# sourceMappingURL=events.js.map
import { nativeTimeout, nativeRaf } from '../util/dom';
import { ScrollView } from '../util/scroll-view';
export class Events {
    constructor() {
        this._channels = [];
    }
    subscribe(topic, ...handlers) {
        if (!this._channels[topic]) {
            this._channels[topic] = [];
        }
        handlers.forEach((handler) => {
            this._channels[topic].push(handler);
        });
    }
    unsubscribe(topic, handler = null) {
        let t = this._channels[topic];
        if (!t) {
            return false;
        }
        if (!handler) {
            delete this._channels[topic];
            return true;
        }
        let i = t.indexOf(handler);
        if (i < 0) {
            return false;
        }
        t.splice(i, 1);
        if (!t.length) {
            delete this._channels[topic];
        }
        return true;
    }
    publish(topic, ...args) {
        var t = this._channels[topic];
        if (!t) {
            return null;
        }
        let responses = [];
        t.forEach((handler) => {
            responses.push(handler(args));
        });
        return responses;
    }
}
export function setupEvents(platform) {
    const events = new Events();
    nativeTimeout(() => {
        window.addEventListener('online', (ev) => {
            events.publish('app:online', ev);
        }, false);
        window.addEventListener('offline', (ev) => {
            events.publish('app:offline', ev);
        }, false);
        window.addEventListener('orientationchange', (ev) => {
            events.publish('app:rotated', ev);
        });
        window.addEventListener('statusTap', (ev) => {
            let el = document.elementFromPoint(platform.width() / 2, platform.height() / 2);
            if (!el) {
                return;
            }
            let content = el.closest('.scroll-content');
            if (content) {
                var scroll = new ScrollView(content);
                content.style['WebkitBackfaceVisibility'] = 'hidden';
                content.style['WebkitTransform'] = 'translate3d(0,0,0)';
                nativeRaf(function () {
                    content.style.overflow = 'hidden';
                    function finish() {
                        content.style.overflow = '';
                        content.style['WebkitBackfaceVisibility'] = '';
                        content.style['WebkitTransform'] = '';
                    }
                    let didScrollTimeout = setTimeout(() => {
                        finish();
                    }, 400);
                    scroll.scrollTo(0, 0, 300).then(() => {
                        clearTimeout(didScrollTimeout);
                        finish();
                    });
                });
            }
        });
        window.addEventListener('resize', () => {
            platform.windowResize();
        });
    }, 2000);
    return events;
}
export function setupProvideEvents(platform) {
    return function () {
        return setupEvents(platform);
    };
}
//# sourceMappingURL=events.js.map
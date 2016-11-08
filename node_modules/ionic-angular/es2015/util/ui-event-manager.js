var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    });
    window.addEventListener('test', null, opts);
}
catch (e) { }
export class PointerEvents {
    constructor(ele, pointerDown, pointerMove, pointerUp, zone, option) {
        this.ele = ele;
        this.pointerDown = pointerDown;
        this.pointerMove = pointerMove;
        this.pointerUp = pointerUp;
        this.zone = zone;
        this.option = option;
        this.rmTouchStart = null;
        this.rmTouchMove = null;
        this.rmTouchEnd = null;
        this.rmTouchCancel = null;
        this.rmMouseStart = null;
        this.rmMouseMove = null;
        this.rmMouseUp = null;
        this.lastTouchEvent = 0;
        this.mouseWait = 2 * 1000;
        this.lastEventType = 0;
        (void 0);
        (void 0);
        this.bindTouchEnd = this.handleTouchEnd.bind(this);
        this.bindMouseUp = this.handleMouseUp.bind(this);
        this.rmTouchStart = listenEvent(ele, 'touchstart', zone, option, this.handleTouchStart.bind(this));
        this.rmMouseStart = listenEvent(ele, 'mousedown', zone, option, this.handleMouseDown.bind(this));
    }
    handleTouchStart(ev) {
        (void 0);
        (void 0);
        this.lastTouchEvent = Date.now() + this.mouseWait;
        this.lastEventType = 2;
        if (!this.pointerDown(ev, 2)) {
            return;
        }
        if (!this.rmTouchMove && this.pointerMove) {
            this.rmTouchMove = listenEvent(this.ele, 'touchmove', this.zone, this.option, this.pointerMove);
        }
        if (!this.rmTouchEnd) {
            this.rmTouchEnd = listenEvent(this.ele, 'touchend', this.zone, this.option, this.bindTouchEnd);
        }
        if (!this.rmTouchCancel) {
            this.rmTouchCancel = listenEvent(this.ele, 'touchcancel', this.zone, this.option, this.bindTouchEnd);
        }
    }
    handleMouseDown(ev) {
        (void 0);
        (void 0);
        if (this.lastTouchEvent > Date.now()) {
            (void 0);
            return;
        }
        this.lastEventType = 1;
        if (!this.pointerDown(ev, 1)) {
            return;
        }
        if (!this.rmMouseMove && this.pointerMove) {
            this.rmMouseMove = listenEvent(document, 'mousemove', this.zone, this.option, this.pointerMove);
        }
        if (!this.rmMouseUp) {
            this.rmMouseUp = listenEvent(document, 'mouseup', this.zone, this.option, this.bindMouseUp);
        }
    }
    handleTouchEnd(ev) {
        this.stopTouch();
        this.pointerUp && this.pointerUp(ev, 2);
    }
    handleMouseUp(ev) {
        this.stopMouse();
        this.pointerUp && this.pointerUp(ev, 1);
    }
    stopTouch() {
        this.rmTouchMove && this.rmTouchMove();
        this.rmTouchEnd && this.rmTouchEnd();
        this.rmTouchCancel && this.rmTouchCancel();
        this.rmTouchMove = null;
        this.rmTouchEnd = null;
        this.rmTouchCancel = null;
    }
    stopMouse() {
        this.rmMouseMove && this.rmMouseMove();
        this.rmMouseUp && this.rmMouseUp();
        this.rmMouseMove = null;
        this.rmMouseUp = null;
    }
    stop() {
        this.stopTouch();
        this.stopMouse();
    }
    destroy() {
        this.rmTouchStart && this.rmTouchStart();
        this.rmTouchStart = null;
        this.rmMouseStart && this.rmMouseStart();
        this.rmMouseStart = null;
        this.stop();
        this.pointerDown = null;
        this.pointerMove = null;
        this.pointerUp = null;
        this.ele = null;
    }
}
export class UIEventManager {
    constructor(zoneWrapped = true) {
        this.zoneWrapped = zoneWrapped;
        this.events = [];
    }
    pointerEvents(config) {
        let element = config.element;
        if (!element) {
            element = config.elementRef.nativeElement;
        }
        if (!element || !config.pointerDown) {
            console.error('PointerEvents config is invalid');
            return;
        }
        let zone = config.zone || this.zoneWrapped;
        let opts;
        if (supportsPassive) {
            opts = {};
            if (config.passive === true) {
                opts['passive'] = true;
            }
            if (config.capture === true) {
                opts['capture'] = true;
            }
        }
        else {
            if (config.passive === true) {
                (void 0);
            }
            if (config.capture === true) {
                opts = true;
            }
        }
        let pointerEvents = new PointerEvents(element, config.pointerDown, config.pointerMove, config.pointerUp, zone, opts);
        let removeFunc = () => pointerEvents.destroy();
        this.events.push(removeFunc);
        return pointerEvents;
    }
    listenRef(ref, eventName, callback, option) {
        return this.listen(ref.nativeElement, eventName, callback, option);
    }
    listen(element, eventName, callback, option = false) {
        if (!element) {
            return;
        }
        let removeFunc = listenEvent(element, eventName, this.zoneWrapped, option, callback);
        this.events.push(removeFunc);
        return removeFunc;
    }
    unlistenAll() {
        for (let event of this.events) {
            event();
        }
        this.events.length = 0;
    }
}
function listenEvent(ele, eventName, zoneWrapped, option, callback) {
    let rawEvent = (!zoneWrapped && '__zone_symbol__addEventListener' in ele);
    if (rawEvent) {
        ele.__zone_symbol__addEventListener(eventName, callback, option);
        (void 0);
        return () => ele.__zone_symbol__removeEventListener(eventName, callback, option);
    }
    else {
        ele.addEventListener(eventName, callback, option);
        return () => ele.removeEventListener(eventName, callback, option);
    }
}
//# sourceMappingURL=ui-event-manager.js.map
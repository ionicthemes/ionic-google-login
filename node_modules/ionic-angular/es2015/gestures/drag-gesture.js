import { defaults } from '../util/util';
import { PanRecognizer } from './recognizers';
import { UIEventManager } from '../util/ui-event-manager';
import { pointerCoord } from '../util/dom';
import { FakeDebouncer } from '../util/debouncer';
export class PanGesture {
    constructor(element, opts = {}) {
        this.element = element;
        this.events = new UIEventManager(false);
        this.started = false;
        this.captured = false;
        this.isListening = false;
        defaults(opts, {
            threshold: 20,
            maxAngle: 40,
            direction: 'x',
            zone: true,
            capture: false,
        });
        this.debouncer = (opts.debouncer)
            ? opts.debouncer
            : new FakeDebouncer();
        this.gestute = opts.gesture;
        this.direction = opts.direction;
        this.eventsConfig = {
            element: this.element,
            pointerDown: this.pointerDown.bind(this),
            pointerMove: this.pointerMove.bind(this),
            pointerUp: this.pointerUp.bind(this),
            zone: opts.zone,
            capture: opts.capture
        };
        this.detector = new PanRecognizer(opts.direction, opts.threshold, opts.maxAngle);
    }
    listen() {
        if (this.isListening) {
            return;
        }
        this.pointerEvents = this.events.pointerEvents(this.eventsConfig);
        this.isListening = true;
    }
    unlisten() {
        if (!this.isListening) {
            return;
        }
        this.gestute && this.gestute.release();
        this.events.unlistenAll();
        this.isListening = false;
    }
    destroy() {
        this.gestute && this.gestute.destroy();
        this.gestute = null;
        this.unlisten();
        this.element = null;
    }
    pointerDown(ev) {
        if (this.started) {
            return;
        }
        if (!this.canStart(ev)) {
            return false;
        }
        if (this.gestute) {
            this.gestute.release();
            if (!this.gestute.start()) {
                return false;
            }
        }
        let coord = pointerCoord(ev);
        this.detector.start(coord);
        this.started = true;
        this.captured = false;
        return true;
    }
    pointerMove(ev) {
        this.debouncer.debounce(() => {
            if (!this.started) {
                return;
            }
            if (this.captured) {
                this.onDragMove(ev);
                return;
            }
            let coord = pointerCoord(ev);
            if (this.detector.detect(coord)) {
                if (this.detector.pan() !== 0 && this.canCapture(ev) &&
                    (!this.gestute || this.gestute.capture())) {
                    this.onDragStart(ev);
                    this.captured = true;
                    return;
                }
                this.started = false;
                this.captured = false;
                this.pointerEvents.stop();
                this.notCaptured(ev);
            }
        });
    }
    pointerUp(ev) {
        this.debouncer.cancel();
        if (!this.started) {
            return;
        }
        this.gestute && this.gestute.release();
        if (this.captured) {
            this.onDragEnd(ev);
        }
        else {
            this.notCaptured(ev);
        }
        this.captured = false;
        this.started = false;
    }
    getNativeElement() {
        return this.element;
    }
    canStart(ev) { return true; }
    canCapture(ev) { return true; }
    onDragStart(ev) { }
    onDragMove(ev) { }
    onDragEnd(ev) { }
    notCaptured(ev) { }
}
//# sourceMappingURL=drag-gesture.js.map
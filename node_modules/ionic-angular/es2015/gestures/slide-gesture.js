import { PanGesture } from './drag-gesture';
import { clamp } from '../util/util';
import { pointerCoord } from '../util/dom';
export class SlideGesture extends PanGesture {
    constructor(element, opts = {}) {
        super(element, opts);
        this.slide = null;
    }
    getSlideBoundaries(slide, ev) {
        return {
            min: 0,
            max: this.getNativeElement().offsetWidth
        };
    }
    getElementStartPos(slide, ev) {
        return 0;
    }
    onDragStart(ev) {
        this.onSlideBeforeStart(ev);
        let coord = pointerCoord(ev);
        let pos = coord[this.direction];
        this.slide = {
            min: 0,
            max: 0,
            pointerStartPos: pos,
            pos: pos,
            timestamp: Date.now(),
            elementStartPos: 0,
            started: true,
            delta: 0,
            distance: 0,
            velocity: 0,
        };
        let { min, max } = this.getSlideBoundaries(this.slide, ev);
        this.slide.min = min;
        this.slide.max = max;
        this.slide.elementStartPos = this.getElementStartPos(this.slide, ev);
        this.onSlideStart(this.slide, ev);
    }
    onDragMove(ev) {
        let slide = this.slide;
        let coord = pointerCoord(ev);
        let newPos = coord[this.direction];
        let newTimestamp = Date.now();
        let velocity = (newPos - slide.pos) / (newTimestamp - slide.timestamp);
        slide.pos = newPos;
        slide.timestamp = newTimestamp;
        slide.distance = clamp(slide.min, newPos - slide.pointerStartPos + slide.elementStartPos, slide.max);
        slide.velocity = velocity;
        slide.delta = newPos - slide.pointerStartPos;
        this.onSlide(slide, ev);
        return true;
    }
    onDragEnd(ev) {
        this.onSlideEnd(this.slide, ev);
        this.slide = null;
    }
    onSlideBeforeStart(ev) { }
    onSlideStart(slide, ev) { }
    onSlide(slide, ev) { }
    onSlideEnd(slide, ev) { }
}
//# sourceMappingURL=slide-gesture.js.map
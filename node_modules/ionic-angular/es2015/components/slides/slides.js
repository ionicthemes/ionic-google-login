import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Input, Host, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { Animation } from '../../animations/animation';
import { Config } from '../../config/config';
import { Gesture } from '../../gestures/gesture';
import { CSS } from '../../util/dom';
import { debounce, defaults, isTrueProperty, isPresent } from '../../util/util';
import { Ion } from '../ion';
import { Swiper } from './swiper-widget';
export class Slides extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this.ionWillChange = new EventEmitter();
        this.ionDidChange = new EventEmitter();
        this.ionDrag = new EventEmitter();
        this.rapidUpdate = debounce(() => {
            this.update();
        }, 10);
        this.id = ++slidesId;
        this.slideId = 'slides-' + this.id;
        this.setElementClass(this.slideId, true);
    }
    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
        if (isPresent(this.options.pager)) {
            this.showPager = isTrueProperty(this.options.pager);
        }
        let paginationId = '.' + this.slideId + ' .swiper-pagination';
        var options = defaults({
            pagination: paginationId
        }, this.options);
        options.onTap = (swiper, e) => {
            this.onTap(swiper, e);
            return this.options.onTap && this.options.onTap(swiper, e);
        };
        options.onClick = (swiper, e) => {
            this.onClick(swiper, e);
            return this.options.onClick && this.options.onClick(swiper, e);
        };
        options.onDoubleTap = (swiper, e) => {
            this.onDoubleTap(swiper, e);
            return this.options.onDoubleTap && this.options.onDoubleTap(swiper, e);
        };
        options.onTransitionStart = (swiper, e) => {
            this.onTransitionStart(swiper, e);
            return this.options.onTransitionStart && this.options.onTransitionStart(swiper, e);
        };
        options.onTransitionEnd = (swiper, e) => {
            this.onTransitionEnd(swiper, e);
            return this.options.onTransitionEnd && this.options.onTransitionEnd(swiper, e);
        };
        options.onSlideChangeStart = (swiper) => {
            this.ionWillChange.emit(swiper);
            return this.options.onSlideChangeStart && this.options.onSlideChangeStart(swiper);
        };
        options.onSlideChangeEnd = (swiper) => {
            this.ionDidChange.emit(swiper);
            return this.options.onSlideChangeEnd && this.options.onSlideChangeEnd(swiper);
        };
        options.onLazyImageLoad = (swiper, slide, img) => {
            return this.options.onLazyImageLoad && this.options.onLazyImageLoad(swiper, slide, img);
        };
        options.onLazyImageReady = (swiper, slide, img) => {
            return this.options.onLazyImageReady && this.options.onLazyImageReady(swiper, slide, img);
        };
        options.onSliderMove = (swiper, e) => {
            this.ionDrag.emit(swiper);
            return this.options.onSliderMove && this.options.onSliderMove(swiper, e);
        };
        setTimeout(() => {
            var swiper = new Swiper(this.getNativeElement().children[0], options);
            this.slider = swiper;
        }, 300);
    }
    onTap(swiper, e) {
    }
    onClick(swiper, e) {
    }
    onDoubleTap(swiper, e) {
        this.toggleZoom(swiper, e);
    }
    onLazyImageLoad(swiper, slide, img) {
    }
    onLazyImageReady(swiper, slide, img) {
    }
    initZoom() {
        this.zoomDuration = this.zoomDuration || 230;
        this.maxScale = this.zoomMax || 3;
        this.zoomElement = this.getNativeElement().children[0].children[0];
        this.zoomElement && this.zoomElement.classList.add('ion-scroll-zoom');
        this.zoomGesture = new Gesture(this.zoomElement);
        this.zoomGesture.listen();
        this.scale = 1;
        this.zoomLastPosX = 0;
        this.zoomLastPosY = 0;
        let lastScale, zoomRect;
        this.viewportWidth = this.getNativeElement().offsetWidth;
        this.viewportHeight = this.getNativeElement().offsetHeight;
        this.zoomElement.addEventListener('touchstart', (e) => {
            this.onTouchStart(e);
        });
        this.zoomElement.addEventListener('touchmove', (e) => {
            this.onTouchMove(e);
        });
        this.zoomElement.addEventListener('touchend', (e) => {
            this.onTouchEnd(e);
        });
        this.zoomGesture.on('pinchstart', (e) => {
            lastScale = this.scale;
            (void 0);
        });
        this.zoomGesture.on('pinch', (e) => {
            this.scale = Math.max(1, Math.min(lastScale * e.scale, 10));
            (void 0);
            this.zoomElement.style[CSS.transform] = 'scale(' + this.scale + ')';
            zoomRect = this.zoomElement.getBoundingClientRect();
        });
        this.zoomGesture.on('pinchend', () => {
            if (this.scale > this.maxScale) {
                let za = new Animation(this.zoomElement)
                    .duration(this.zoomDuration)
                    .easing('linear')
                    .from('scale', this.scale)
                    .to('scale', this.maxScale);
                za.play();
                this.scale = this.maxScale;
            }
        });
    }
    resetZoom() {
        if (this.zoomElement) {
            this.zoomElement.parentElement.style[CSS.transform] = '';
            this.zoomElement.style[CSS.transform] = 'scale(1)';
        }
        this.scale = 1;
        this.zoomLastPosX = 0;
        this.zoomLastPosY = 0;
    }
    toggleZoom(swiper, e) {
        (void 0);
        if (!this.enableZoom) {
            return;
        }
        (void 0);
        let zi = new Animation(this.touch.target.children[0])
            .duration(this.zoomDuration)
            .easing('linear');
        let za = new Animation();
        za.add(zi);
        if (this.scale > 1) {
            zi.from('scale', this.scale);
            zi.to('scale', 1);
            za.play();
            this.scale = 1;
        }
        else {
            zi.from('scale', this.scale);
            zi.to('scale', this.maxScale);
            za.play();
            this.scale = this.maxScale;
        }
    }
    onTransitionStart(swiper, e) {
    }
    onTransitionEnd(swiper, e) {
    }
    onTouchStart(e) {
        (void 0);
        let target = e.target.closest('.slide').children[0].children[0];
        this.touch = {
            x: null,
            y: null,
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
            deltaX: 0,
            deltaY: 0,
            lastX: 0,
            lastY: 0,
            target: target.parentElement,
            zoomable: target,
            zoomableWidth: target.offsetWidth,
            zoomableHeight: target.offsetHeight
        };
        (void 0);
    }
    onTouchMove(e) {
        this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
        this.touch.deltaY = e.touches[0].clientY - this.touch.startY;
        let zoomableScaledWidth = this.touch.zoomableWidth * this.scale;
        let zoomableScaledHeight = this.touch.zoomableHeight * this.scale;
        let x1 = Math.min((this.viewportWidth / 2) - zoomableScaledWidth / 2, 0);
        let x2 = -x1;
        let y1 = Math.min((this.viewportHeight / 2) - zoomableScaledHeight / 2, 0);
        let y2 = -y1;
        (void 0);
        if (this.scale <= 1) {
            return;
        }
        (void 0);
        this.touch.x = this.touch.deltaX + this.touch.lastX;
        this.touch.y = this.touch.deltaY + this.touch.lastY;
        if (this.touch.x < x1) {
            (void 0);
        }
        if (this.touch.x > x2) {
            (void 0);
        }
        if (this.touch.x > this.viewportWidth) {
        }
        else if (-this.touch.x > this.viewportWidth) {
        }
        else {
            (void 0);
            this.touch.target.style[CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
    onTouchEnd(e) {
        (void 0);
        if (this.scale > 1) {
            if (Math.abs(this.touch.x) > this.viewportWidth) {
                var posX = posX > 0 ? this.viewportWidth - 1 : -(this.viewportWidth - 1);
                (void 0);
            }
            this.touch.lastX = this.touch.x;
            this.touch.lastY = this.touch.y;
        }
    }
    update() {
        setTimeout(() => {
            this.slider.update();
            if (this.length() > 10) {
                this.showPager = false;
            }
        }, 300);
    }
    slideTo(index, speed, runCallbacks) {
        this.slider.slideTo(index, speed, runCallbacks);
    }
    slideNext(speed, runCallbacks) {
        this.slider.slideNext(runCallbacks, speed);
    }
    slidePrev(speed, runCallbacks) {
        this.slider.slidePrev(runCallbacks, speed);
    }
    getActiveIndex() {
        return this.slider.activeIndex;
    }
    getPreviousIndex() {
        return this.slider.previousIndex;
    }
    length() {
        return this.slider.slides.length;
    }
    isEnd() {
        return this.slider.isEnd;
    }
    isBeginning() {
        return this.slider.isBeginning;
    }
    getSlider() {
        return this.slider;
    }
}
Slides.decorators = [
    { type: Component, args: [{
                selector: 'ion-slides',
                template: '<div class="swiper-container">' +
                    '<div class="swiper-wrapper">' +
                    '<ng-content></ng-content>' +
                    '</div>' +
                    '<div [class.hide]="!showPager" class="swiper-pagination"></div>' +
                    '</div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
Slides.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Slides.propDecorators = {
    'options': [{ type: Input },],
    'pager': [{ type: Input },],
    'zoom': [{ type: Input },],
    'zoomDuration': [{ type: Input },],
    'zoomMax': [{ type: Input },],
    'ionWillChange': [{ type: Output },],
    'ionDidChange': [{ type: Output },],
    'ionDrag': [{ type: Output },],
};
export class Slide {
    constructor(elementRef, slides) {
        this.slides = slides;
        this.ele = elementRef.nativeElement;
        this.ele.classList.add('swiper-slide');
        slides.rapidUpdate();
    }
    ngOnDestroy() {
        this.slides.rapidUpdate();
    }
}
Slide.decorators = [
    { type: Component, args: [{
                selector: 'ion-slide',
                template: '<div class="slide-zoom"><ng-content></ng-content></div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
Slide.ctorParameters = [
    { type: ElementRef, },
    { type: Slides, decorators: [{ type: Host },] },
];
Slide.propDecorators = {
    'zoom': [{ type: Input },],
};
export class SlideLazy {
}
SlideLazy.decorators = [
    { type: Directive, args: [{
                selector: 'slide-lazy',
                host: {
                    'class': 'swiper-lazy'
                }
            },] },
];
SlideLazy.ctorParameters = [];
let slidesId = -1;
//# sourceMappingURL=slides.js.map
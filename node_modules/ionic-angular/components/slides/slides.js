var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Input, Host, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { Animation } from '../../animations/animation';
import { Config } from '../../config/config';
import { Gesture } from '../../gestures/gesture';
import { CSS } from '../../util/dom';
import { debounce, defaults, isTrueProperty, isPresent } from '../../util/util';
import { Ion } from '../ion';
import { Swiper } from './swiper-widget';
export var Slides = (function (_super) {
    __extends(Slides, _super);
    function Slides(config, elementRef, renderer) {
        var _this = this;
        _super.call(this, config, elementRef, renderer);
        this.ionWillChange = new EventEmitter();
        this.ionDidChange = new EventEmitter();
        this.ionDrag = new EventEmitter();
        this.rapidUpdate = debounce(function () {
            _this.update();
        }, 10);
        this.id = ++slidesId;
        this.slideId = 'slides-' + this.id;
        this.setElementClass(this.slideId, true);
    }
    Slides.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.options) {
            this.options = {};
        }
        if (isPresent(this.options.pager)) {
            this.showPager = isTrueProperty(this.options.pager);
        }
        var paginationId = '.' + this.slideId + ' .swiper-pagination';
        var options = defaults({
            pagination: paginationId
        }, this.options);
        options.onTap = function (swiper, e) {
            _this.onTap(swiper, e);
            return _this.options.onTap && _this.options.onTap(swiper, e);
        };
        options.onClick = function (swiper, e) {
            _this.onClick(swiper, e);
            return _this.options.onClick && _this.options.onClick(swiper, e);
        };
        options.onDoubleTap = function (swiper, e) {
            _this.onDoubleTap(swiper, e);
            return _this.options.onDoubleTap && _this.options.onDoubleTap(swiper, e);
        };
        options.onTransitionStart = function (swiper, e) {
            _this.onTransitionStart(swiper, e);
            return _this.options.onTransitionStart && _this.options.onTransitionStart(swiper, e);
        };
        options.onTransitionEnd = function (swiper, e) {
            _this.onTransitionEnd(swiper, e);
            return _this.options.onTransitionEnd && _this.options.onTransitionEnd(swiper, e);
        };
        options.onSlideChangeStart = function (swiper) {
            _this.ionWillChange.emit(swiper);
            return _this.options.onSlideChangeStart && _this.options.onSlideChangeStart(swiper);
        };
        options.onSlideChangeEnd = function (swiper) {
            _this.ionDidChange.emit(swiper);
            return _this.options.onSlideChangeEnd && _this.options.onSlideChangeEnd(swiper);
        };
        options.onLazyImageLoad = function (swiper, slide, img) {
            return _this.options.onLazyImageLoad && _this.options.onLazyImageLoad(swiper, slide, img);
        };
        options.onLazyImageReady = function (swiper, slide, img) {
            return _this.options.onLazyImageReady && _this.options.onLazyImageReady(swiper, slide, img);
        };
        options.onSliderMove = function (swiper, e) {
            _this.ionDrag.emit(swiper);
            return _this.options.onSliderMove && _this.options.onSliderMove(swiper, e);
        };
        setTimeout(function () {
            var swiper = new Swiper(_this.getNativeElement().children[0], options);
            _this.slider = swiper;
        }, 300);
    };
    Slides.prototype.onTap = function (swiper, e) {
    };
    Slides.prototype.onClick = function (swiper, e) {
    };
    Slides.prototype.onDoubleTap = function (swiper, e) {
        this.toggleZoom(swiper, e);
    };
    Slides.prototype.onLazyImageLoad = function (swiper, slide, img) {
    };
    Slides.prototype.onLazyImageReady = function (swiper, slide, img) {
    };
    Slides.prototype.initZoom = function () {
        var _this = this;
        this.zoomDuration = this.zoomDuration || 230;
        this.maxScale = this.zoomMax || 3;
        this.zoomElement = this.getNativeElement().children[0].children[0];
        this.zoomElement && this.zoomElement.classList.add('ion-scroll-zoom');
        this.zoomGesture = new Gesture(this.zoomElement);
        this.zoomGesture.listen();
        this.scale = 1;
        this.zoomLastPosX = 0;
        this.zoomLastPosY = 0;
        var lastScale, zoomRect;
        this.viewportWidth = this.getNativeElement().offsetWidth;
        this.viewportHeight = this.getNativeElement().offsetHeight;
        this.zoomElement.addEventListener('touchstart', function (e) {
            _this.onTouchStart(e);
        });
        this.zoomElement.addEventListener('touchmove', function (e) {
            _this.onTouchMove(e);
        });
        this.zoomElement.addEventListener('touchend', function (e) {
            _this.onTouchEnd(e);
        });
        this.zoomGesture.on('pinchstart', function (e) {
            lastScale = _this.scale;
            (void 0);
        });
        this.zoomGesture.on('pinch', function (e) {
            _this.scale = Math.max(1, Math.min(lastScale * e.scale, 10));
            (void 0);
            _this.zoomElement.style[CSS.transform] = 'scale(' + _this.scale + ')';
            zoomRect = _this.zoomElement.getBoundingClientRect();
        });
        this.zoomGesture.on('pinchend', function () {
            if (_this.scale > _this.maxScale) {
                var za = new Animation(_this.zoomElement)
                    .duration(_this.zoomDuration)
                    .easing('linear')
                    .from('scale', _this.scale)
                    .to('scale', _this.maxScale);
                za.play();
                _this.scale = _this.maxScale;
            }
        });
    };
    Slides.prototype.resetZoom = function () {
        if (this.zoomElement) {
            this.zoomElement.parentElement.style[CSS.transform] = '';
            this.zoomElement.style[CSS.transform] = 'scale(1)';
        }
        this.scale = 1;
        this.zoomLastPosX = 0;
        this.zoomLastPosY = 0;
    };
    Slides.prototype.toggleZoom = function (swiper, e) {
        (void 0);
        if (!this.enableZoom) {
            return;
        }
        (void 0);
        var zi = new Animation(this.touch.target.children[0])
            .duration(this.zoomDuration)
            .easing('linear');
        var za = new Animation();
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
    };
    Slides.prototype.onTransitionStart = function (swiper, e) {
    };
    Slides.prototype.onTransitionEnd = function (swiper, e) {
    };
    Slides.prototype.onTouchStart = function (e) {
        (void 0);
        var target = e.target.closest('.slide').children[0].children[0];
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
    };
    Slides.prototype.onTouchMove = function (e) {
        this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
        this.touch.deltaY = e.touches[0].clientY - this.touch.startY;
        var zoomableScaledWidth = this.touch.zoomableWidth * this.scale;
        var zoomableScaledHeight = this.touch.zoomableHeight * this.scale;
        var x1 = Math.min((this.viewportWidth / 2) - zoomableScaledWidth / 2, 0);
        var x2 = -x1;
        var y1 = Math.min((this.viewportHeight / 2) - zoomableScaledHeight / 2, 0);
        var y2 = -y1;
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
    };
    Slides.prototype.onTouchEnd = function (e) {
        (void 0);
        if (this.scale > 1) {
            if (Math.abs(this.touch.x) > this.viewportWidth) {
                var posX = posX > 0 ? this.viewportWidth - 1 : -(this.viewportWidth - 1);
                (void 0);
            }
            this.touch.lastX = this.touch.x;
            this.touch.lastY = this.touch.y;
        }
    };
    Slides.prototype.update = function () {
        var _this = this;
        setTimeout(function () {
            _this.slider.update();
            if (_this.length() > 10) {
                _this.showPager = false;
            }
        }, 300);
    };
    Slides.prototype.slideTo = function (index, speed, runCallbacks) {
        this.slider.slideTo(index, speed, runCallbacks);
    };
    Slides.prototype.slideNext = function (speed, runCallbacks) {
        this.slider.slideNext(runCallbacks, speed);
    };
    Slides.prototype.slidePrev = function (speed, runCallbacks) {
        this.slider.slidePrev(runCallbacks, speed);
    };
    Slides.prototype.getActiveIndex = function () {
        return this.slider.activeIndex;
    };
    Slides.prototype.getPreviousIndex = function () {
        return this.slider.previousIndex;
    };
    Slides.prototype.length = function () {
        return this.slider.slides.length;
    };
    Slides.prototype.isEnd = function () {
        return this.slider.isEnd;
    };
    Slides.prototype.isBeginning = function () {
        return this.slider.isBeginning;
    };
    Slides.prototype.getSlider = function () {
        return this.slider;
    };
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
    return Slides;
}(Ion));
export var Slide = (function () {
    function Slide(elementRef, slides) {
        this.slides = slides;
        this.ele = elementRef.nativeElement;
        this.ele.classList.add('swiper-slide');
        slides.rapidUpdate();
    }
    Slide.prototype.ngOnDestroy = function () {
        this.slides.rapidUpdate();
    };
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
    return Slide;
}());
export var SlideLazy = (function () {
    function SlideLazy() {
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
    return SlideLazy;
}());
var slidesId = -1;
//# sourceMappingURL=slides.js.map
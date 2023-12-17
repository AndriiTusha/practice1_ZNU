function Slider(slideWrapper, slideList, slideControls, slidesQnt) {

  this.wrapper = slideWrapper;
  this.list = slideList;
  this.controls = slideControls;
  this.slidesNum = slidesQnt;
  this.slidesNumConst = slidesQnt;
  this.slideInt = 3000;

  this.getDOMElements = function () {
    this.sliderWrapper = GET_ENTERPOINT(this.wrapper);
    this.sliderList = GET_ENTERPOINT(this.list);
    this.sliderControl = GET_ENTERPOINT(this.controls);
    this.slides = this.sliderList.children;
    this.sliderList.addEventListener('transitionend', this.trackingTransitionEvent
      .bind(this));
    this.sliderWrapper.addEventListener('mouseenter', this.stopSlider
      .bind(this), true);
    this.sliderWrapper.addEventListener('mouseleave', this.startSlider.bind(
      this));
    this.sliderControl.addEventListener('click', this.trackingClickEvent.bind(
      this), true);
    document.addEventListener('visibilitychange', this.trackingVisibilityEvent
      .bind(this));
    return this;
  }

  this.createClones = function () {
    this.firstClone = this.slides[0].cloneNode(true);
    this.lastClone = this.slides[this.slides.length - 1].cloneNode(true);
    this.firstClone.id = 'first';
    this.lastClone.id = 'last';
    this.sliderList.append(this.firstClone);
    this.sliderList.prepend(this.lastClone);
    this.firstCloneInner = [];
    this.lastCloneInner = [];
    for (let i = 1; i < this.slides.length - 2; i++) {
      this.firstCloneInner.push(this.slides[i].cloneNode(true));
      this.lastCloneInner.push(this.slides[this.slidesNum + 1 - i].cloneNode(
        true));
    }
    this.firstCloneInner.reverse().forEach(item => this.sliderList.prepend(
      item));
    this.lastCloneInner.reverse().forEach(item => this.sliderList.append(
      item));
    this.slideWidth = this.slides[this.slidesNum - 1].offsetWidth;
    this.sliderList.style.transform =
      `translateX(-${this.slidesNum * this.slideWidth}px)`;
    return this;
  }

  this.refreshSlides = function () {
    return this.sliderList.children;
  }

  this.trackingTransitionEvent = function () {
    this.slides = this.refreshSlides();
    if (this.slides[this.slidesNum].id === this.firstClone.id) {
      this.sliderList.style.transition = 'none';
      this.slidesNum = this.slidesNumConst;
      this.sliderList.style.transform =
        `translateX(-${this.slidesNum * this.slideWidth}px)`;
    }

    if (this.slides[this.slidesNum + this.slidesNumConst - 1].id === this
      .lastClone
      .id) {
      this.sliderList.style.transition = 'none';
      this.slidesNum = this.slides.length - this.slidesNumConst;
      this.sliderList.style.transform =
        `translateX(-${this.slidesNum * this.slideWidth}px)`;
    }
  }

  this.slideReverse = function () {
    this.slides = this.refreshSlides();
    if (this.slidesNum >= this.slides.length - this.slidesNumConst) return;
    this.slidesNum++;
    this.sliderList.style.transform =
      `translateX(-${this.slidesNum * this.slideWidth}px)`;
    this.sliderList.style.transition = '.7s';
  }

  this.slideForward = function () {
    this.slides = this.refreshSlides();
    if (this.slidesNum <= 0) return;
    this.slidesNum--;
    this.sliderList.style.transform =
      `translateX(-${this.slidesNum * this.slideWidth}px)`;
    this.sliderList.style.transition = '.7s';
  }

  this.startSlider = function () {
    this.slideId = setInterval(this.slideReverse.bind(this), this.slideInt);
    return this;
  }

  this.stopSlider = function (event) {
    this.target = event.target;
    if (this.target.closest('.portfolio-cards__card')) {
      clearInterval(this.slideId);
    }
  }

  this.trackingClickEvent = function (event) {
    this.target = event.target;
    if (this.target.closest('.portfolio__control_arrows-left')) {
      clearInterval(this.slideId);
      this.slideReverse();
    };
    if (this.target.closest('.portfolio__control_arrows-right')) {
      clearInterval(this.slideId);
      this.slideForward();
    }
  }

  this.trackingVisibilityEvent = function () {
    if (document.visibilityState === 'hidden' && this.slideId) {
      clearInterval(this.slideId);
    } else if (document.visibilityState === 'visible') {
      this.startSlider();
    }
  }
}

function TouchEventsSlider() {
  Slider.apply(this, arguments);
  this.getDOMElements();
  this.createClones();
  this.startSlider();
  this.slidesWrapper = this.getDOMElements().sliderWrapper;

  this.trackingTouchEvent = function () {
    this.x1 = 0;
    this.res = 0;
    this.path = 60;

    this.getStartPoint = function (event) {
      this.x1 = event.changedTouches[0].screenX;
      return this.x1;
    }

    this.calcPath = function (event) {
      clearInterval(this.slideID);
      this.res = event.changedTouches[0].screenX - this.x1;
      if (Math.abs(this.res) > this.path && this.res < 0) {
        this.slideForward();
        this.startSlider();
      }
      if (Math.abs(this.res) > this.path && this.res > 0) {
        this.slideReverse();
        this.startSlider();
      }
    }

    this.slidesWrapper.addEventListener('touchstart', this.getStartPoint.bind(
      this));
    this.slidesWrapper.addEventListener('touchend', this.calcPath.bind(this));
  }
}

function SwipeEventsSlider() {
  Slider.apply(this, arguments);
  this.getDOMElements();
  this.createClones();
  this.startSlider();
  this.slidesWrapper = this.getDOMElements().sliderWrapper;

  this.trackingSwipeEvent = function () {
    this.x1 = 0;
    this.res = 0;
    this.path = 200;

    this.getStartPoint = function (event) {
      clearInterval(this.slideID);
      this.x1 = event.screenX;
      return this.x1;
    }

    this.calcPath = function (event) {
      this.res = event.screenX - this.x1;
      if (Math.abs(this.res) > this.path && this.res < 0) {
        this.slideReverse();
        setTimeout(this.startSlider.bind(this), 7000);
      }
      if (Math.abs(this.res) > this.path && this.res > 0) {
        this.slideForward();
        setTimeout(this.startSlider.bind(this), 7000);
      }
    }

    this.slidesWrapper.addEventListener('mousedown', this.getStartPoint.bind(
      this));
    this.slidesWrapper.addEventListener('mouseup', this.calcPath.bind(this));
  }
}

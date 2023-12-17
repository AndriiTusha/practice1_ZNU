const INIT_SLIDER = () => {
  // slider for testimonials cards
  const divTestimonialsCardsWrapper = GET_ENTERPOINT(
    'divTestimonialsCardsWrapper');
  const divTestimonialsCardsWrapList = GET_ENTERPOINT(
    'divTestimonialsCardsWrapList');
  const divTestimonialsRow = GET_ENTERPOINT('divTestimonialsRow');
  const divTestimonialsCtrlArrowL = GET_ENTERPOINT(
    'divTestimonialsCtrlArrowL');
  const divTestimonialsCtrlArrowR = GET_ENTERPOINT(
    'divTestimonialsCtrlArrowR');


  const slidesWrapper = divTestimonialsCardsWrapper;
  const slidesList = divTestimonialsCardsWrapList;
  const slideInterval = 3000;
  let slides = divTestimonialsCardsWrapList.children,
    slideIndex = 1,
    slideID;
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first";
  lastClone.id = "last";

  slidesList.append(firstClone);
  slidesList.prepend(lastClone);

  const slideWidth = slides[slideIndex].offsetWidth;

  slidesList.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

  const refreshSlides = () => divTestimonialsCardsWrapList.children;

  const slideReverse = () => {
    slides = refreshSlides();
    if (slideIndex >= slides.length - 1) return;
    slidesList.style.transform =
      `translateX(-${slideWidth * slideIndex}px)`;
    slidesList.style.transition = '.75s';
    slideIndex++;
  }

  const slideForward = () => {
    if (slideIndex <= 0) return;
    slideIndex--;
    slidesList.style.transform =
      `translateX(-${slideWidth * slideIndex}px)`;
    slidesList.style.transition = '.7s';
  }

  const startSlider = () => {
    slideID = setInterval(() => {
      slideReverse();
    }, slideInterval)
  };

  slidesList.addEventListener('transitionend', () => {
    slides = refreshSlides();
    if (slides[slideIndex].id === firstClone.id) {
      slidesList.style.transition = 'none';
      slideIndex = 1;
      slidesList.style.transform =
        `translateX(-${slideWidth * slideIndex}px)`;
    }
    if (slides[slideIndex].id === lastClone.id) {
      slidesList.style.transition = 'none';
      slideIndex = slides.length - 2;
      slidesList.style.transform =
        `translateX(-${slideWidth * slideIndex}px)`;
    }
  })

  document.addEventListener("DOMContentLoaded", startSlider);

  divTestimonialsRow.addEventListener('mouseenter', (event) => {
    const target = event.target;
    if (target.closest('.testimonials-cards-wrapper')) {
      clearInterval(slideID);
    }
    if (target.closest('.testimonials__control_arrows-left')) {
      clearInterval(slideID);
    }
    if (target.closest('.testimonials__control_arrows-right')) {
      clearInterval(slideID);
    }
  }, true);

  slidesWrapper.addEventListener('mouseleave', startSlider);
  divTestimonialsCtrlArrowL.addEventListener('mouseleave', startSlider);
  divTestimonialsCtrlArrowR.addEventListener('mouseleave', startSlider);


  divTestimonialsRow.addEventListener('click', function(event) {
    let target = event.target;
    if (target.closest('.testimonials__control_arrows-left')) {
      slideReverse();
    }
    if (target.closest('.testimonials__control_arrows-right')) {
      slideForward();
    }
  });

  let x1 = 0,
    res = 0,
    path = 60;

  slidesWrapper.addEventListener('touchstart', (event) => {
    x1 = event.changedTouches[0].screenX;
  })

  slidesWrapper.addEventListener('touchend', (event) => {
    clearInterval(slideID);
    res = event.changedTouches[0].screenX - x1;
    if (Math.abs(res) > path && res < 0) {
      slideForward();
      startSlider();
    }
    if (Math.abs(res) > path && res > 0) {
      slideReverse();
      startSlider();
    }
  });
}
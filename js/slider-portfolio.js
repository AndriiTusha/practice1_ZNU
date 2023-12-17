const INIT_SLIDER_PORTFOLIO = () => {
  const sliderWrapper = GET_ENTERPOINT('Portfolio-wrapper');
  const sliderList = GET_ENTERPOINT('Portfolio-row');
  const sliderControl = GET_ENTERPOINT('Portfolio-control');
  const slideInt = 3000;

  let slides = sliderList.children,
    slideIndex = 3,
    slideID;
  const firstClone = slides[0].cloneNode(true);
  const firstClone1 = slides[1].cloneNode(true);
  const firstClone2 = slides[2].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  const lastClone1 = slides[slides.length - 2].cloneNode(true);
  const lastClone2 = slides[slides.length - 3].cloneNode(true);

  firstClone.id = "first";
  lastClone.id = "last";

  sliderList.append(firstClone);
  sliderList.append(firstClone1);
  sliderList.append(firstClone2);
  sliderList.prepend(lastClone);
  sliderList.prepend(lastClone1);
  sliderList.prepend(lastClone2);

  const slideWidth = slides[slideIndex].offsetWidth;

  sliderList.style.transform =
    `translateX(-${slideIndex * slideWidth}px)`;

  const refreshSlides = () => sliderList.children;

  const slideReverse = () => {
    slides = refreshSlides();
    if (slideIndex >= slides.length - 1) return;
    slideIndex++;
    sliderList.style.transform =
      `translateX(-${slideWidth * slideIndex}px)`;
    sliderList.style.transition = '.7s';
  }

  const slideForward = () => {
    if (slideIndex <= 0) return;
    slideIndex--;
    sliderList.style.transform =
      `translateX(-${slideWidth * slideIndex}px)`;
    sliderList.style.transition = '.7s';
  }

  const startSlider = () => {
    slideID = setInterval(() => {
      slideReverse();
    }, slideInt)
  };

  sliderList.addEventListener('transitionend', () => {
    slides = refreshSlides();
    if (slides[slideIndex].id === firstClone.id) {
      sliderList.style.transition = 'none';
      slideIndex = 3;
      sliderList.style.transform =
        `translateX(-${slideWidth * slideIndex}px)`;
    }
    if (slides[slideIndex + 2].id === lastClone.id) {
      sliderList.style.transition = 'none';
      slideIndex = slides.length - 3;
      sliderList.style.transform =
        `translateX(-${slideWidth * slideIndex}px)`;
    }
  })

  document.addEventListener("DOMContentLoaded", startSlider);

  sliderWrapper.addEventListener('mouseenter', (event) => {
    const target = event.target;
    if (target.closest('.portfolio-cards__card')) {
      clearInterval(slideID);
    }
  }, true);

  sliderWrapper.addEventListener('mouseleave', startSlider);

  sliderControl.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.portfolio__control_arrows-left')) {
      clearInterval(slideID);
      slideReverse();
    };
    if (target.closest('.portfolio__control_arrows-right')) {
      clearInterval(slideID);
      slideForward();
    }
  }, true);

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && slideID) {
      clearInterval(slideID);
    } else if (document.visibilityState === 'visible') {
      startSlider();
    }
  });

}

// get enter point for header
const main = GET_ENTERPOINT('wrapper');

// create header
main.insertAdjacentHTML('afterbegin',
  '<header class="header fixed-top mx-auto" id="header"><nav class="header__menu navbar navbar-expand-lg navbar-light  sticky-top"><div class="container-custom"><a class="navbar-brand" href="#">BlogWorld</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav ms-auto"><li class="nav-item"><a class="nav-link px-lg-0 active" aria-current="page" href="#">Home</a></li><li class="nav-item"><a class="nav-link px-lg-0" href="#Portfolio">Portfolio</a></li><li class="nav-item"><a class="nav-link px-lg-0" href="blog.html">Pages</a></li><li class="nav-item"><a class="nav-link px-lg-0" href="post.html">Blog</a></li><li class="nav-item"><a class="nav-link px-lg-0" href="#About">About</a></li><li class="nav-item"><a class="nav-link px-lg-0" href="#Contact">Contact</a></li></ul></div></div></nav></header>'
);

// create main content (made for header and about section)
let enterPoint = GET_ENTERPOINT('wrapper');
const dataFromJSON = data.layout;
dataFromJSON.forEach(item => RENDER_PAGE(item));

document.addEventListener('DOMContentLoaded', () => {
  const aboutCardsPoint = GET_ENTERPOINT('cards-wrapper');
  ADD_ELEMENT(aboutCardsPoint, createCardsForAbout());
});

// Latests posts
RENDER_POSTS();

// Section Portfolio
RENDER_PORTFOLIO();
let sliderPortfolio = new TouchEventsSlider('Portfolio-wrapper',
  'Portfolio-row',
  'Portfolio-control', 3);
sliderPortfolio.trackingTouchEvent();


// Section Testimonials
RENDER_TESTIMONIALS();
let sliderTestimonials = new SwipeEventsSlider('divTestimonialsCardsWrapper',
  'divTestimonialsCardsWrapList', 'divTestimonialsCtrlArrowL', 2);
sliderTestimonials.trackingSwipeEvent();

// Section Contact
RENDER_CONTACTS();

function RENDER_PAGE(dataSource) {
  let tag;
  for (let key in dataSource) {
    if (dataSource.hasOwnProperty(key) && key === 'tag') {
      tag = CREATE_ELEMENT(dataSource[key], dataSource.classList,
        dataSource.attribute,
        dataSource.style, dataSource.innerText);
    };
    if (dataSource[key] === 'section') enterPoint = GET_ENTERPOINT('wrapper');
    ADD_ELEMENT(enterPoint, tag);
    if (key === 'children') {
      enterPoint = tag;
      dataSource[key].forEach(item => {
        RENDER_PAGE(item);
      })
    }
  }
}

function createCardsForAbout() {
  const cardsFragment = new DocumentFragment();
  data.about.cards.forEach((item) => {
    const divCard = CREATE_ELEMENT('div', ['about-cards__card',
      'about-cards__card_' +
      item.name
    ]);
    const div = CREATE_ELEMENT('div');
    const img = CREATE_ELEMENT('img', [], [{ 'src': item.img }, { 'alt': 'a - icon' }]);
    const p = CREATE_ELEMENT('p', ['about-cards_text'], [], [], item.text);
    [div, img, p].forEach(item => ADD_ELEMENT(divCard, item));
    ADD_ELEMENT(cardsFragment, divCard);
  });
  return cardsFragment;
};

function RENDER_POSTS() {
  const sectionPost = CREATE_ELEMENT('section', ['post']);

  const divPostContainer = CREATE_ELEMENT('div', ['container-custom',
    'post-container'
  ]);

  const h2Post = CREATE_ELEMENT('h2', ['post-title'], [], [], data.posts.title);

  const divPostDivider = CREATE_ELEMENT('div', ['divider', 'post-divider']);

  const pPost = CREATE_ELEMENT('p', ['post-text'], [], [], data.posts.text);

  const divPostRow = CREATE_ELEMENT('div', ['row', 'w-100', 'post-cards']);

  // need а loop for create postcards
  function createPostForPosts() {
    const postsFragment = new DocumentFragment();
    data.posts.post.forEach((item) => {
      const divPost = CREATE_ELEMENT('div', ['col', 'col-4',
        'post-cards__card'
      ]);

      const imgPost = CREATE_ELEMENT('img', ['post-cards__card_img'], [{
          'src': item
            .img
        },
        { 'alt': item.img }
      ]);

      const divDesc = CREATE_ELEMENT('div', ['post-cards__card_description']);

      const aPost = CREATE_ELEMENT('a', [], [{ 'href': item.posthref }]);

      const h5 = CREATE_ELEMENT('h5', ['post-cards__card_description-title'], [], [],
        item.title);

      const p = CREATE_ELEMENT('p', ['post-cards__card_description-text'], [], [],
        item.text);

      const divDescData = CREATE_ELEMENT('div', [
        'post-cards__card_card-data'
      ]);

      const pDate = CREATE_ELEMENT('p', ['card-data_date'], [], [], item.date);

      const pTime = CREATE_ELEMENT('p', ['card-data_time'], [], [], item.timeToRead);

      const pLike = CREATE_ELEMENT('p', ['card-data_liked']);

      const aLikes = CREATE_ELEMENT('a', [], [{ 'href': item.likehref }]);

      const imgLikes = CREATE_ELEMENT('img', [], [{ 'src': './img/a-icon-comment.svg' },
        { 'alt': 'a-icon-comment' }
      ]);

      ADD_ELEMENT(pLike, aLikes);
      ADD_ELEMENT(aLikes, imgLikes);
      imgLikes.after(
        item.likes);
      [pDate, pTime, pLike].forEach(item => ADD_ELEMENT(divDescData, item));
      ADD_ELEMENT(
        aPost, h5);
      [aPost, p, divDescData].forEach(item => ADD_ELEMENT(divDesc, item));
      [imgPost, divDesc].forEach(item => ADD_ELEMENT(divPost, item));
      ADD_ELEMENT(
        postsFragment, divPost);
    });
    return postsFragment;
  };

  ADD_ELEMENT(main, sectionPost);
  ADD_ELEMENT(sectionPost, divPostContainer);
  [h2Post, divPostDivider, pPost, divPostRow].forEach(item => ADD_ELEMENT(
    divPostContainer, item));
  ADD_ELEMENT(divPostRow, createPostForPosts())
}

function RENDER_PORTFOLIO() {
  const sectionPortfolio = CREATE_ELEMENT('section', ['portfolio'], [{ 'id': 'Portfolio' }]);

  const divPortfolioContainer = CREATE_ELEMENT('div', ['container-custom',
    'portfolio-container'
  ]);

  const h2Portfolio = CREATE_ELEMENT('h2', ['portfolio-title'], [], [], data.portfolio
    .title);

  const divPortfolioDivider = CREATE_ELEMENT('div', ['divider',
    'portfolio-divider'
  ]);

  const pPortfolio = CREATE_ELEMENT('p', ['portfolio-text'], [], [], data.portfolio
    .text);

  const divPortfolioWrapper = CREATE_ELEMENT('div', ['w-100', 'portfolio-cards',
    'pt-0'
  ], [
    { 'id': 'Portfolio-wrapper' }
  ]);
  const divPortfolioRow = CREATE_ELEMENT('div', ['portfolio-cards', 'row',
    'w-100'
  ], [{ 'id': 'Portfolio-row' }]);

  // need а loop for create potfolio cards
  function createCardsForPortfolio() {
    const portfolioCardsFragment = new DocumentFragment();
    data.portfolio.cards.forEach((item, i) => {
      const divPortfolioCard = CREATE_ELEMENT('div', ['col', 'col-4',
        'portfolio-cards__card'
      ]);

      const divPortfolioCardImg = CREATE_ELEMENT('div', [
        'portfolio-cards__card_img',
        `portfolio-cards__card_img${(i + 1)}`
      ], [{ 'style': `background-image: url(${item.img}); border-radius: 5 px; background-size: cover` }]);

      divPortfolioCardImg.addEventListener('mouseover', () =>
        divPortfolioCardImg.style.background = item.imgHover);
      divPortfolioCardImg.addEventListener('mouseout', () =>
        divPortfolioCardImg.style.backgroundImage =
        `url(${item.img})`);

      const divPortfolioCardTxt = CREATE_ELEMENT('div', [
        'portfolio-cards__card_text'
      ]);

      const h3PortfolioCard = CREATE_ELEMENT('h3', [], [], [], item.title);

      const h5PortfolioCard = CREATE_ELEMENT('h5', [], [], [], item.text);

      const divPortfolioCardAdds = CREATE_ELEMENT('div', [
        'portfolio-cards__card_adds'
      ]);

      const imgAddsAtt = CREATE_ELEMENT('img', [], [{ 'src': item.addsAttach },
        { 'alt': item.addsAttach }
      ]);

      const imgAddsSearch = CREATE_ELEMENT('img', [], [{ 'src': item.addsSearch },
        { 'alt': item.addsSearch }
      ]);

      [imgAddsAtt, imgAddsSearch].forEach(item => ADD_ELEMENT(
        divPortfolioCardAdds, item));
      [h3PortfolioCard, h5PortfolioCard].forEach(item => ADD_ELEMENT(
        divPortfolioCardTxt, item));
      [divPortfolioCardTxt, divPortfolioCardAdds].forEach(item =>
        ADD_ELEMENT(divPortfolioCardImg, item));
      ADD_ELEMENT(divPortfolioCard, divPortfolioCardImg);
      ADD_ELEMENT(portfolioCardsFragment, divPortfolioCard);
    });
    return portfolioCardsFragment;
  };

  ADD_ELEMENT(main, sectionPortfolio);
  ADD_ELEMENT(sectionPortfolio, divPortfolioContainer);
  [h2Portfolio, divPortfolioDivider, pPortfolio, divPortfolioWrapper].forEach(
    item =>
    ADD_ELEMENT(divPortfolioContainer, item));
  ADD_ELEMENT(divPortfolioWrapper, divPortfolioRow);
  ADD_ELEMENT(divPortfolioRow, createCardsForPortfolio());

  const divPortfolioCtrl = CREATE_ELEMENT('div', ['row', 'gx-0', 'w-100',
    'portfolio__control'
  ], [{ 'id': 'Portfolio-control' }]);

  const divPortfolioCtrlArrow = CREATE_ELEMENT('div', ['col', 'col-4',
    'mx-auto',
    'portfolio__control_arrows', 'd-flex', 'justify-content-between'
  ]);

  const divPortfolioCtrlArrowL = CREATE_ELEMENT('div', [
    'portfolio__control_arrows-left'
  ]);

  const divPortfolioCtrlArrowLImg = CREATE_ELEMENT('img', [], [{ 'src': './img/a-icon-arrow.svg' },
    { 'alt': './img/a-icon-arrow.svg' }
  ]);

  const divPortfolioCtrlArrowR = CREATE_ELEMENT('div', [
    'portfolio__control_arrows-right'
  ]);

  const divPortfolioCtrlArrowRImg = CREATE_ELEMENT('img', [], [{ 'src': './img/a-icon-arrow.svg' },
    { 'alt': './img/a-icon-arrow.svg' }
  ]);

  const buttonPrimaryPortFolio = CREATE_ELEMENT('button', [
    'portfolio__control_button'
  ], [], [], data.portfolio.btnPrimaryValue);

  ADD_ELEMENT(divPortfolioCtrlArrowL, divPortfolioCtrlArrowLImg);
  ADD_ELEMENT(divPortfolioCtrlArrowR, divPortfolioCtrlArrowRImg);
  [divPortfolioCtrlArrowL, divPortfolioCtrlArrowR].forEach(item => ADD_ELEMENT(
    divPortfolioCtrlArrow, item));
  ADD_ELEMENT(divPortfolioCtrl, divPortfolioCtrlArrow);
  [divPortfolioCtrl, buttonPrimaryPortFolio].forEach(item => ADD_ELEMENT(
    divPortfolioContainer, item));
}

function RENDER_TESTIMONIALS() {
  const sectionTestimonials = CREATE_ELEMENT('section', ['testimonials']);

  const divTestimonialsContainer = CREATE_ELEMENT('div', ['container-custom',
    'testimonials-container'
  ]);

  const h2Testimonials = CREATE_ELEMENT('h2', ['testimonials-title'], [], [],
    data.testimonials.title);

  const divTestimonialsDivider = CREATE_ELEMENT('div', ['divider',
    'testimonials-divider'
  ]);

  const divTestimonialsRow = CREATE_ELEMENT('div', ['row', 'w-100',
    'testimonials-cards',
    'justify-content-center', 'align-items-center'
  ], [{ 'id': 'divTestimonialsRow' }]);

  const divTestimonialsCardsWrapper = CREATE_ELEMENT('div', [
    'testimonials-cards-wrapper'
  ], [{ 'id': 'divTestimonialsCardsWrapper' }]);

  const divTestimonialsCardsWrapList = CREATE_ELEMENT('div', [
    'testimonials-cards-wrapper-list'
  ], [{ 'id': 'divTestimonialsCardsWrapList' }]);

  const divTestimonialsCtrlArrowL = CREATE_ELEMENT('div', [
    'testimonials__control_arrows-left'
  ], [
    { 'id': 'divTestimonialsCtrlArrowL' }
  ]);

  const divTestimonialsCtrlArrowLImg = CREATE_ELEMENT('img', [], [{ 'src': './img/a-icon-arrow.svg' },
    { 'alt': './img/a-icon-arrow.svg' }
  ]);

  // need а loop for create testimonials cards
  const createCardsForTestimonials = () => {
    const testimonialsCardsFragment = new DocumentFragment();
    let arrayOfcards = data.testimonials.cards;
    arrayOfcards.forEach((item, i) => {
      const divTestimonialsCard = CREATE_ELEMENT('div', ['col', 'col-6',
        'px-0',
        'testimonials-cards__card'
      ]);

      const divTestimonialsCardTxt = CREATE_ELEMENT('div', ['col-6',
        'testimonials-cards__card_text', 'text-left'
      ]);

      const blockquote = CREATE_ELEMENT('blockquote');
      blockquote.innerText = item.text;
      const cite = CREATE_ELEMENT('cite');
      const br = CREATE_ELEMENT('br');
      const span = CREATE_ELEMENT('span');
      span.innerText = '"';
      const img = CREATE_ELEMENT('img', ['col-6',
        'testimonials-cards__card_img'
      ], [{
        'src': item
          .img
      }, { 'alt': `user-img${i + 1}` }, { 'draggable': false }]);

      ADD_ELEMENT(divTestimonialsCardTxt, blockquote);
      ADD_ELEMENT(blockquote, cite);
      [item.author, br, item.prof].forEach(item => ADD_ELEMENT(cite, item));
      ADD_ELEMENT(blockquote, span);
      [divTestimonialsCardTxt, img].forEach(item => ADD_ELEMENT(
        divTestimonialsCard, item));
      ADD_ELEMENT(testimonialsCardsFragment, divTestimonialsCard);
    });
    return testimonialsCardsFragment;
  };

  const divTestimonialsCtrlArrowR = CREATE_ELEMENT('div', [
    'testimonials__control_arrows-right'
  ], [{ 'id': 'divTestimonialsCtrlArrowR' }]);

  const divTestimonialsCtrlArrowRImg = CREATE_ELEMENT('img', [], [{ 'src': './img/a-icon-arrow.svg' },
    { 'src': './img/a-icon-arrow.svg' }
  ]);

  ADD_ELEMENT(divTestimonialsCtrlArrowL, divTestimonialsCtrlArrowLImg);
  ADD_ELEMENT(divTestimonialsCtrlArrowR, divTestimonialsCtrlArrowRImg);
  ADD_ELEMENT(main, sectionTestimonials);
  sectionTestimonials.append(divTestimonialsContainer);
  ADD_ELEMENT(sectionTestimonials, divTestimonialsContainer);
  [h2Testimonials, divTestimonialsDivider, divTestimonialsRow].forEach(item =>
    ADD_ELEMENT(divTestimonialsContainer, item));
  [divTestimonialsCtrlArrowL, divTestimonialsCardsWrapper].forEach(item =>
    ADD_ELEMENT(divTestimonialsRow, item));
  ADD_ELEMENT(divTestimonialsCardsWrapper, divTestimonialsCardsWrapList);
  ADD_ELEMENT(divTestimonialsCardsWrapList, createCardsForTestimonials());
  ADD_ELEMENT(divTestimonialsRow, divTestimonialsCtrlArrowR);
}

function RENDER_CONTACTS() {
  const sectionContact = CREATE_ELEMENT('section', ['contact'], [{ 'id': 'Contact' }]);

  const divContactContainer = CREATE_ELEMENT('div', ['container-custom',
    'contact-container'
  ]);

  const h2Contact = CREATE_ELEMENT('h2', ['contact-title'], [], [],
    data.contacts.title);

  const divContactDivider = CREATE_ELEMENT('div', ['divider', 'contact-divider']);

  const pContact = CREATE_ELEMENT('p', ['contact-text'], [], [],
    data.contacts.text);

  [h2Contact, divContactDivider, pContact].forEach(item => ADD_ELEMENT(
    divContactContainer, item));
  divContactContainer.insertAdjacentHTML('beforeend',
    '<div class="contact-social"><a href="https://www.facebook.com/" target="_blank"><img src="./img/a-icon-facebook.svg" alt="a-icon-facebook"></a><a href="https://www.instagram.com/" target="_blank"><img src="./img/a-icon-instagram.svg" alt="a-icon-instagram"></a><a href="https://dribbble.com" target="_blank"><img src="./img/a-icon-dribbble.svg" alt="a-icon-dribbble"></a></div>'
  );
  ADD_ELEMENT(sectionContact, divContactContainer);

  sectionContact.insertAdjacentHTML('beforeend',
    '<div class="container-custom contact-step-container"><h2 class="contact-step-container__title">What will be next step?</h2><div class="col col-4 contact-step-container__text"><div class="contact-step-container__text_title"><div></div><h5>1. We’ll prepare a proposal</h5></div><p>Required scope, timeline and apr. price will be included if you provide us with detail information about a project.</p></div><div class="col col-4 contact-step-container__text"><div class="contact-step-container__text_title"><div></div><h5>2. Together we discuss it</h5></div><p>Let’s get acquainted and discuss all the possible variant and options. Google Hangouts or Skype usually wirks great.</p></div><div class="col col-4 contact-step-container__text"><div class="contact-step-container__text_title"><div class="contact-step-container__text_title-last"></div><h5>3. Let’s start building</h5></div><p>When the contract is signed and all goals are set we can start the first sprint.</p></div><div class="contact-step-container__map"><div class="contact-step-container__map_title d-flex flex-row"><img src="./img/a-icon-mail.svg" alt="a-icon-mail"><p>Write us a few words about your project and we will prepare proposal for you within 24 hours</p></div><div class="contact-step-container__map_container d-flex flex-row justify-content-between"><div class="contact-step-container__map_container-form"><form class="d-flex flex-column"><label for="name" class="form-label">Your name<input class="form-control" type="text" id="name"></label><label for="email" class="form-label">Email<input class="form-control" type="email" id="email"></label><label for="password" class="form-label">Password<span class="form-text"><img src="./img/a-icon-showpass.svg" alt="a-icon-showpass">show</span><input class="form-control" type="password" id="password"></label><button type="submit" class="btn btn-primary">Send message</button></form><p>If you need to have a DNA first, just contact us at <a href="mailto:email@gmail.com"><strong>email@gmail.com</strong></a></p></div><div class="contact-step-container__map_container-map"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60607.02032065183!2d35.10961424462395!3d47.83034812238729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1634715159445!5m2!1sru!2sua" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div></div></div></div>'
  );
  ADD_ELEMENT(main, sectionContact);
}

$('body').popUp({
  text: 'Subscribe to this blog and be the first to know about updates',
  isCancel: false,
  type: 'success',
  isBubble: true
});

// add footer
main.insertAdjacentHTML('beforeend',
  '<footer class="footer fixed-bottom mx-auto"><div class="container-custom footer-container"><div class="footer-social"><a href="https://www.facebook.com/" target="_blank"><img src="./img/a-icon-facebook.svg" alt="a-icon-facebook"></a><a href="https://www.instagram.com/" target="_blank"><img src="./img/a-icon-instagram.svg" alt="a-icon-instagram"></a><a href="https://dribbble.com" target="_blank"><img src="./img/a-icon-dribbble.svg" alt="a-icon-dribbble"></a></div><h4 class="footer-title"><a class="footer-title" href="#header">BlogWorld</a></h4><h5 class="footer-text">©2019 All Rights Reserved.</h5></div></footer>'
);

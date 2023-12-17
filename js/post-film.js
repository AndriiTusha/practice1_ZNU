const wrapper = GET_ENTERPOINT('wrapper');

// create header
wrapper.insertAdjacentHTML('beforebegin',
  '<header class="header header-post fixed-top mx-auto"><nav class="navbar navbar-post navbar-expand-lg navbar-light"><div class="container-custom"><a class="navbar-brand" href="index.html">BlogWorld</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav ms-auto"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="index.html#Portfolio">Portfolio</a></li><li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li><li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Pages</a></li><li class="nav-item"><a class="nav-link" href="index.html#About">About</a></li><li class="nav-item"><a class="nav-link" href="#Contact">Contact</a></li></ul></div></div></nav></header>'
);

// create main content
createAboutSection();
createBlogSection();
createButtonsBlock();


// create section about function
function createAboutSection() {
  const sectionAbout = CREATE_ELEMENT('section');
  const divAboutContainer = CREATE_ELEMENT('div', ['container-custom']);
  const h2About = CREATE_ELEMENT('h2', ['col', 'col-7', 'about-post'], [], [],
    'This is a page with Hometask 18');

  ADD_ELEMENT(wrapper, sectionAbout);
  ADD_ELEMENT(sectionAbout, divAboutContainer);
  ADD_ELEMENT(divAboutContainer, h2About);
}

// create post body function
function createBlogSection() {
  const postContainer = CREATE_ELEMENT('div', ['post', 'container-custom'], [{ 'id': 'postContainer' }]);

  const postArticle = CREATE_ELEMENT('article', ['col', 'col-7', 'current-post'], [
    { 'id': 'postArticle' }
  ]);

  const postContainerCurrentHead = CREATE_ELEMENT('div', [
    'current-post__header'
  ], [{ 'id': 'header-menu' }]);

  const postImgDiv = CREATE_ELEMENT('div', ['current-post__image']);

  const postImg = CREATE_ELEMENT('img', [], [{ 'src': data.post.postImg }, {
    'alt': 'This movie hasn`t poster!'
  }, { 'id': 'main-image' }]);

  ADD_ELEMENT(wrapper, postContainer);
  ADD_ELEMENT(postContainer, postArticle);
  ADD_ELEMENT(postArticle, postContainerCurrentHead);
  ADD_ELEMENT(postImgDiv, postImg);
  ADD_ELEMENT(postArticle, postImgDiv);
}
// create buttons block function
function createButtonsBlock() {
  const postButtonWrapper = CREATE_ELEMENT('div', ['current-post__button']);

  const postButton = CREATE_ELEMENT('button', [
    'current-post__button_secondary-button'
  ], [], [], 'More comments');

  ADD_ELEMENT(postButtonWrapper, postButton);
  const postArticle = GET_ENTERPOINT('postArticle');
  ADD_ELEMENT(postArticle, postButtonWrapper);
}

// get data from API -----
const sortByPopularity = (arr) => arr.sort((a, b) => a[1].length < b[1].length ?
  1 : -1);

async function getFilms() {
  let directorsIdsArr = [];
  const popularMovies = await fetch(TMDB_link + 'movie/popular?' + API_key);
  const popularMoviesResults = await popularMovies.json();

  //console.log(popularMoviesResults.results);

  const detailsRequestsByMovie = popularMoviesResults.results.map((item) =>
    fetch(
      TMDB_link + 'movie/' + item.id + '?' +
      API_key +
      '&append_to_response=credits'));
  // console.log(detailsRequestsByMovie);

  const moviesById = await Promise.all(detailsRequestsByMovie)
    .then(responses => Promise.all(responses.map(data => data.json())))
    .then(films => films.map(item => item.credits.crew))

  //console.log(moviesById);

  for (let items of moviesById) {
    for (let objs of items) {
      if (objs.known_for_department === 'Directing') {
        for (let key in objs) {
          if (objs[key] === 'Director') {
            directorsIdsArr.push(objs.id);
            //  console.log(objs.name, objs.id)
          }
        }
      }
    }
  }

  const moviesByDirectorsIdRequest = directorsIdsArr.map(item => fetch(
    TMDB_link + 'person/' + item + '?' +
    API_key +
    '&append_to_response=credits'));

  const moviesByDirectorsId = await Promise.all(moviesByDirectorsIdRequest);

  const moviesByDirectorsIdResult = await Promise.all(moviesByDirectorsId.map(
      data => data.json()))
    .then(films => {
      return films.map(item => [
        item.name, item.credits.crew
      ])
    })
    .then(result => sortByPopularity(result))

  return moviesByDirectorsIdResult;
}

// --- wrap next code into IIFE ----

(async() => {
  // call getFilms function ---- 
  let filmsData = await getFilms();

  // render accordion items ------

  function renderAccordion(titleItems, listItems, direction, data) {

    const accordion = new DocumentFragment();
    for (let i = 0; i < titleItems; i++) {
      let flag = false;
      let tabNumber, dataNumber;

      const accordionWrapper = CREATE_ELEMENT('div', [
        'menu-accordion__categories-accordion'
      ]);
      const accordionTab = CREATE_ELEMENT('div', [
        'menu-accordion__categories-accordion-tab'
      ]);
      const accordionContent = CREATE_ELEMENT('div', [
        'tab-content'
      ]);
      const accordionUl = CREATE_ELEMENT('ul');
      if (direction === 'horisontal') {
        flag = true;
        tabNumber = titleItems + i;
        accordionHorisontal.style.display = 'flex';
        accordionHorisontal.style.justifyContent = 'space-between';
      };
      const accordionTabTitle = CREATE_ELEMENT('p', ['tab-title',
          'accordion-offset'
        ], [{ 'id': `tab${flag ? tabNumber : i}` }], [],
        data[i][0]);

      for (let j = 0; j < listItems; j++) {
        // dataNumber = listItems + j;
        ADD_ELEMENT(accordionUl, CREATE_ELEMENT('li', [], [{ 'data-list': `${j}` },
            { 'data-src': data[i][1][j].backdrop_path }
          ], [],
          data[i][1][j].title));
      };

      ADD_ELEMENT(accordionContent, accordionUl);
      ADD_ELEMENT(accordionTab, accordionTabTitle);
      ADD_ELEMENT(accordionTab, accordionContent);
      ADD_ELEMENT(accordionWrapper, accordionTab);
      ADD_ELEMENT(accordion, accordionWrapper);
    };
    return accordion;
  };

  const numberOfMainTitles = 3;
  const numberOfSubTitles = 3;

  // render horisontal menu
  const menuHorisontal = GET_ENTERPOINT('header-menu');
  menuHorisontal.insertAdjacentHTML(
    'beforeend',
    '<div class="menu-accordion py-0"><div class="menu-accordion__categories" id="accordion_container__horisontal"></div></div>'
  );
  const accordionHorisontal = GET_ENTERPOINT(
    'accordion_container__horisontal');
  ADD_ELEMENT(accordionHorisontal,
    renderAccordion(numberOfMainTitles,
      numberOfSubTitles, 'horisontal', filmsData));

  // render vertical menu
  const menuVertical = GET_ENTERPOINT('postContainer');
  menuVertical.insertAdjacentHTML(
    'beforeend',
    '<aside class="menu-accordion col col-5"><div class="menu-accordion__categories" id="accordion_container__vertical"></div></aside>'
  );
  const accordionVertical = GET_ENTERPOINT('accordion_container__vertical');
  accordionVertical
    .insertAdjacentHTML('beforebegin',
      '<h2 class="post-aside__categories-title">Categories</h2><hr>');
  ADD_ELEMENT(
    accordionVertical, renderAccordion(numberOfMainTitles,
      numberOfSubTitles, 'vertical', filmsData));

  class Menu {
    constructor(name) {
      this.name = name;
      this.field = null;
    }

    send(message, to) {
      //  this.event = event;
      this.field.send(message, this, to);
    }

    receive(message, from) {
      for (let i = 0; i <= numberOfMainTitles * 2; i++) {
        if (message !== null && message.id ===
          `tab${i + numberOfMainTitles}` &&
          from.name.id === 'accordion_container__horisontal') {

          message.classList.toggle('changeColor');
          message.classList.toggle('changeArrow');
          message.nextElementSibling.classList.toggle('changeDisplay');
          document.getElementById(`tab${i}`).classList.toggle(
            'changeColor');
          document.getElementById(`tab${i}`).classList.toggle(
            'changeArrow');
          document.getElementById(`tab${i}`).nextElementSibling.classList
            .toggle(
              'changeDisplay');
        }

        if (message !== null && message.id === `tab${i}` && from.name.id ===
          'accordion_container__vertical') {
          message.classList.toggle('changeColor');
          message.classList.toggle('changeArrow');
          message.nextElementSibling.classList.toggle('changeDisplay');
          console.log(this.name.children[i].firstElementChild.firstElementChild);
          this.name.children[i].firstElementChild.firstElementChild.classList
            .toggle(
              'changeColor');
          this.name.children[i].firstElementChild.firstElementChild.classList
            .toggle(
              'changeArrow');
          this.name.children[i].firstElementChild.firstElementChild.nextElementSibling
            .classList.toggle('changeDisplay');
        }
      };

      for (let j = 0; j <= numberOfSubTitles; j++) {
        if (message.tagName === 'LI' && message.dataset.list === `${j}`) {
          let subTitlesH = from.name.querySelectorAll('li[data-list]');
          let subTitlesY = this.name.querySelectorAll('li[data-list]');

          for (let k = 0; k < subTitlesH.length; k++) {
            if (subTitlesH[k].classList.contains('changeColorLi')) {
              subTitlesH[k].classList.remove('changeColorLi');
            }
          }
          for (let l = 0; l < subTitlesY.length; l++) {
            if (subTitlesY[l].classList.contains('changeColorLi')) {
              subTitlesY[l].classList.remove('changeColorLi');
            }
          }
          message.classList.toggle('changeColorLi');
          if (from.name.id === 'accordion_container__horisontal') {
            let titleNumberH = +message.parentElement.parentElement.previousSibling
              .id.slice(
                3) - numberOfMainTitles;
            let clickedElemInXMenu = this.name.children[titleNumberH].querySelectorAll(
              'li')[j];
            clickedElemInXMenu.classList.toggle('changeColorLi');
            let posterSrc = 'https://image.tmdb.org/t/p/w500' +
              clickedElemInXMenu
              .getAttribute('data-src');
            GET_ENTERPOINT('main-image').src = posterSrc;
          }

          if (from.name.id === 'accordion_container__vertical') {
            let titleNumberY = +message.parentElement.parentElement.previousSibling
              .id.slice(
                3) + numberOfMainTitles;
            let clickedElemInYMenu = this.name.querySelector(
                `p[id='tab${titleNumberY}']`).nextElementSibling
              .querySelectorAll(
                'li')[j];
            clickedElemInYMenu.classList.toggle('changeColorLi');
            let posterSrc = 'https://image.tmdb.org/t/p/w500' +
              clickedElemInYMenu
              .getAttribute('data-src');
            GET_ENTERPOINT('main-image').src = posterSrc;
          }
        }
      }
    }
  }

  //class Mediator {
  //  constructor() {
  //    this.users = {};
  //  }
  //  register(user) {
  //    this.users[user.name] = user;
  //    user.field = this;
  //  }

  //  send(message, from, to) {
  //    if (to) {
  //      to.receive(message, from)
  //    } else {
  //      Object.keys(this.users).forEach(key => {
  //        if (this.users[key] !== from) {
  //          this.users[key].receive(message, from)
  //        }
  //      })
  //    }
  //  }
  //}

  const menuX = new Menu(accordionHorisontal);
  const menuY = new Menu(accordionVertical);
  const field = new Mediator();

  field.register(menuX);
  field.register(menuY);

  accordionHorisontal.addEventListener('click', (e) => menuX.send(e.target,
    menuY), true);
  accordionVertical.addEventListener('click', (e) => menuY
    .send(e.target,
      menuX), true);

})();


// create footer
wrapper.insertAdjacentHTML('beforeend',
  '<footer class="footer blog-footer post-footer fixed-bottom mx-auto"><div class="container-custom footer-container"><div class="footer-social"><a href="https://www.facebook.com/" target="_blank"><img src="./img/a-icon-facebook.svg" alt="a-icon-facebook"></a><a href="https://www.instagram.com/" target="_blank"><img src="./img/a-icon-instagram.svg" alt="a-icon-instagram"></a><a href="https://dribbble.com" target="_blank"><img src="./img/a-icon-dribbble.svg" alt="a-icon-dribbble"></a></div><h4 class="footer-title">BlogWorld</h4><h5 class="footer-text">©2019 All Rights Reserved.</h5></div></footer>'
);
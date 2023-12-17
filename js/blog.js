// get enter point
const wrapper = GET_ENTERPOINT('wrapper');
let divBlogContainer, searchFormDiv, searchFormDivAuthor, searchFormInputTitle,
  searchFormInputTitleSpan, searchFormInputAuthor, searchFormInputAuthorSpan;

// create header
wrapper.insertAdjacentHTML('beforebegin',
  '<header class="header header-blog fixed-top mx-auto"><nav class="navbar navbar-blog navbar-expand-lg navbar-light"><div class="container-custom"><a class="navbar-brand" href="index.html">BlogWorld</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav ms-auto"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="index.html#Portfolio">Portfolio</a></li><li class="nav-item"><a class="nav-link active" aria-current="page" href="#Blog">Pages</a></li><li class="nav-item"><a class="nav-link" href="post.html">Blog</a></li><li class="nav-item"><a class="nav-link" href="index.html#About">About</a></li><li class="nav-item"><a class="nav-link" href="#Contact">Contact</a></li></ul></div></div></nav></header>'
);

createAboutSection();

createWrapper();

// create about
function createAboutSection() {
  const sectionAbout = CREATE_ELEMENT('section', ['about'], [{ 'id': 'About' }]);
  const divAboutContainer = CREATE_ELEMENT('div', ['container-custom',
    'about-container'
  ]);
  const h2About = CREATE_ELEMENT('h2', ['about-title', 'about-blog-title'], [], [],
    data.blogs.title);
  const divAboutDivider = CREATE_ELEMENT('div', ['divider', 'blog-divider']);
  const searchForm = CREATE_ELEMENT('form', ['blog-search__form'], [{ 'action': 'GET' }]);
  searchFormDiv = CREATE_ELEMENT('div', ['blog-search__input',
    'd-inline-block'
  ]);
  searchFormDivAuthor = CREATE_ELEMENT('div', ['blog-search__input',
    'mt-1', 'd-inline-block'
  ]);
  searchFormInputTitle = CREATE_ELEMENT('input', [], [{ 'type': 'text' },
    { 'name': 'title' },
    { 'value': '' }, { 'placeholder': 'Search by title' }
  ]);
  searchFormInputTitleSpan = CREATE_ELEMENT('span', [
    'blog-search__input-span'
  ]);
  searchFormInputAuthor = CREATE_ELEMENT('input', [], [{ 'type': 'text' },
    { 'name': 'author' },
    { 'value': '' }, { 'placeholder': 'Search by director' }
  ]);
  searchFormInputAuthorSpan = CREATE_ELEMENT('span', [
    'blog-search__input-span'
  ]);

  localStorage.getItem('title') ? searchFormInputTitle.value = localStorage.getItem(
    'title') : '';

  localStorage.getItem('author') ? searchFormInputAuthor.value = localStorage.getItem(
    'author') : '';


  ADD_ELEMENT(wrapper, sectionAbout);
  ADD_ELEMENT(sectionAbout,
    divAboutContainer);
  [h2About, divAboutDivider, searchForm].forEach(item => ADD_ELEMENT(
    divAboutContainer, item));
  ADD_ELEMENT(searchForm, searchFormDiv);
  ADD_ELEMENT(searchForm, searchFormDivAuthor);
  ADD_ELEMENT(
    searchFormDiv, searchFormInputTitle);
  ADD_ELEMENT(searchFormDiv,
    searchFormInputTitleSpan);
  ADD_ELEMENT(
    searchFormDivAuthor, searchFormInputAuthor);
  ADD_ELEMENT(searchFormDivAuthor,
    searchFormInputAuthorSpan);

  addInputValues();
  addListeners();
}

function addInputValues() {
  if (localStorage.getItem('title')) {
    renderCardsByTitle(searchFormInputTitle.value);
  } else if (localStorage.getItem('author')) {
    renderCardsByDirector(searchFormInputAuthor.value)
  } else {
    getData(TMDB_link + 'movie/popular?' + API_key);
  }
}

function renderCardsByTitle(inputValue) {
  getData(TMDB_link + 'search/movie?' + API_key + '&query=' + inputValue);
}

function renderCardsByDirector(inputValue) {
  fetch(TMDB_link + 'search/person?' + API_key + '&query=' +
      inputValue)
    .then(response => response.json())
    .then(data => data.results.forEach(item => {
      if (item.known_for_department === 'Directing') {
        return fetch(TMDB_link + 'person/' + item.id + '?' + API_key +
            '&append_to_response=credits')
          .then(response => response.json())
          .then(data => renderCards(data.credits.cast))
          .then(renderButton)
          .catch(error => console.log('There is an error occurred: ',
            error));
      }
    }));
}

function addListeners() {
  searchFormInputTitle.addEventListener('input', (event) => {
    let inputValue = event.target.value;
    if (!CHK_TITLE(inputValue)) {
      searchFormDiv.classList.remove(
        'border-success');
      searchFormDiv.classList.add(
        'border-danger')
    } else {
      searchFormDiv.classList.remove(
        'border-danger');
      searchFormDiv.classList.add(
        'border-success');
    }
  });

  searchFormInputAuthor.addEventListener('input', (event) => {
    let inputValue = event.target.value;
    if (!CHK_TITLE(inputValue)) {
      searchFormDivAuthor.classList.remove(
        'border-success');
      searchFormDivAuthor.classList.add(
        'border-danger')
    } else {
      searchFormDivAuthor.classList.remove(
        'border-danger');
      searchFormDivAuthor.classList.add(
        'border-success');
    }
  });

  searchFormInputTitle.addEventListener('blur', () => {
    if (searchFormDiv.classList.contains(
        'border-danger') && searchFormInputTitle.value === '') {
      searchFormDiv.classList.remove(
        'border-danger');
      localStorage.removeItem(searchFormInputTitle.name);
      document.location.reload();
    }
  });

  searchFormInputAuthor.addEventListener('blur', () => {
    if (searchFormDivAuthor.classList.contains(
        'border-danger') && searchFormInputAuthor.value === '') {
      searchFormDivAuthor.classList.remove(
        'border-danger');
      localStorage.removeItem(searchFormInputAuthor.name);
      document.location.reload();
    }
  });

  searchFormInputTitleSpan.addEventListener('click', (event) => {
    let inputValue = event.target.previousSibling.value;
    let inputName = event.target.previousSibling.name;
    if (CHK_TITLE(inputValue)) {
      localStorage.setItem(inputName, inputValue);
      while (divBlogContainer.firstChild) {
        divBlogContainer.removeChild(divBlogContainer.firstChild);
      }
      renderCardsByTitle(inputValue);
    } else {
      searchFormDiv.classList.add(
        'border-danger')
    }
  });

  searchFormInputAuthorSpan.addEventListener('click', (event) => {
    let inputValue = event.target.previousSibling.value;
    let inputName = event.target.previousSibling.name;
    if (CHK_TITLE(inputValue)) {
      localStorage.setItem(inputName, inputValue);
      while (divBlogContainer.firstChild) {
        divBlogContainer.removeChild(divBlogContainer.firstChild);
      }
      renderCardsByDirector(inputValue);
    } else {
      searchFormDivAuthor.classList.add(
        'border-danger')
    }
  });
}

function renderCards(dataFromAPI) {
  ADD_ELEMENT(divBlogContainer, new Blog(dataFromAPI, 0).blogRender());
  ADD_ELEMENT(divBlogContainer, new AudioBlog(dataFromAPI, 1).render());
  ADD_ELEMENT(divBlogContainer, new ImgBlog(dataFromAPI, 2).render());
  ADD_ELEMENT(divBlogContainer, new TextBlog(dataFromAPI, 3).render());
}

function createWrapper() {
  const sectionBlog = CREATE_ELEMENT('section', ['blog']);
  divBlogContainer = CREATE_ELEMENT('div', ['container-custom',
    'blog-container'
  ]);
  ADD_ELEMENT(wrapper, sectionBlog);
  ADD_ELEMENT(sectionBlog, divBlogContainer);
}

function renderButton() {
  const button = CREATE_ELEMENT('button', [
    'blog-col-content__button_primary'
  ], [
    { 'type': 'submit' }
  ], [], 'Read more');
  ADD_ELEMENT(divBlogContainer, button);
}

function getData(URL) {

  fetch(URL)
    .then(function (response) {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
      }
      return Promise.resolve(response)
    })
    .then(response => response.json())
    .then(data => renderCards(data.results))
    .then(renderButton)
    .catch(error => console.log('There is an error occurred: ', error));
}

$('body').popUp({
  text: 'Are you sure you want to delete this post',
  isCancel: true,
  type: 'error',
  isBubble: false
});


// create footer
wrapper.insertAdjacentHTML('beforeend',
  '<footer class="footer blog-footer fixed-bottom mx-auto"><div class="container-custom footer-container"><div class="footer-social"><a href="https://www.facebook.com/" target="_blank"><img src="./img/a-icon-facebook.svg" alt="a-icon-facebook"></a><a href="https://www.instagram.com/" target="_blank"><img src="./img/a-icon-instagram.svg" alt="a-icon-instagram"></a><a href="https://dribbble.com" target="_blank"><img src="./img/a-icon-dribbble.svg" alt="a-icon-dribbble"></a></div><h4 class="footer-title">BlogWorld</h4><h5 class="footer-text">©2019 All Rights Reserved.</h5></div></footer>'
);

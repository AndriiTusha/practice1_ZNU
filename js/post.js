const wrapper = GET_ENTERPOINT('wrapper');

// create header
wrapper.insertAdjacentHTML('beforebegin',
  '<header class="header header-post fixed-top mx-auto"><nav class="navbar navbar-post navbar-expand-lg navbar-light"><div class="container-custom"><a class="navbar-brand" href="index.html">BlogWorld</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav ms-auto"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="index.html#Portfolio">Portfolio</a></li><li class="nav-item"><a class="nav-link" href="blog.html">Pages</a></li><li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Blog</a></li><li class="nav-item"><a class="nav-link" href="index.html#About">About</a></li><li class="nav-item"><a class="nav-link" href="#Contact">Contact</a></li></ul></div></div></nav></header>'
);

// create main content
createAboutSection();
createBlogSection();
createReviewsSection();
createButtonsBlock();


// create section about function
function createAboutSection() {
  const sectionAbout = CREATE_ELEMENT('section');
  const divAboutContainer = CREATE_ELEMENT('div', ['container-custom']);
  const h2About = CREATE_ELEMENT('h2', ['col', 'col-7', 'about-post'], [], [],
    data.post.title);

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
  ]);

  const headImg = CREATE_ELEMENT('img', ['current-post__header_image'], [{
      'src': data.post
        .authorImg
    },
    { 'alt': data.post.authorImg }
  ]);

  const headData = CREATE_ELEMENT('div', ['current-post__header_data']);

  const headDatah4 = CREATE_ELEMENT('h4', ['current-post__header_data-author'], [], [],
    data.post.authorName);

  const headDataDetails = CREATE_ELEMENT('div', [
    'current-post__header_data-details'
  ]);

  const pDate = CREATE_ELEMENT('p', ['post-date'], [], [], data.post
    .date);

  const pTime = CREATE_ELEMENT('p', ['post-time'], [], [], data.post.time);

  const pLiked = CREATE_ELEMENT('p', ['post-liked']);

  const likedImg = CREATE_ELEMENT('img', [], [{ 'src': './img/a-icon-comment.svg' },
    { 'src': './img/a-icon-comment.svg' }
  ]);

  const span = CREATE_ELEMENT('span');
  span.innerText = data.post.liked;

  ADD_ELEMENT(headDataDetails, pDate);
  ADD_ELEMENT(headDataDetails, pTime);
  ADD_ELEMENT(pLiked, likedImg);
  ADD_ELEMENT(pLiked, span);
  ADD_ELEMENT(headDataDetails, pLiked);

  for (let i = 0; i < data.post.starFillNum; i++) {
    const starFillImg = CREATE_ELEMENT('img', [], [{ 'src': data.blogs.starFillImg },
      {
        'alt': data.blogs.starFillImg
      }
    ]);

    ADD_ELEMENT(headDataDetails, starFillImg);
  }
  for (let i = 0; i < data.post.starHalfNum; i++) {
    const starHalfImg = CREATE_ELEMENT('img', [], [{ 'src': data.blogs.starHalfImg },
      {
        'alt': data.blogs.starHalfImg
      }
    ]);

    ADD_ELEMENT(headDataDetails, starHalfImg);
  }
  for (let i = 0; i < data.post.starEmptyNum; i++) {
    const starEmptyImg = CREATE_ELEMENT('img', [], [{ 'src': data.blogs.starEmptyImg },
      {
        'alt': data.blogs.starEmptyImg
      }
    ]);

    ADD_ELEMENT(headDataDetails, starEmptyImg);
  }

  const postImgDiv = CREATE_ELEMENT('div', ['current-post__image']);

  const postImg = CREATE_ELEMENT('img', [], [{ 'src': data.post.postImg }, {
    'alt': data.post
      .postImg
  }]);

  ADD_ELEMENT(wrapper, postContainer);
  ADD_ELEMENT(postContainer, postArticle);
  ADD_ELEMENT(postArticle, postContainerCurrentHead);
  ADD_ELEMENT(postContainerCurrentHead, headImg);
  ADD_ELEMENT(postContainerCurrentHead, headData);
  ADD_ELEMENT(headData, headDatah4);
  ADD_ELEMENT(headData, headDataDetails);
  ADD_ELEMENT(postImgDiv, postImg);
  ADD_ELEMENT(postArticle, postImgDiv);

  if (data.post.audio) {
    const audio = CREATE_ELEMENT('audio', ['current-post__audio'], [{ 'controls': 'controls' }]);

    audio.innerHTML =
      '<source src="song.mp3" type="audio/mpeg"><source src="song.ogg" type="audio/ogg">Ваша версия браузера не поддерживает элемент audio.';
    ADD_ELEMENT(postArticle, audio);
  }

  const p1 = CREATE_ELEMENT('p');
  const p2 = CREATE_ELEMENT('p');
  const p3 = CREATE_ELEMENT('p');

  p1.innerText = data.post.p1;
  p2.innerText = data.post.p2;
  p3.innerText = data.post.p3;

  const h2TechnoTrendTitle = CREATE_ELEMENT('h2');
  h2TechnoTrendTitle.innerText = data.post.technoTitle;

  const pTechnoTrend1 = CREATE_ELEMENT('p');
  pTechnoTrend1.innerText = data.post.technoText1;

  const pTechnoTrend2 = CREATE_ELEMENT('p');
  pTechnoTrend2.innerText = data.post.technoText2;

  const pTechnoTrendAside = CREATE_ELEMENT('p');
  pTechnoTrendAside.classList.add('current-post__text_padding');
  pTechnoTrendAside.innerHTML = data.post.technoTextAside;

  const h2IntTrendTitle = CREATE_ELEMENT('h2');
  h2IntTrendTitle.innerText = data.post.interfaceTitle;

  const pIntTrend = CREATE_ELEMENT('p');
  pIntTrend.innerHTML = data.post.interfaceText;

  const postSocial = CREATE_ELEMENT('div', ['current-post__social', 'd-flex',
    'flex-row',
    'justify-content-between', 'align-items-center'
  ]);

  const postSocialLiked = CREATE_ELEMENT('div', ['current-post__social_liked',
    'd-flex',
    'flex-row', 'justify-content-between', 'align-items-center'
  ]);

  const postSocialDiv = CREATE_ELEMENT('div');

  const postSocialLikedP = CREATE_ELEMENT('p');
  postSocialLikedP.innerText = data.post.likes + ' likes';

  const hr = CREATE_ELEMENT('hr');

  const h2Review = CREATE_ELEMENT('h2');
  h2Review.innerText = 'Reviews';

  [p1, p2, p3, hr, h2Review, postSocial, h2TechnoTrendTitle,
    pTechnoTrend1,
    pTechnoTrend2,
    pTechnoTrendAside, h2IntTrendTitle, pIntTrend
  ].forEach(item => ADD_ELEMENT(postArticle, item));
  ADD_ELEMENT(postSocialLiked, postSocialDiv);
  ADD_ELEMENT(postSocialLiked, postSocialLikedP);
  ADD_ELEMENT(postSocial, postSocialLiked);
  postSocial.insertAdjacentHTML('beforeend',
    '<div class="current-post__social_messengers d-flex justify-content-between align-items-center"><a href="https://www.facebook.com/" target="_blank"><img src="./img/a-icon-facebook.svg" alt="a-icon-facebook"></a><a href="https://www.instagram.com/" target="_blank"><img src="./img/a-icon-instagram.svg" alt="a-icon-instagram"></a><a href="https://dribbble.com" target="_blank"><img src="./img/a-icon-dribbble.svg" alt="a-icon-dribbble"></a></div>'
  );
}

// create reviews section function 
function createReviewsSection() {
  const reviewsWrapper = CREATE_ELEMENT('div', ['current-post__reviews']);

  // need loop to create review
  const createReview = () => {
    const reviewFragment = new DocumentFragment();

    data.post.reviews.forEach((item, i) => {
      const reviewWrapper = CREATE_ELEMENT('div', [
        'current-post__reviews-review',
        `current-post__reviews-review_${i + 1}`
      ]);

      const reviewAuthor = CREATE_ELEMENT('div', [
        'current-post__review-author',
        'd-flex',
        'flex-row', 'justify-content-start',
        'align-items-center'
      ]);

      const h4Review = CREATE_ELEMENT('h4');
      h4Review.innerText = item.authorName;
      const reviewAuthorData = CREATE_ELEMENT('div', [
        'current-post__review-author-data',
        'd-flex', 'flex-row', 'justify-content-start',
        'align-items-center'
      ]);

      const reviewPostStars = CREATE_ELEMENT('div', ['post-stars']);

      for (let i = 0; i < item.starFillNum; i++) {
        const starFillImg = CREATE_ELEMENT('img', [], [{
            'src': data.blogs
              .starFillImg
          },
          { 'alt': data.blogs.starFillImg }
        ]);

        ADD_ELEMENT(reviewPostStars, starFillImg);
      }
      for (let i = 0; i < item.starHalfNum; i++) {
        const starHalfImg = CREATE_ELEMENT('img', [], [{
            'src': data.blogs
              .starHalfImg
          },
          { 'alt': data.blogs.starHalfImg }
        ]);

        ADD_ELEMENT(reviewPostStars, starHalfImg);
      }
      for (let i = 0; i < item.starEmptyNum; i++) {
        const starEmptyImg = CREATE_ELEMENT('img', [], [{
            'src': data.blogs
              .starEmptyImg
          },
          { 'alt': data.blogs.starEmptyImg }
        ]);

        ADD_ELEMENT(reviewPostStars, starEmptyImg);
      }

      const pLiked = CREATE_ELEMENT('p', ['post-liked', 'ml-auto']);

      const aLiked = CREATE_ELEMENT('a', [], [{ 'href': '#' }, { 'src': './img/post/a-icon-time.svg' },
        { 'alt': './img/post/a-icon-time.svg' }
      ], [], item.time);

      ADD_ELEMENT(pLiked, aLiked);

      ADD_ELEMENT(reviewAuthorData, reviewPostStars);
      ADD_ELEMENT(reviewAuthorData, pLiked);
      ADD_ELEMENT(reviewAuthor, h4Review);
      ADD_ELEMENT(reviewAuthor, reviewAuthorData);
      ADD_ELEMENT(reviewWrapper, reviewAuthor);

      const pReviewText = CREATE_ELEMENT('p', 'current-post__review-text', [], [],
        item.comment);

      const aReviewLink = CREATE_ELEMENT('a', [
        'current-post__review-link'
      ], [
        { 'href': '#' }
      ]);

      if (item.readMore && item.readMore !== 'none') {
        aReviewLink.innerText = 'Read more';
      } else if (!item.readMore && item.readMore !== 'none') {
        aReviewLink.innerText = 'Read less';
      } else {
        aReviewLink.innerText = '';
      };

      ADD_ELEMENT(reviewWrapper, pReviewText);
      ADD_ELEMENT(reviewWrapper, aReviewLink);
      ADD_ELEMENT(reviewFragment, reviewWrapper);
    });
    return reviewFragment;
  };

  ADD_ELEMENT(reviewsWrapper, createReview());
  const postArticle = GET_ENTERPOINT('postArticle');
  ADD_ELEMENT(postArticle, reviewsWrapper);
}

// create buttons block function
function createButtonsBlock() {
  const postButtonWrapper = CREATE_ELEMENT('div', ['current-post__button']);

  const postButton = CREATE_ELEMENT('button', [
    'current-post__button_secondary-button'
  ], [], [], 'More comments');

  ADD_ELEMENT(postButtonWrapper, postButton);

  ADD_ELEMENT(postArticle, postButtonWrapper);
}

// create aside block
const postContainer = GET_ENTERPOINT('postContainer');
postContainer.insertAdjacentHTML(
  'beforeend',
  '<aside class="col col-5 post-aside"><div class="post-aside__latest"><h2 class="post-aside__latest-title">Latest posts</h2><hr><div class="post-aside__latest-container d-flex flex-row justify-content-center align-items-start"><img src="img/post/Latest_post_img1.png" alt="Latest_post_img1" class="post-aside__latest-container-img d-block"><div class="post-aside__latest-container-data"><h4 class="post-aside__latest-container-data-title">Much cure inappropriate could this restrictions …</h4><div class="post-aside__latest-container-data-details d-flex flex-row justify-content-start align-items-center"><p class="post-date">20 oct, 2019</p><p class="post-time">10 min read</p><p class="post-liked"><img src="./img/a-icon-comment.svg" alt="a-icon-iconset"><span>11</span></p></div></div></div><div class="post-aside__latest-container d-flex flex-row justify-content-center align-items-start"><img src="img/post/Latest_post_img2.png" alt="Latest_post_img2" class="post-aside__latest-container-img d-block"><div class="post-aside__latest-container-data"><h4 class="post-aside__latest-container-data-title">Much cure inappropriate could this restrictions …</h4><div class="post-aside__latest-container-data-details d-flex flex-row justify-content-start align-items-center"><p class="post-date">20 oct, 2019</p><p class="post-time">10 min read</p><p class="post-liked"><img src="./img/a-icon-comment.svg" alt="a-icon-iconset"><span>11</span></p></div></div></div><div class="post-aside__latest-button w-100 d-flex flex-row justify-content-end"><button>More posts</button></div></div><div class="post-aside__categories"><h2 class="post-aside__categories-title">Categories</h2><hr><div class="post-aside__categories-accordion"><div class="post-aside__categories-accordion-tab"><input type="checkbox" id="tab1" name="tab-group"><label for="tab1" class="tab-title accordion-offset">Restaurant food (3)</label><div class="tab-content"><ul><li>Food 1</li><li>Food 2</li><li>Food 3</li></ul></div></div></div><div class="post-aside__categories-accordion"><div class="post-aside__categories-accordion-tab"><input type="checkbox" id="tab2" name="tab-group"><label for="tab2" class="tab-title">Travel news (3)</label><div class="tab-content"><ul><li>Hiking</li><li>Bicycle trip</li><li>Mountains trip</li></ul></div></div></div><div class="post-aside__categories-accordion"><div class="post-aside__categories-accordion-tab"><input type="checkbox" id="tab3" name="tab-group"><label for="tab3" class="tab-title">Modern technology (6)</label><div class="tab-content"><ul><li>Tech 1</li><li>Tech 2p</li><li>Tech 3</li></ul></div></div></div><div class="post-aside__categories-accordion"><div class="post-aside__categories-accordion-tab"><input type="checkbox" id="tab4" name="tab-group"><label for="tab4" class="tab-title pt-0">Product (4)</label><div class="tab-content"><ul><li>Product 1</li><li>Product 2</li><li>Product 4</li></ul></div></div></div><div class="post-aside__categories-accordion"><div class="post-aside__categories-accordion-tab"><input type="checkbox" id="tab5" name="tab-group"><label for="tab5" class="tab-title pt-0">Inspiration (2)</label><div class="tab-content"><ul><li>Insp 1</li><li>Insp 2</li><li>Insp 3</li></ul></div></div></div></div><div class="post-aside__tags"><h2 class="post-aside__tags-title">Tags</h2><hr><div class="post-aside__tags-buttons-container"><button class="post-aside__tags-button">Love</button><button class="post-aside__tags-button">Signs</button><button class="post-aside__tags-button">Waterfall</button><button class="post-aside__tags-button">Inspiration</button><button class="post-aside__tags-button">Quotes</button><button class="post-aside__tags-button">Sea</button><button class="post-aside__tags-button">Sense</button><button class="post-aside__tags-button">Coffee</button><button class="post-aside__tags-button">Gold</button><button class="post-aside__tags-button">Images</button><button class="post-aside__tags-button">Courage</button><button class="post-aside__tags-button">Dancing</button><button class="post-aside__tags-button">Video</button></div></div></aside>'
);

// create footer
wrapper.insertAdjacentHTML('beforeend',
  '<footer class="footer blog-footer post-footer fixed-bottom mx-auto"><div class="container-custom footer-container"><div class="footer-social"><a href="https://www.facebook.com/" target="_blank"><img src="./img/a-icon-facebook.svg" alt="a-icon-facebook"></a><a href="https://www.instagram.com/" target="_blank"><img src="./img/a-icon-instagram.svg" alt="a-icon-instagram"></a><a href="https://dribbble.com" target="_blank"><img src="./img/a-icon-dribbble.svg" alt="a-icon-dribbble"></a></div><h4 class="footer-title">BlogWorld</h4><h5 class="footer-text">©2019 All Rights Reserved.</h5></div></footer>'
);

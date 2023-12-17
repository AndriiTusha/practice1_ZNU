class Blog {
  constructor(jsonData, blogNumber) {
    this.jsonData = jsonData;
    this.blogNumber = blogNumber;
  }

  blogRender() {
    this.blogFragment = new DocumentFragment();

    this.divBlogRow = CREATE_ELEMENT('div', ['blog-row', 'blog-card']);

    this.itemSrc = 'https://image.tmdb.org/t/p/w500' +
      this.jsonData[this.blogNumber].backdrop_path;

    this.divBlogImg = CREATE_ELEMENT('div', ['blog-col-img'], [{ 'style': `background-image:url(${this.itemSrc})` }]);

    this.divBlogIconWrap = CREATE_ELEMENT('div', [
      'blog-col-img-container'
    ]);

    this.icon = CREATE_ELEMENT('img', [], [{ 'src': data.blogs.icon },
      { 'alt': data.blogs.icon }
    ]);

    this.contentBlog = CREATE_ELEMENT('div', ['blog-col-content']);

    this.contentBlogAuthor = CREATE_ELEMENT('div', [
      'blog-col-content__author'
    ]);

    this.authorBlogImg = CREATE_ELEMENT('img', [], [{
        'src': data.blogs
          .authorImg
      },
      {
        'alt': data.blogs.authorImg
      }
    ]);

    this.h4 = CREATE_ELEMENT('h4');
    this.h4.innerText = data.blogs.authorName;

    this.div1 = CREATE_ELEMENT('div');
    this.div2 = CREATE_ELEMENT('div');

    this.contentBlogAuthorData = CREATE_ELEMENT('div', [
      'blog-col-content__author_data'
    ]);

    this.pDate = CREATE_ELEMENT('p', ['card-data_date'], [], [], this.jsonData[
      this.blogNumber].release_date);

    this.pTime = CREATE_ELEMENT('p', ['card-data_time'], [], [],
      'raiting: ' + this.jsonData[this.blogNumber].vote_average);

    this.pLike = CREATE_ELEMENT('p', ['card-data_liked']);

    this.aLikes = CREATE_ELEMENT('a', [], [{ 'href': '#' }]);

    this.imgLikes = CREATE_ELEMENT('img', [], [
      { 'src': './img/a-icon-comment.svg' },
      { 'alt': 'a-icon-comment' }
    ]);

    this.iconMini = CREATE_ELEMENT('img', [], [
      { 'src': data.blogs.iconMini }, {
        'alt': data.blogs.iconMini
      }
    ]);

    this.contentBlogText = CREATE_ELEMENT('div', [
      'blog-col-content__text'
    ]);

    this.h5 = CREATE_ELEMENT('h5', ['blog-title',
      'post-cards__card_description-title'
    ], [], [], this.jsonData[this.blogNumber].original_title);

    this.p = CREATE_ELEMENT('p', ['blog-text',
      'post-cards__card_description-text'
    ], [], [], this.jsonData[this.blogNumber].overview);

    this.buttonRead = CREATE_ELEMENT('button', [
      'blog-col-content__button_secondary'
    ], [], [], 'Read more');
    this.buttonDelete = CREATE_ELEMENT('button', [
      'blog-col-content__button_secondary', 'delete', 'mx-2'
    ], [], [], 'Delete post');

    ADD_ELEMENT(this.divBlogRow, this.divBlogImg);
    ADD_ELEMENT(this.divBlogImg,
      this.divBlogIconWrap);
    ADD_ELEMENT(this.divBlogIconWrap, this.icon);
    ADD_ELEMENT(
      this.divBlogRow, this.contentBlog);
    ADD_ELEMENT(this.contentBlog,
      this.contentBlogAuthor);
    ADD_ELEMENT(this.contentBlogAuthor, this.authorBlogImg);
    ADD_ELEMENT(
      this.contentBlogAuthor, this.div1);
    ADD_ELEMENT(this.div1, this.h4);
    ADD_ELEMENT(this.div1,
      this.contentBlogAuthorData);
    ADD_ELEMENT(this.contentBlogAuthorData, this.pDate);
    ADD_ELEMENT(
      this.contentBlogAuthorData, this.pTime);
    ADD_ELEMENT(this.contentBlogAuthorData,
      this.pLike);
    ADD_ELEMENT(this.pLike, this.aLikes);
    ADD_ELEMENT(this.aLikes, this.imgLikes);
    this.imgLikes
      .after(this.jsonData[this.blogNumber].vote_count);

    this.maxVoteRate = 10;
    this.starAmmout = 5;
    this.starFillNum = this.jsonData[this.blogNumber].vote_average / this.maxVoteRate *
      this.starAmmout;
    this.starFillNumCeil = Math.ceil(this.starFillNum);
    this.starFillNumFloor = Math.floor(this.starFillNum);
    this.starHalfNum = 0;
    (this.starFillNumCeil !== this.starFillNumFloor) ? this.starHalfNum =
      1:
      this.starHalfNum;
    this.starEmptyNum = this.starAmmout - this.starFillNumCeil;

    // renderStars(img, starsAmmount) {
    //    console.log(img, starsAmmount);
    //    for (let i = 0; i < starsAmmount; i++) {
    //      this.img = CREATE_ELEMENT('img', [], [{
    //          'src': data.blogs.img
    //        },
    //        { 'alt': data.blogs.img }
    //      ]);
    //      let contentBlogAuthorData = document.querySelector('.blog-col-content__author_data');
    //      ADD_ELEMENT(contentBlogAuthorData, this.img);
    //    }
    //  }
    // I`ve tried but can`t resolve problem with this function. Error - this.starFillImg is undefined.
    //this.renderStars(this.starFillImg, this.starFillNumFloor);
    //this.renderStars.bind(this.starHalfImg, this.starHalfNum);
    //this.renderStars.bind(this.starEmptyImg, this.starEmptyNum);


    for (let i = 0; i < this.starFillNumFloor; i++) {
      this.starFillImg = CREATE_ELEMENT('img', [], [{
          'src': data.blogs.starFillImg
        },
        { 'alt': data.blogs.starFillImg }
      ]);
      ADD_ELEMENT(this.contentBlogAuthorData, this.starFillImg);
    }

    for (let i = 0; i < this.starHalfNum; i++) {
      this.starHalfImg = CREATE_ELEMENT('img', [], [{
          'src': data.blogs
            .starHalfImg
        },
        { 'alt': data.blogs.starHalfImg }
      ]);
      ADD_ELEMENT(this.contentBlogAuthorData, this.starHalfImg);
    }

    for (let i = 0; i < this.starEmptyNum; i++) {
      this.starEmptyImg = CREATE_ELEMENT('img', [], [{
          'src': data.blogs
            .starEmptyImg
        },
        { 'alt': data.blogs.starEmptyImg }
      ]);
      ADD_ELEMENT(this.contentBlogAuthorData, this.starEmptyImg);
    }

    ADD_ELEMENT(this.contentBlogAuthor, this.div2);
    ADD_ELEMENT(this.div2, this.iconMini);
    ADD_ELEMENT(
      this.contentBlog, this.contentBlogText);
    ADD_ELEMENT(this.contentBlogText, this.h5);
    ADD_ELEMENT(this.contentBlogText, this.p);
    ADD_ELEMENT(this.contentBlog, this.buttonRead);
    ADD_ELEMENT(this.contentBlog, this.buttonDelete);
    ADD_ELEMENT(this.blogFragment, this.divBlogRow);

    return this.blogFragment;
  }
}

class TextBlog extends Blog {
  constructor(jsonData, blogNumber) {
    super(jsonData, blogNumber);
  }
  render() {
    const post = super.blogRender();
    this.contentBlog.classList.add('col', 'col-12');
    this.divBlogImg.style.display = 'none';
    this.divBlogRow.classList.add('row', 'd-flex');
    this.p.classList.add('w-100');
    this.contentBlogText.classList.add('col-11');
    return post;
  }
}

class AudioBlog extends Blog {
  constructor(jsonData, blogNumber) {
    super(jsonData, blogNumber);
  }
  render() {
    const post = super.blogRender();
    this.h5.style.width = '75%';
    this.h5.style.display = 'flex';
    this.h5.style.flexFlow = 'row no-wrap';
    this.h5.style.alignItems = 'center';
    this.h5.style.justifyContent = 'space-between';
    this.h5.insertAdjacentHTML('beforeend',
      '<audio controls="controls" style="margin: 0"><source src="song.mp3" type="audio/mpeg"><source src="song.ogg" type="audio/ogg">Ваша версия браузера не поддерживает элемент audio.</audio>'
    );
    this.icon.style.display = 'none';
    return post;
  }
}

class ImgBlog extends Blog {
  constructor(jsonData, blogNumber) {
    super(jsonData, blogNumber);
  }
  render() {
    const post = super.blogRender();
    this.icon.style.display = 'none';
    return post;
  }
}
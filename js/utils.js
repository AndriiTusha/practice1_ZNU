const GET_ENTERPOINT = (point) => document.getElementById(point);

const CREATE_ELEMENT = (tagName = '', classList = [], attr = [],
  styles = [], textNode = '') => {

  let elem = document.createElement(tagName);

  elem.classList.add(...classList);

  attr.forEach(item => {
    for (let key in item) {
      elem.setAttribute(key, `${item[key]}`)
    };
  });

  styles.forEach(item => {
    for (let key in item) {
      elem.setAttribute(key, `${item[key]}`);
    }
  });

  elem.innerText = textNode;

  return elem;
};

const ADD_ELEMENT = (source, target) => source.append(target);

const CHK_TITLE = (title) => /^[A-Z][0-9A-Za-z\ !\:\-?\.,]{6,60}$/g.test(title);

//const CHK_STORAGE_KEY = (keyName, value) => {
//  (localStorage.getItem(keyName) === null) ? localStorage.setItem(keyName,
//    value): localStorage.getItem(keyName);
//}

const TMDB_link = 'https://api.themoviedb.org/3/';
const API_key = 'api_key=3e5daa24cd3441ee1b3ad8b53da3471c';

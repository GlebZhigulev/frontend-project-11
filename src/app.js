import 'bootstrap/dist/css/bootstrap.min.css';
import  validator  from './utils/validator.js';
import initView from './view/view.js';
import i18next from 'i18next';
import ru from './locale/ru.js';
import fetchData from './utils/fetch.js';
import getData from './utils/parser.js';
import _ from 'lodash';
import axios from 'axios';
import update from './utils/update.js';


export default () => {
const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('#url-input'),
  button: document.querySelector('button[type="submit"]'),
  feedbackContainer: document.querySelector('.feedback'),
  postsContainer: document.querySelector('.posts'),
  feedsContainer: document.querySelector('.feeds'),
  modal: {
    title: document.querySelector('.modal-title'),
    body: document.querySelector('.modal-body'),
    footer: document.querySelector('.modal-footer'),
  }
};

const state = {
  feeds: [],
  form: {
    processState: 'filling',
    isValid: true, 
    error: null,
  },
  posts: [],
  uiState: {
    visitedPosts: new Set(),
    modalId: null,
  }
};

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

const watchedState = initView(state, elements,i18n);

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();

  watchedState.form.processState = 'filling';
  const rssUrl = elements.input.value.trim();
  const existingUrls = watchedState.feeds.map((feed) => feed.rssUrl);

  validator(rssUrl, existingUrls, i18n)
    .then((validUrl) => {
      watchedState.form.error = null;
      watchedState.form.processState = 'processing';
      return fetchData(validUrl);
    })
    .then(({ data }) => {
      const [feed, posts] = getData(data.contents);
      const newFeed = { ...feed, id: _.uniqueId(), rssUrl };
      const newPosts = posts.map((post) => ({
        ...post,
        id: _.uniqueId(),
        feedId: newFeed.id,
      }));

      watchedState.feeds = [newFeed, ...watchedState.feeds];
      watchedState.posts = [...newPosts, ...watchedState.posts];
      watchedState.form.processState = 'success';
      watchedState.form.isValid = true;
    })
    .catch((error) => {
      console.error(error);
      watchedState.form.isValid = error.name !== 'ValidationError';
      if (error.name === 'ValidationError') {
        watchedState.form.error = error.message;
      } else if (error.NotValidRss) {
        watchedState.form.error = 'form.errors.notValidRss';
      } else if (axios.isAxiosError(error)) {
        watchedState.form.error = 'form.errors.networkProblems';
      }
      watchedState.form.processState = 'filling';
    });
});

elements.postsContainer.addEventListener('click', (event) => {
  const targetElement = event.target;
  if (targetElement.closest('a')) {
    const { id } = targetElement.dataset;
    watchedState.uiState.visitedPosts.add(id);
  }
  if (targetElement.closest('button')) {
    const { id } = targetElement.dataset;
    watchedState.uiState.visitedPosts.add(id);
    watchedState.uiState.modalId = id;
  }
});


}

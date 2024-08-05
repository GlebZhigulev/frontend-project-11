import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import axios from 'axios';
import * as yup from 'yup';
import validator from './utils/validator.js';
import initView from './view/view.js';
import fetchData from './utils/fetch.js';
import getData from './utils/parser.js';
import update from './utils/update.js';

const getElements = () => ({
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
  },
});

const getState = () => ({
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
  },
});

const handleFormError = (error, watchedState) => {
  watchedState.form.isValid = error.name !== 'ValidationError';
  if (error.name === 'ValidationError') {
    watchedState.form.error = error.message;
  } else if (error.isInvalidRss) {
    watchedState.form.error = 'form.errors.notValidRss';
  } else if (axios.isAxiosError(error)) {
    watchedState.form.error = 'form.errors.networkProblems';
  }
  watchedState.form.processState = 'filling';
};

const handleFormSubmit = (event, watchedState, elements) => {
  event.preventDefault();

  watchedState.form.processState = 'filling';
  const rssUrl = elements.input.value.trim();
  const urlList = watchedState.feeds.map((feed) => feed.rssUrl);

  validator(rssUrl, urlList, yup)
    .then((validUrl) => {
      watchedState.form.error = null;
      watchedState.form.processState = 'processing';
      return fetchData(validUrl);
    })
    .then(({ data }) => {
      const { feed, posts } = getData(data.contents);
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
      handleFormError(error, watchedState);
    });
};

const handlePostClick = (event, watchedState) => {
  const targetElement = event.target;
  const { id } = targetElement.dataset;

  if (targetElement.closest('a')) {
    watchedState.uiState.visitedPosts.add(id);
  }
  if (targetElement.closest('button')) {
    watchedState.uiState.visitedPosts.add(id);
    watchedState.uiState.modalId = id;
  }
};

const updateTime = 5000;

const init = (i18n) => {
  const elements = getElements();
  const state = getState();

  yup.setLocale({
    string: {
      url: i18n.t('form.errors.notValidUrl'),
    },
    mixed: {
      required: i18n.t('form.errors.required'),
      notOneOf: i18n.t('form.errors.notUniqueUrl'),
    },
  });

  const watchedState = initView(state, elements, i18n);

  elements.form.addEventListener('submit', (event) => handleFormSubmit(event, watchedState, elements));
  elements.postsContainer.addEventListener('click', (event) => handlePostClick(event, watchedState));

  setTimeout(() => update(watchedState), updateTime);
};

export default init;

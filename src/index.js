import 'bootstrap/dist/css/bootstrap.min.css';
import  validator  from './validator';
import initView from './view';

const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('#url-input'),
  button: document.querySelector('button[type="submit"]'),
  feedbackContainer: document.querySelector('.feedback'),
  rssList: document.getElementById('rss-list'),
};

const state = {
  feeds: [],
  form: {
    processState: 'filling',
    isValid: true, 
    error: null,
  },
};

const watchedState = initView(state, elements);

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();

  watchedState.form.processState = 'filling';
  const rssUrl = elements.input.value.trim();

  validator(rssUrl, state.feeds)
    .then(() => {
      watchedState.feeds.push(rssUrl);
      watchedState.form.processState = 'success';
      watchedState.form.isValid = true;
    })
    .catch((error) => {
      console.log(error.name);
      watchedState.form.isValid = error.name !== 'ValidationError';
      if (error.name === 'ValidationError') {
        watchedState.form.error = error.message;
      }
    });
});

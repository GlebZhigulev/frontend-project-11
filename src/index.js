import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import i18next from 'i18next';
import app from './app.js';
import ru from './locale/ru.js';

document.addEventListener('DOMContentLoaded', () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  }).then(() => {
    app(i18n);
  });
});

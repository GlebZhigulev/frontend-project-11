import onChange from 'on-change';
import renderError from './renderErrors';
import renderFeeds from './renderFeeds';
import renderStatus from './renderStatus';
import renderPosts from './renderPosts';
import renderLinks from './renderLinks';
import renderModal from './renderModal';

export default (state, elements, i18n) => onChange(state, (path, value) => {
      console.log('path>>>', path);
      switch (path) {
        case 'feeds':
          renderFeeds(state, elements, i18n);
          break;
        case 'posts':
          renderPosts(state, elements, i18n);
          break;
        case 'form.error':
          renderError(value, elements, i18n);
          break;
        case 'form.isValid':
          if (!value) {
            elements.input.classList.add('is-invalid');
            return;
          }
          elements.input.classList.remove('is-invalid');
          break;
        case 'form.processState':
          renderStatus(value, elements, i18n);
          break;
        case 'uiState.modalId':
          renderModal(elements, state.posts, value);
          break;
        case 'uiState.visitedPosts':
          renderLinks(value, state.posts);
          break;
        default:
          throw new Error(`Unknown path: ${path}`);
      }
    });
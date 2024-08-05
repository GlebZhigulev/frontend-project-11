import onChange from 'on-change';
import renderError from './renderErrors';
import renderStatus from './renderStatus';
import { renderPosts, renderFeeds } from './renderPostAndFeeds';
import renderLinks from './renderLinks';
import renderModal from './renderModal';

export default (state, elements, i18n) => onChange(state, (path, value) => {
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
    case 'uiState.visitedPosts': {
      const currentVisitedID = [...value.values()][value.size - 1];
      renderLinks(currentVisitedID);
      break;
    }
    default:
      throw new Error(`Unknown path: ${path}`);
  }
});

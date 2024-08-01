export default (error, elements, i18n) => {
    elements.feedbackContainer.textContent = '';
    if (error) {
      elements.feedbackContainer.classList.remove('text-success');
      elements.feedbackContainer.classList.add('text-danger');
      elements.feedbackContainer.textContent = i18n.t(error);
    }
  };
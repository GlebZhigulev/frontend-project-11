export default (processState, elements, i18n) => {
  switch (processState) {
    case 'filling':
      elements.input.readOnly = false;
      elements.button.disabled = false;
      break;
    case 'success':
      elements.input.readOnly = false;
      elements.button.disabled = false;
      elements.form.reset();
      elements.form.focus();
      elements.feedbackContainer.classList.remove('text-danger');
      elements.feedbackContainer.classList.add('text-success');
      elements.feedbackContainer.textContent = i18n.t('form.success');
      break;
    case 'processing':
      elements.input.readOnly = true;
      elements.button.disabled = true;
      break;
    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

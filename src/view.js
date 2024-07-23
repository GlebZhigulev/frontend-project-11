import onChange from 'on-change';


    const renderFeeds = (state, elements) => {
      const {rssList } = elements;
      rssList.innerHTML = '';
      state.feeds.forEach((feed) => {
      const li = document.createElement('li');
      li.textContent = feed;
      rssList.appendChild(li);
      });
    };
  
    const renderError = (error, elements) => {
      elements.feedbackContainer.textContent = '';
      if (error) {
        elements.feedbackContainer.classList.remove('text-success');
        elements.feedbackContainer.classList.add('text-danger');
        elements.feedbackContainer.textContent = error;
      }
    };

    const renderStatus = (processState, elements) => {
      switch (processState) {
        case 'filling':
          break;
        case 'success':
          elements.form.reset();
          elements.form.focus();
          elements.feedbackContainer.classList.remove('text-danger');
          elements.feedbackContainer.classList.add('text-success');
          elements.feedbackContainer.textContent = 'url успешно добавлен';
          break;
        default:
          throw new Error(`Unknown process state: ${processState}`);
      }
    };

    export default (state, elements) => onChange(state, (path, value) => {
      console.log('path>>>', path);
      switch (path) {
        case 'feeds':
          renderFeeds(state, elements);
          break;
        case 'form.error':
          renderError(value, elements);
          break;
        case 'form.isValid':
          if (!value) {
            elements.input.classList.add('is-invalid');
            return;
          }
          elements.input.classList.remove('is-invalid');
          break;
        case 'form.processState':
          renderStatus(value, elements);
          break;
        default:
          throw new Error(`Unknown path: ${path}`);
      }
    });
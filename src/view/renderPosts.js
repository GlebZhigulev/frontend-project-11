export default function renderPosts(state, elements, i18n) {
  const { postsContainer } = elements;
  postsContainer.innerHTML = '';

  const createCard = () => {
    const card = document.createElement('div');
    card.classList.add('card', 'border-0');
    return card;
  };

  const createCardBody = () => {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = i18n.t('posts.title');

    cardBody.append(cardTitle);
    return cardBody;
  };

  const createPostList = () => {
    const postList = document.createElement('ul');
    postList.classList.add('list-group', 'border-0', 'rounded-0');
    return postList;
  };

  const createPostItem = (post) => {
    const postItem = document.createElement('li');
    postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const postLink = document.createElement('a');
    const linkClasses = state.uiState.visitedPosts.has(post.id) ? 'fw-normal link-secondary' : 'fw-bold';
    postLink.setAttribute('class', linkClasses);
    postLink.setAttribute('href', post.link);
    postLink.dataset.id = post.id;
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.textContent = post.title;
    postItem.append(postLink);

    const viewButton = document.createElement('button');
    viewButton.setAttribute('type', 'button');
    viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    viewButton.dataset.id = post.id;
    viewButton.dataset.bsToggle = 'modal';
    viewButton.dataset.bsTarget = '#modal';
    viewButton.textContent = i18n.t('posts.button');
    postItem.append(viewButton);

    return postItem;
  };

  const card = createCard();
  card.append(createCardBody());

  const postList = createPostList();
  state.posts.forEach((post) => postList.append(createPostItem(post)));
  card.append(postList);

  postsContainer.prepend(card);
}

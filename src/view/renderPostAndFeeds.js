const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('card', 'border-0');
    return container;
  };
  
  const createHeaderContainer = (titleText) => {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('card-body');
  
    const header = document.createElement('h2');
    header.classList.add('card-title', 'h4');
    header.textContent = titleText;
  
    headerContainer.append(header);
    return headerContainer;
  };
  
  const createList = () => {
    const list = document.createElement('ul');
    list.classList.add('list-group', 'border-0', 'rounded-0');
    return list;
  };
  
  const createFeedItem = (feed) => {
    const feedItem = document.createElement('li');
    feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');
  
    const feedTitle = document.createElement('h3');
    feedTitle.classList.add('h6', 'm-0');
    feedTitle.textContent = feed.title;
    feedItem.append(feedTitle);
  
    const feedDescription = document.createElement('p');
    feedDescription.classList.add('m-0', 'small', 'text-black-50');
    feedDescription.textContent = feed.description;
    feedItem.append(feedDescription);
  
    return feedItem;
  };
  
  const createPostItem = (post, state, i18n) => {
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
  
  export const renderFeeds = (state, elements, i18n) => {
    const { feedsContainer } = elements;
    feedsContainer.innerHTML = '';
  
    const container = createContainer();
    container.append(createHeaderContainer(i18n.t('feeds.title')));
  
    const feedList = createList();
    state.feeds.forEach((feed) => feedList.prepend(createFeedItem(feed)));
    container.append(feedList);
  
    feedsContainer.append(container);
  };
  
  export const renderPosts = (state, elements, i18n) => {
    const { postsContainer } = elements;
    postsContainer.innerHTML = '';
  
    const container = createContainer();
    container.append(createHeaderContainer(i18n.t('posts.title')));
  
    const postList = createList();
    state.posts.forEach((post) => postList.append(createPostItem(post, state, i18n)));
    container.append(postList);
  
    postsContainer.prepend(container);
  };
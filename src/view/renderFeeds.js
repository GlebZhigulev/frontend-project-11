export default function renderFeeds(state, elements, i18n) {
  const { feedsContainer } = elements;
  feedsContainer.innerHTML = '';

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('card', 'border-0');
    return container;
  };

  const createHeaderContainer = () => {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('card-body');

    const header = document.createElement('h2');
    header.classList.add('card-title', 'h4');
    header.textContent = i18n.t('feeds.title');

    headerContainer.append(header);
    return headerContainer;
  };

  const createFeedList = () => {
    const feedList = document.createElement('ul');
    feedList.classList.add('list-group', 'border-0', 'rounded-0');
    return feedList;
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

  const container = createContainer();
  container.append(createHeaderContainer());

  const feedList = createFeedList();
  state.feeds.forEach((feed) => feedList.prepend(createFeedItem(feed)));
  container.append(feedList);

  feedsContainer.append(container);
}

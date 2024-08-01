export default function renderFeeds(state, elements, i18n) {
  const { feedsContainer } = elements;
  feedsContainer.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('card', 'border-0');
  feedsContainer.append(container);

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('card-body');
  container.append(headerContainer);

  const header = document.createElement('h2');
  header.classList.add('card-title', 'h4');
  header.textContent = i18n.t('feeds.title');
  headerContainer.append(header);

  const feedList = document.createElement('ul');
  feedList.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.forEach((feed) => {
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

    feedList.prepend(feedItem);
  });

  container.append(feedList);
}

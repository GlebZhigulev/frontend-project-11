import _ from 'lodash';
import fetchData from './fetch.js';
import parseRss from './parser.js';

function update(state) {
  const { feeds, posts } = state;

  Promise.all(feeds.map(({ rssUrl, id }) => fetchData(rssUrl)
    .then(({ data }) => {
      const [, newPosts] = parseRss(data.contents);
      const existingPosts = posts.filter((post) => post.feedId === id);
      const freshPosts = _.differenceBy(newPosts, existingPosts, 'link');

      if (freshPosts.length > 0) {
        const formattedPosts = freshPosts.map((post) => ({
          ...post,
          id: _.uniqueId(),
          feedId: id,
        }));
        state.posts = [...formattedPosts, ...posts];
      }
    })
    .catch(console.error)))
    .finally(() => setTimeout(() => update(state), 5000));
}

export default update;

import _ from 'lodash';
import fetchData from './fetch.js';
import parseRss from './parser.js';

function update(state) {
  const { feeds, posts } = state;
  const updatePromises = feeds.map(({ url, id }) => {
    return fetchData(url)
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
      .catch(console.error);
  });

  Promise.all(updatePromises)
    .finally(() => setTimeout(() => update(state), 5000));
}

export default update;

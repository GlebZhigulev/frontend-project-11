import 'bootstrap/dist/css/bootstrap.min.css';

document.getElementById('rss-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const rssUrl = document.getElementById('rss-url').value;
  console.log(`RSS URL: ${rssUrl}`);
});
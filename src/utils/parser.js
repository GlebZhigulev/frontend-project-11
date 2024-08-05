export default (xmlData) => {
  const xmlDocument = new DOMParser().parseFromString(xmlData, 'application/xml');

  const errorElement = xmlDocument.querySelector('parsererror');
  if (errorElement) {
    const errorMessage = errorElement.textContent;
    const parsingError = new Error(errorMessage);
    parsingError.isInvalidRss = true;
    throw parsingError;
  }

  const channel = xmlDocument.querySelector('channel');
  const feedInfo = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };

  const items = Array.from(xmlDocument.querySelectorAll('item'));
  const posts = items.map((item) => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));

  return [feedInfo, posts];
};

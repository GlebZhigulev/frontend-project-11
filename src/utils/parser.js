export default function parseRssFeed(xmlData) {
  // Разбираем входной XML в документ
  const xmlDocument = new DOMParser().parseFromString(xmlData, 'application/xml');
  
  // Проверяем на наличие ошибок парсинга
  const errorElement = xmlDocument.querySelector('parsererror');
  if (errorElement) {
    const errorMessage = errorElement.textContent;
    const parsingError = new Error(errorMessage);
    parsingError.isInvalidRss = true;
    throw parsingError;
  }
  
  // Извлекаем информацию о ленте
  const channel = xmlDocument.querySelector('channel');
  const feedInfo = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  };
  
  // Извлекаем посты
  const items = Array.from(xmlDocument.querySelectorAll('item'));
  const posts = items.map(item => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
  }));
  
  // Возвращаем информацию о ленте и постах
  return [feedInfo, posts];
}
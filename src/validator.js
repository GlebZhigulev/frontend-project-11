import * as yup from 'yup';

export default (url, urlList) => {
  const schema = yup
    .string()
    .required()
    .url('Ссылка должна быть валидным URL')
    .notOneOf(urlList,'RSS уже существует');

  return schema.validate(url);
};

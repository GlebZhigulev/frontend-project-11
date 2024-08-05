export default (url, urlList, yup) => {
  const schema = yup
    .string()
    .required()
    .url()
    .notOneOf(urlList);
  return schema.validate(url);
};

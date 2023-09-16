export const getUrlId = (url: string) => {
  const splitedUrl = url.split('/');
  const id = splitedUrl[splitedUrl.length - 2];

  return id;
};

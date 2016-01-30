import Url from 'url';

export default function queryModified(url, queries = {}) {
  const parsedUrl = Url.parse(url, true);
  delete parsedUrl.search;

  Object.keys(queries).forEach(k => {
    parsedUrl.query[k] = queries[k] + '';
  });

  return Url.format(parsedUrl);
}

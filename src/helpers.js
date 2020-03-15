export function formatQueryParams (params) {
  return Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');
}


export function capitalize (str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}


// Take keys in the form 'some-key' and turn them to the form 'Some Key'.
export function deslugify (str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str
    .split('-')
    .map(subStr => capitalize(subStr))
    .join(' ');
}


// Get the ID embedded in URL strings of the form: 'https://pokeapi.co/api/v2/pokemon/1/'
export function extractId (url) {
  if (!url) {
    return url;
  }
  const urlArr = url.split('/');
  const idStr = urlArr[urlArr.length - 2];
  return parseInt(idStr);
}

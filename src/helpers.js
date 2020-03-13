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

export function deslugify (str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str
    .split('-')
    .map(subStr => capitalize(subStr))
    .join(' ');
}

export function getSearchParams(params: {[key: string]: string | number}): string {
  let searchParams = '';

  for (const key in params) {
    searchParams += '&' + key + '=' + encodeURIComponent(params[key]);
  }

  return searchParams;
}

export function getThumbAccount(account: string, characterLength = 5): string {
  let res = '';

  if (typeof account === 'string') {
    res = `${account.slice(0, characterLength)}...${account.slice(-(characterLength - 1))}`;
  }

  return res;
}

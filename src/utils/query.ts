export function createQueryPath(baseUrl: string, params: any) {
  if (!params) {
    return baseUrl;
  }

  const queryString = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      queryString.append(key, params[key]);
    }
  });

  return `${baseUrl}?${queryString.toString()}`;
}

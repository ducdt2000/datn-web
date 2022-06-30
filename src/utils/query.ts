import { URLSearchParams } from 'url';

export function createQueryPath(baseUrl: string, params: any) {
  const searchParams = new URLSearchParams(baseUrl);
  Object.keys(params).forEach((key) => {
    searchParams.append(key, params[key]);
  });

  return searchParams.toString();
}

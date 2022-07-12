import http from '@utils/api/http';

export default class Base<C, U> {
  http = async <T>(
    url: string,
    type: string,
    variables: T | null = null,
    options?: any
  ) => {
    return (http as any)[type](url, variables, options);
  };
  all = async (url: string) => {
    return this.http(url, 'get');
  };

  find = async (url: string) => {
    return this.http(url, 'get');
  };

  create = async (url: string, variables: C) => {
    return this.http<C>(url, 'post', variables);
  };

  update = async (url: string, variables: U) => {
    console.log('thisisinput', variables);

    return this.http<U>(url, 'put', variables);
  };

  delete = async (url: string) => {
    return this.http(url, 'delete');
  };
}

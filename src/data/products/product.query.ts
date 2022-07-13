import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import ProductRepository from '@repositories/product';
import {
  ProductsQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { createQueryPath } from '@utils/query';

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const url = createQueryPath(API_ENDPOINTS.PRODUCTS, params);
  const {
    data: { data, ...rest },
  } = await ProductRepository.all(url);

  return { products: { data }, meta: rest };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) =>
  useQuery<any, Error>([API_ENDPOINTS.PRODUCTS, params], fetchProducts, {
    ...options,
    keepPreviousData: true,
  });

const fetchProduct = async (id: string) => {
  const {
    data: { data },
  } = await ProductRepository.find(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return data;
};

const useProductQuery = (id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTS, id], () =>
    fetchProduct(id)
  );
};

export { useProductsQuery, fetchProducts, useProductQuery, fetchProduct };

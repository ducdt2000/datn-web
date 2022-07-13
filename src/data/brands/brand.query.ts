import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import BrandRepository from '@repositories/brands';
import {
  BrandsQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { createQueryPath } from '@utils/query';

const fetchBrands = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const url = createQueryPath(API_ENDPOINTS.BRANDS, params);

  const {
    data: { data, ...rest },
  } = await BrandRepository.all(url);

  return { brands: { data } };
};

const useBrandsQuery = (params: BrandsQueryOptionsType, options: any = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.BRANDS, params], fetchBrands, {
    ...options,
    keepPreviousData: true,
  });
};

const fetchBrand = async (id: string) => {
  const {
    data: { data },
  } = await BrandRepository.find(`${API_ENDPOINTS.BRANDS}/${id}`);
  return data;
};

const useBrandQuery = (id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.BRANDS, id], () => fetchBrand(id));
};

export { useBrandsQuery, fetchBrands, useBrandQuery, fetchBrand };

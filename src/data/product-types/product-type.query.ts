import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import ProductType from '@repositories/product-type';
import { ProductType as TType } from '@ts-types/generated';

const fetchProductTypes = async () => {
  const url = `${API_ENDPOINTS.PRODUCT_TYPES}`;
  const {
    data: { data, ...rest },
  } = await ProductType.all(url);

  return { productTypes: { data } };
};

const useProductTypesQuery = (options: any = {}) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.PRODUCT_TYPES],
    fetchProductTypes,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

const fetchProductType = async (id: string) => {
  const {
    data: { data },
  } = await ProductType.find(`${API_ENDPOINTS.PRODUCT_TYPES}/${id}`);
  return data;
};

const useProductTypeQuery = (id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCT_TYPES, id], () =>
    fetchProductType(id)
  );
};

export {
  useProductTypesQuery,
  fetchProductTypes,
  useProductTypeQuery,
  fetchProductType,
};

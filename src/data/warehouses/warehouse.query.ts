import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import WarehouseRepository from '@repositories/warehouse';
import {
  WarehousesQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { createQueryPath } from '@utils/query';

const fetchWarehouses = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const url = createQueryPath(API_ENDPOINTS.WAREHOUSE, params);
  const {
    data: { data, ...rest },
  } = await WarehouseRepository.all(url);

  return { warehouses: { data }, meta: rest };
};

const useWarehousesQuery = (
  params: WarehousesQueryOptionsType,
  options: any = {}
) =>
  useQuery<any, Error>([API_ENDPOINTS.WAREHOUSE, params], fetchWarehouses, {
    ...options,
    keepPreviousData: true,
  });

const fetchWarehouse = async (id: string) => {
  const {
    data: { data },
  } = await WarehouseRepository.find(`${API_ENDPOINTS.WAREHOUSE}/${id}`);
  return data;
};

const useWarehouseQuery = (id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.WAREHOUSE, id], () =>
    fetchWarehouse(id)
  );
};

export {
  useWarehousesQuery,
  fetchWarehouses,
  useWarehouseQuery,
  fetchWarehouse,
};

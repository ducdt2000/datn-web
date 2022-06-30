import { useQuery } from 'react-query';
import { API_ENDPOINTS } from './../../utils/api/endpoints';
import { OrderQuery, QueryParamsType } from './../../ts-types/custom.types';
import { createQueryPath } from '@utils/query';
import Order from '@repositories/order';

const fetchOrders = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const path = createQueryPath(API_ENDPOINTS.ORDERS, params);

  const {
    data: { data, ...rest },
  } = await Order.all(path);

  return { orders: { data } };
};

const useOrderQuery = (params: OrderQuery, options: any = {}) => {
  return useQuery<any, Error>([API_ENDPOINTS.ORDERS, params], fetchOrders, {
    ...options,
    keepPreviousData: true,
  });
};

export { useOrderQuery, fetchOrders };

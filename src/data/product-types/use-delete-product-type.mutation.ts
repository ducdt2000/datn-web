import { API_ENDPOINTS } from './../../utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import ProductType from '@repositories/product-type';

export const useDeleteProductTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => ProductType.delete(`${API_ENDPOINTS.PRODUCT_TYPES}/${id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCT_TYPES);
      },
    }
  );
};

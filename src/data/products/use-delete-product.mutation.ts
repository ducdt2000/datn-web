import { API_ENDPOINTS } from '../../utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import ProductRepository from '@repositories/product';

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => ProductRepository.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};

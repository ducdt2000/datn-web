import { API_ENDPOINTS } from '../../utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import BrandRepository from '@repositories/brands';

export const useDeleteBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => BrandRepository.delete(`${API_ENDPOINTS.BRANDS}/${id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.BRANDS);
      },
    }
  );
};

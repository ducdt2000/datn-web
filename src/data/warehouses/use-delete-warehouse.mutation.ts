import { API_ENDPOINTS } from '../../utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import WarehouseRepository from '@repositories/warehouse';

export const useDeleteWarehouseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) =>
      WarehouseRepository.delete(`${API_ENDPOINTS.WAREHOUSE}/${id}`),
    {
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.WAREHOUSE);
      },
    }
  );
};

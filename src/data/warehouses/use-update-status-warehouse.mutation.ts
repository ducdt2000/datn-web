import { API_ENDPOINTS } from '../../utils/api/endpoints';
import { useMutation, useQueryClient } from 'react-query';
import WarehouseRepository from '@repositories/warehouse';
import { toast } from 'react-toastify';

export interface IWarehouseUpdateStatusVariables {
  variables: {
    input: { status: number; id: string };
  };
}

export const useUpdateWarehouseStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ variables }: IWarehouseUpdateStatusVariables) => {
      return WarehouseRepository.archive(
        `${API_ENDPOINTS.WAREHOUSE}/${variables.input.id}/status`,
        { status: variables.input.status }
      );
    },
    {
      onSuccess(data) {
        toast.success(data);
      },
      onError(error: any) {
        toast.error(error?.response?.data?.error?.message);
      },
      onSettled() {
        queryClient.invalidateQueries(API_ENDPOINTS.WAREHOUSE);
      },
    }
  );
};

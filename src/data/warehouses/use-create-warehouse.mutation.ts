import WarehouseRepository from '@repositories/warehouse';
import { ROUTES } from '@utils/routes';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useRouter } from 'next/router';
import { CreateWarehouse } from '@ts-types/generated';
import { useQueryClient, useMutation } from 'react-query';

export interface IWarehouseCreateVariables {
  variables: {
    input: CreateWarehouse;
  };
}

export const useCreateWarehouseMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IWarehouseCreateVariables) => {
      return WarehouseRepository.create(API_ENDPOINTS.WAREHOUSE, input);
    },
    {
      onSuccess: () => {
        router.push(ROUTES.WAREHOUSE);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.WAREHOUSE);
      },
    }
  );
};

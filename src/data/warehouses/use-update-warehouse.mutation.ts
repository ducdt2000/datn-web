import WarehouseRepository from '@repositories/warehouse';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useMutation } from 'react-query';
import { useTranslation } from 'next-i18next';
import { UpdateWarehouse } from '@ts-types/generated';

export interface IWarehouseUpdateVariables {
  variables: {
    id: string;
    input: UpdateWarehouse;
  };
}

export const useUpdateWarehouseMutation = () => {
  const { t } = useTranslation();

  return useMutation(
    async ({ variables: { id, input } }: IWarehouseUpdateVariables) => {
      return WarehouseRepository.update(
        `${API_ENDPOINTS.WAREHOUSE}/${id}`,
        input
      );
    },
    {
      onSuccess: () => {
        toast.success(t('common:successfully-updated'));
      },
      onError: (error: any) => {
        toast.error(
          t(error?.response?.data?.error?.message ?? 'common:update-failed')
        );
      },
    }
  );
};

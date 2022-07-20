import WarehouseRepository from '@repositories/warehouse';
import { useMutation } from 'react-query';
import { WarehouseItemInput } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { toast } from 'react-toastify';

export interface IWarehouseItemVariables {
  variables: {
    id: string;
    input: WarehouseItemInput;
  };
}

export const useCreateWarehouseItemMutation = () => {
  const { t } = useTranslation();

  return useMutation(
    async ({ variables: { id, input } }: IWarehouseItemVariables) => {
      return WarehouseRepository.createItem(
        `${API_ENDPOINTS.WAREHOUSE}/${id}/items`,
        input
      );
    },
    {
      onSuccess: () => {
        toast.success(t('common:successfully-created'));
      },
      onError: (error: any) => {
        toast.error(
          t(error?.response?.data?.error?.message ?? 'common:create-failed')
        );
      },
    }
  );
};

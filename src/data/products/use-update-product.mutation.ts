import ProductRepository from '@repositories/product';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useMutation } from 'react-query';
import { useTranslation } from 'next-i18next';
import { UpdateProductInput } from '@ts-types/generated';

export interface IProductUpdateVariables {
  variables: {
    id: string;
    input: UpdateProductInput;
  };
}

export const useUpdateProductMutation = () => {
  const { t } = useTranslation();

  return useMutation(
    async ({ variables: { id, input } }: IProductUpdateVariables) => {
      return ProductRepository.update(`${API_ENDPOINTS.PRODUCTS}/${id}`, input);
    },
    {
      onSuccess: () => {
        toast.success(t('common:successfully-updated'));
      },
    }
  );
};

import ProductRepository from '@repositories/product';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import { useTranslation } from 'next-i18next';
import { CreateProductInput } from '@ts-types/generated';

export interface IProductUpdateVariables {
  variables: {
    id: string;
    input: CreateProductInput;
  };
}

export const useUpdateProductMutation = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { id, input } }: IProductUpdateVariables) => {
      return ProductRepository.update(`${API_ENDPOINTS.PRODUCTS}/${id}`, input);
    },
    {
      onSuccess: () => {
        //TODO:t
        toast.success(t('common:successfully-updated'));
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};

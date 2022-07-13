import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import { useTranslation } from 'next-i18next';
import { CreateProductTypeInput } from '@ts-types/generated';
import ProductType from '@repositories/product-type';

export interface IProductTypeUpdateVariables {
  variables: {
    id: string;
    input: CreateProductTypeInput;
  };
}

export const useUpdateProductTypeMutation = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { id, input } }: IProductTypeUpdateVariables) =>
      ProductType.update(`${API_ENDPOINTS.PRODUCT_TYPES}/${id}`, input),
    {
      onSuccess: () => {
        //TODO:t
        toast.success(t('common:successfully-updated'));
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCT_TYPES);
      },
    }
  );
};

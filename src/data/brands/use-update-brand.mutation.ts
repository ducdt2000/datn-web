import BrandRepository from '@repositories/brands';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useQueryClient, useMutation } from 'react-query';
import { useTranslation } from 'next-i18next';
import { CreateBrandInput } from '@ts-types/generated';

export interface IBrandUpdateVariables {
  variables: {
    id: string;
    input: CreateBrandInput;
  };
}

export const useUpdateBrandMutation = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation(
    ({ variables: { id, input } }: IBrandUpdateVariables) =>
      BrandRepository.update(`${API_ENDPOINTS.BRANDS}/${id}`, input),
    {
      onSuccess: () => {
        //TODO:t
        toast.success(t('common:successfully-updated'));
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.BRANDS);
      },
    }
  );
};

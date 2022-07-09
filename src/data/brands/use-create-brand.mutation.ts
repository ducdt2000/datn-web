import BrandRepository from '@repositories/brands';
import { ROUTES } from '@utils/routes';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useRouter } from 'next/router';
import { CreateBrandInput } from '@ts-types/generated';
import { useQueryClient, useMutation } from 'react-query';

export interface IBrandCreateVariables {
  variables: {
    input: CreateBrandInput;
  };
}

export const useCreateBrandMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IBrandCreateVariables) =>
      BrandRepository.create(API_ENDPOINTS.BRANDS, input),
    {
      onSuccess: () => {
        router.push(ROUTES.BRANDS);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.BRANDS);
      },
    }
  );
};

import ProductRepository from '@repositories/product';
import { ROUTES } from '@utils/routes';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useRouter } from 'next/router';
import { CreateProductInput } from '@ts-types/generated';
import { useQueryClient, useMutation } from 'react-query';

export interface IProductCreateVariables {
  variables: {
    input: CreateProductInput;
  };
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IProductCreateVariables) => {
      return ProductRepository.create(API_ENDPOINTS.PRODUCTS, input);
    },
    {
      onSuccess: () => {
        router.push(ROUTES.PRODUCTS);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};

import { ROUTES } from '@utils/routes';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { useRouter } from 'next/router';
import { CreateProductTypeInput } from '@ts-types/generated';
import { useQueryClient, useMutation } from 'react-query';
import ProductType from '@repositories/product-type';

export interface IProductTypeCreateVariables {
  variables: {
    input: CreateProductTypeInput;
  };
}

export const useCreateProductTypeMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: IProductTypeCreateVariables) =>
      ProductType.create(API_ENDPOINTS.PRODUCT_TYPES, input),
    {
      onSuccess: () => {
        router.push(ROUTES.PRODUCT_TYPES);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCT_TYPES);
      },
    }
  );
};

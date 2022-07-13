import { yupResolver } from '@hookform/resolvers/yup';
import { ProductType } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { productTypeValidationSchema } from './product-type-validation-schema';
import { useCreateProductTypeMutation } from '@data/product-types/use-create-product-type.mutation';
import { useUpdateProductTypeMutation } from '@data/product-types/use-update-product-type.mutation';
import Input from '@components/ui/input';
import Button from '@components/ui/button';

type FormValues = {
  name?: string | null;
  code?: string | null;
};

type IProps = {
  initialValues?: ProductType | null;
};

export default function ProductTypeForm({ initialValues }: IProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(productTypeValidationSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  const { mutate: createProductType, isLoading: creating } =
    useCreateProductTypeMutation();

  const { mutate: updateProductType, isLoading: updating } =
    useUpdateProductTypeMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name!,
      code: values.code!,
    };

    if (!initialValues) {
      createProductType({
        variables: { input },
      });
    } else {
      updateProductType({ variables: { input, id: initialValues.id } });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          label={t('form:input-label-name')}
          {...register('name')}
          error={t(errors.name?.message!)}
          variant="outline"
          className="mb-5"
          required={true}
        />
        <Input
          label={t('form:input-label-code')}
          {...register('code')}
          error={t(errors.code?.message!)}
          variant="outline"
          className="mb-5"
          required={true}
        />
      </div>
      <div className="mb-4 text-end">
        {
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        }

        <Button loading={creating || updating}>
          {initialValues
            ? t('form:button-label-update-productType')
            : t('form:button-label-add-productType')}
        </Button>
      </div>
    </form>
  );
}

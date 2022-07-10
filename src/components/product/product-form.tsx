import { yupResolver } from '@hookform/resolvers/yup';
import { Product } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { productValidationSchema } from './product-validation-schema';
import { useCreateProductMutation } from '@data/products/use-create-product.mutation';
import { useUpdateProductMutation } from '@data/products/use-update-product.mutation';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import SelectInput from '@components/ui/select-input';
import Label from '@components/ui/label';
import { Asterisk } from '@components/common/asterisk';

type FormValues = {
  name?: string | null;
  slug?: string | null;
  type?: string | null;
};

type IProps = {
  initialValues?: Product | null;
};

export default function ProductForm({ initialValues }: IProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(productValidationSchema),
    defaultValues: {
      ...initialValues,
    },
  });
  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();

  const { mutate: createProduct, isLoading: creating } =
    useCreateProductMutation();

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name!,
      slug: values.slug!,
      type: values.type!,
    };

    if (!initialValues) {
      createProduct({
        variables: { input },
      });
    } else {
      updateProduct({ variables: { input, id: initialValues.id } });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        {/* <Input
          label={t('form:input-label-name')}
          {...register('name')}
          error={t(errors.name?.message!)}
          variant="outline"
          className="mb-5"
          required={true}
        />
        <Input
          label={t('form:input-label-slug')}
          {...register('slug')}
          error={t(errors.slug?.message!)}
          variant="outline"
          className="mb-5"
          required={true}
        />
        <Label>
          {t('form:input-label-type')}
          <Asterisk />
        </Label>
        <SelectInput
          name="type"
          control={control}
          options={productTypeOptions}
          getOptionLabel={(option: any) => option.value}
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
            ? t('form:button-label-update-product')
            : t('form:button-label-add-product')}
        </Button> */}
      </div>
    </form>
  );
}

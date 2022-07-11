import { yupResolver } from '@hookform/resolvers/yup';
import { Product } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { productValidationSchema } from './product-validation-schema';
import { useCreateProductMutation } from '@data/products/use-create-product.mutation';
import { useUpdateProductMutation } from '@data/products/use-update-product.mutation';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import SelectInput from '@components/ui/select-input';
import Label from '@components/ui/label';
import { Asterisk } from '@components/common/asterisk';
import { useBrandsQuery } from '@data/brands/brand.query';
import { useProductTypesQuery } from '@data/product-types/product-type.query';
import ValidationError from '@components/ui/form-validation-error';
import TextArea from '@components/ui/text-area';
import { useState } from 'react';
import FileInput from '@components/ui/file-input';

type FormValues = {
  name?: string | null;
  code?: string | null;
  productTypeId?: string | null;
  description?: string | null;
  brandId?: string | null;
  imageLinks?: [] | null;
  defaultImageLink?: string | null;
  properties?: [] | null;
  slug?: string | null;
  price?: number | null;
};

type IProps = {
  initialValues?: Product | null;
};

function SelectProductType({ control, errors }: { control: any; errors: any }) {
  const { t } = useTranslation();

  const { data: dataProductTypes } = useProductTypesQuery({});

  const productTypeOptions = dataProductTypes?.productTypes?.data?.map(
    (productType: any) => {
      return {
        value: productType.id,
        name: productType.name,
      };
    }
  );

  return (
    <>
      <Label>
        {t('form:input-label-productTypes')}
        <Asterisk />
      </Label>
      <SelectInput
        name="productTypeId"
        control={control}
        options={productTypeOptions}
        getOptionLabel={(option: any) => option.name}
      />
      <ValidationError message={t(errors?.productTypes?.message!)} />
    </>
  );
}

function SelectBrand({ control, errors }: { control: any; errors: any }) {
  const { t } = useTranslation();

  const { data: dataBrands } = useBrandsQuery({});

  const brandOptions = dataBrands?.brands?.data?.map((brand: any) => {
    return {
      value: brand.id,
      name: brand.name,
    };
  });

  return (
    <>
      <Label>
        {t('form:input-label-brands')}
        <Asterisk />
      </Label>
      <SelectInput
        name="brandId"
        control={control}
        options={brandOptions}
        getOptionLabel={(option: any) => option.name}
      />
      <ValidationError message={t(errors.brandId?.message!)} />
    </>
  );
}

export default function ProductForm({ initialValues }: IProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const [price, setPrice] = useState<number>(0);

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
      code: values.code!,
      productTypeId: values.productTypeId!,
      description: values.description!,
      brandId: values.brandId!,
      imageLinks: values.imageLinks!,
      defaultImageLink: values.imageLinks!,
      properties: values.imageLinks!,
      slug: values.slug!,
      price: values.price!,
    };

    if (!initialValues) {
      createProduct({
        // @ts-ignore
        variables: { input },
      });
    } else {
      // @ts-ignore
      updateProduct({ variables: { input, id: initialValues.id } });
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
          label={t('form:input-label-slug')}
          {...register('slug')}
          error={t(errors.slug?.message!)}
          variant="outline"
          className="mb-5"
        />
        <SelectBrand control={control} errors={errors} />
        <br />
        <SelectProductType control={control} errors={errors} />
        <TextArea
          label={t('form:input-label-description')}
          {...register('description')}
          variant="outline"
        />
        <Input
          label={t('form:input-label-price')}
          {...register('price')}
          error={t(errors.price?.message!)}
          variant="outline"
          value={price}
          onChange={(value) => {
            const result = +value.target.value.replace(/\D/g, '');
            setPrice(result);
          }}
        />
        <FileInput name="" control={control} multiple={false} />
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
        </Button>
      </div>
    </form>
  );
}

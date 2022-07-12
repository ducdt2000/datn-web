import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm, useFieldArray } from 'react-hook-form';
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
import Card from '@components/common/card';
import { Product, UpdateProductInput } from '@ts-types/generated';
import _ from 'lodash';
import { getDifferentValue } from '@utils/compare-object';

type FormValues = {
  name?: string | null;
  code?: string | null;
  productTypeId?: string | null;
  description?: string | null;
  brandId?: string | null;
  imageLinks?: [] | null;
  defaultImageLink?: { url: string };
  properties?: any[] | null;
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
    //resolver: yupResolver(productValidationSchema),
    //@ts-ignore
    defaultValues: initialValues ?? { imageLinks: [], properties: [] },
  });
  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();

  const { mutate: createProduct, isLoading: creating } =
    useCreateProductMutation();

  const {
    fields: fieldProperties,
    append,
    remove,
  } = useFieldArray({
    control,
    //@ts-ignore
    name: 'properties',
  });

  const onSubmit = async (values: FormValues) => {
    const input = {
      name: values.name!,
      code: values.code!,
      productTypeId: values.productTypeId!,
      description: values.description!,
      brandId: values.brandId!,
      imageLinks: values.imageLinks!.map((image: any) => image?.url),
      defaultImageLink: values.defaultImageLink?.url,
      properties: values.properties!,
      slug: values.slug!,
      price: values.price!,
    };

    if (!initialValues) {
      createProduct({
        // @ts-ignore
        variables: { input },
      });
    } else {
      const updateInput = getDifferentValue(
        input,
        initialValues
      ) as UpdateProductInput;
      // @ts-ignore
      updateProduct({
        variables: { input: updateInput, id: initialValues.id },
      });
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
          required={true}
          onChange={(value) => {
            const result = +value.target.value.replace(/\D/g, '');
            setPrice(result);
          }}
        />
        <br />
        <Label>
          {t('form:input-label-imageLinks')}
          <Asterisk />
        </Label>
        <FileInput
          {...register('imageLinks')}
          control={control}
          multiple={true}
        />
        <ValidationError message={t(errors.imageLinks?.message!)} />
        <br />
        <Label>
          {t('form:input-label-defaultImage')}
          <Asterisk />
        </Label>
        <FileInput
          {...register('defaultImageLink')}
          control={control}
          multiple={false}
        />
        <ValidationError message={t(errors.defaultImageLink?.message!)} />
        <br />
        <Label>
          {t('form:input-label-properties')}
          <Asterisk />
        </Label>
        <Card>
          {fieldProperties?.map((item, index) => {
            return (
              <Card className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                <Input
                  className="sm:col-span-2"
                  label={t('form:input-label-properties')}
                  key={item?.id}
                  {...register(`properties.${index}.name` as const)}
                  error={t(errors.properties?.message!)}
                  variant="outline"
                />
                <Button
                  className="bg-red-600 text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                  onClick={() => remove(index)}
                  title={t('form:button-label-remove')}
                >
                  {`- ${t('form:button-label-removeProperties')}`}
                </Button>
                <div>
                  <ValueArray
                    className="sm:col-span-2"
                    index={index}
                    control={control}
                    register={register}
                  />
                </div>
              </Card>
            );
          })}
          <Button
            type="button"
            onClick={() => append({ name: '' })}
            className="w-full sm:w-auto"
          >
            {t('form:button-label-add-properties')}
          </Button>
        </Card>
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

const ValueArray = ({
  className,
  index,
  control,
  register,
}: {
  className?: any;
  index: any;
  control: any;
  register: any;
}) => {
  const { t } = useTranslation();

  const {
    fields: fieldValues,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `properties.${index}.values`,
  });

  const result = (
    <div className={className ?? ''}>
      <Button
        type="button"
        onClick={() => appendValue('')}
        className="w-full sm:w-auto"
      >
        {t('form:button-label-add-value')}
      </Button>
      {fieldValues.map((item, indexValue) => {
        return (
          <div className="flex-row">
            <Input
              className="w-1/"
              name={`${index}${indexValue}`}
              key={item.id}
              {...register(`properties.${index}.values.${indexValue}` as const)}
              variant="outline"
            />
            <Button
              className="bg-red-600 text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
              onClick={() => removeValue(indexValue)}
              title={t('form:button-label-remove')}
            >
              -
            </Button>
          </div>
        );
      })}
    </div>
  );

  return result;
};

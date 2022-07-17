import { useModalAction } from '@components/ui/modal/modal.context';
import { useProductsQuery } from '@data/products/product.query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import { siteSettings } from '@settings/site.settings';
import Label from '@components/ui/label';
import { Asterisk } from '@components/common/asterisk';
import SelectInput from '@components/ui/select-input';
import ValidationError from '@components/ui/form-validation-error';
import { useForm } from 'react-hook-form';
import { useCreateWarehouseItemMutation } from '@data/warehouses/use-create-warehouse-item.mutation';
import { toast } from 'react-toastify';
import { components } from 'react-select';
import Button from '@components/ui/button';

type FormValues = {
  product: {
    productId: string;
    name: string;
    code: string;
    description?: string;
    properties: any[];
    price: number;
    amount: number;
  };
};

function SelectProduct({
  control,
  errors,
  setValue,
}: {
  control: any;
  errors: any;
  setValue: any;
}) {
  const { t } = useTranslation();

  const [search, setSearch] = useState<string>();

  const { data: dataProducts, isLoading: productLoading } = useProductsQuery({
    search,
  });

  const [productLabel, setProductLabel] = useState();

  const productOptions = dataProducts?.products?.data?.map((product: any) => {
    return {
      value: product,
      name: product.name,
      label: (
        <div className="grid grid-cols-12">
          <div className="col-span-1">
            <Image
              width={64}
              height={64}
              src={product.imageLink ?? siteSettings?.product?.placeholder}
            />
          </div>
          <div className="col-span-5 flex flex-col">
            <h2>{product?.name}</h2>
            <a>{product?.code}</a>
          </div>
          <div className="col-span-3">
            <h1>{product?.brand?.name}</h1>
            <h1>{product?.productType?.name}</h1>
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <Label>
        {t('form:input-label-product')}
        <Asterisk />
      </Label>
      <SelectInput
        name="product"
        control={control}
        options={productOptions}
        isLoading={productLoading}
        onInputChange={(value: string, actionMeta: any) => {
          console.log('thisisaction', value, actionMeta);
          if (actionMeta.action === 'input-change') {
            setSearch(value);
          }
          if (actionMeta.action === 'menu-close') {
            setSearch(undefined);
          }
          if (actionMeta.action === 'set-value') {
            setValue();
          }
        }}
        formatOptionLabel={(option: any) => option.label}
      />
      <ValidationError message={t(errors?.product?.message!)} />
    </>
  );
}

const WarehouseItem = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { closeModal } = useModalAction();

  const warehouseId = router.query?.id as string;

  const [product, setProduct] = useState<any>({});

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    shouldUnregister: true,
    // resolver: initialValues
    //   ? yupResolver(warehouseUpdateValidationSchema)
    //   : yupResolver(warehouseCreateValidationSchema),
    //@ts-ignore
  });

  const { mutate: createItem, isLoading: creating } =
    useCreateWarehouseItemMutation();

  const onSubmit = async (values: FormValues) => {
    const input = values.product;

    console.log('thisisinput', input);

    createItem(
      { variables: { input, id: warehouseId } },
      {
        onSuccess: (data) => {
          toast.success(t('common:successfully-created'));
        },
        onError: (error: any) => {
          toast.error(t(`${error?.response?.data?.error?.message}`));
        },
      }
    );
  };

  function onProductChange() {
    setProduct(getValues('product'));
  }

  return (
    <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] min-h-[400px] relative z-[51] md:rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="order-2 xl:order-1 col-span-12 sm:col-span-6 xl:col-span-4 3xl:col-span-3">
          <div className="py-8 px-6 bg-white rounded flex flex-col z-10">
            <SelectProduct
              control={control}
              errors={errors}
              setValue={onProductChange}
            />
          </div>
          <div>
            {product?.properties?.map(
              (property: { name: string; values: [] }) => (
                <div>
                  {property.name}: {property.values.join(', ')}
                </div>
              )
            )}
          </div>
        </div>
        <Button loading={creating}>{t('form:button-label-add-product')}</Button>
      </form>
    </article>
  );
};

export default WarehouseItem;

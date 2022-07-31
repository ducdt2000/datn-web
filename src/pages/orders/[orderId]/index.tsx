import Card from '@components/common/card';
import Layout from '@components/layouts/admin';
import Image from 'next/image';
import { Table } from '@components/ui/table';
import ProgressBox from '@components/ui/progress-box/progress-box';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/button';
import ErrorMessage from '@components/ui/error-message';
import { siteSettings } from '@settings/site.settings';
import usePrice from '@utils/use-price';
import { formatAddress } from '@utils/format-address';
import Loader from '@components/ui/loader/loader';
import ValidationError from '@components/ui/form-validation-error';
import { Attachment, ORDER_STATUS } from '@ts-types/generated';
import { useOrderQuery } from '@data/orders/use-order.query';
import { useUpdateOrderMutation } from '@data/orders/use-order-update.mutation';
// import { useOrderStatusesQuery } from '@data/order-status/use-order-statuses.query';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SelectInput from '@components/ui/select-input';
import { useIsRTL } from '@utils/locals';
import { OrderStatusOptions, ORDER_STATUS_NAME } from '@ts-types/custom.types';
import { useState } from 'react';
import { useWarehousesQuery } from '@data/warehouses/warehouse.query';
import Label from '@components/ui/label';
import { Asterisk } from '@components/common/asterisk';
import { CheckMark } from '@components/icons/checkmark';
import { ROUTES } from '@utils/routes';
import dayjs from 'dayjs';
import Badge from '@components/ui/badge/badge';
import Link from '@components/ui/link';

function SelectWarehouse({ control, errors }: { control: any; errors: any }) {
  const { t } = useTranslation();

  const {
    data: warehouseData,
    isLoading: warehouseLoading,
    error: warehouseError,
  } = useWarehousesQuery({});

  const brandOptions = warehouseData?.warehouses?.data?.map((brand: any) => {
    return {
      value: brand.id,
      name: brand.name,
    };
  });

  return (
    <>
      <Label>
        {t('form:input-label-warehouse')}
        <Asterisk />
      </Label>
      <SelectInput
        name="warehouseId"
        control={control}
        options={brandOptions}
        getOptionLabel={(option: any) => option.name}
        isClearable={true}
      />
      <ValidationError message={t(errors?.brandId?.message!)} />
    </>
  );
}

type FormValues = {
  status: any;
};
export default function OrderDetailsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { alignLeft, alignRight } = useIsRTL();

  const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
  const {
    data,
    isLoading: loading,
    error,
  } = useOrderQuery(query.orderId as string);

  console.log('thisisdata', data);

  const [status, setStatus] = useState(data?.status);

  const dataOrder = data;

  const { price: sub_total } = usePrice({ amount: dataOrder?.bill });
  const { price: shipping_charge } = usePrice({
    amount: dataOrder?.delivery_fee ?? 0,
  });
  const { price: tax } = usePrice({ amount: dataOrder?.sales_tax ?? 0 });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { status },
  });

  const ChangeStatus = ({ status }: FormValues) => {
    updateOrder({
      variables: {
        id: data?.id as string,
        input: {
          status: status,
        },
      },
    });
  };
  const { price: subtotal } = usePrice(
    data && {
      amount: data?.order?.amount!,
    }
  );
  const { price: total } = usePrice(
    data && {
      amount: data?.order?.paid_total!,
    }
  );
  const { price: discount } = usePrice(
    data && {
      amount: data?.order?.discount!,
    }
  );
  const { price: delivery_fee } = usePrice(
    data && {
      amount: data?.order?.delivery_fee!,
    }
  );
  const { price: sales_tax } = usePrice(
    data && {
      amount: data?.order?.sales_tax!,
    }
  );
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  const columns = [
    {
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (image: Attachment) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt="alt text"
          layout="fixed"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: t('table:table-item-products'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      render: (name: string, item: any) => (
        <div>
          <span>{name}</span>
          <span className="mx-2">x</span>
          <span className="font-semibold text-heading">
            {item.pivot.order_quantity}
          </span>
        </div>
      ),
    },
    {
      title: t('table:table-item-total'),
      dataIndex: 'price',
      key: 'price',
      align: alignRight,
      render: (_: any, item: any) => {
        const { price } = usePrice({
          amount: parseFloat(item.pivot.subtotal),
        });
        return <span>{price}</span>;
      },
    },
  ];

  return (
    <Card>
      <div className="flex flex-col lg:flex-row items-center">
        <h3 className="text-2xl font-semibold text-heading text-center lg:text-start w-full lg:w-1/3 mb-8 lg:mb-0 whitespace-nowrap">
          {t('form:input-label-order-id')} - {data?.order?.tracking_number}
        </h3>

        <form
          onSubmit={handleSubmit(ChangeStatus)}
          className="flex items-start ms-auto w-full lg:w-2/4"
        >
          <div className="w-full me-5 z-20">
            {data?.status < ORDER_STATUS.PACKING && (
              <SelectWarehouse control={control} errors={errors} />
            )}
            <SelectInput
              name="status"
              isClearable={true}
              control={control}
              getOptionLabel={(option: any) => option.name}
              options={OrderStatusOptions.filter(
                (item) => item.value >= data?.status
              )}
              placeholder={t('form:input-placeholder-order-status')}
            />

            {/* <ValidationError message={t(errors?.order_status?.message)} /> */}
          </div>
          <Button loading={updating}>
            <span className="hidden sm:block">
              {t('form:button-label-change-status')}
            </span>
            <span className="block sm:hidden">
              {t('form:form:button-label-change')}
            </span>
          </Button>
        </form>
      </div>

      <div className="my-5 lg:my-10 flex justify-center items-center">
        {/* <ProgressBox
          // data={orderStatusData?.order_statuses?.data}
          status={data?.order?.status?.serial!}
        /> */}
      </div>

      <div className="mb-10">
        {/* {data?.order ? (
          <Table
            //@ts-ignore
            columns={columns}
            emptyText={t('table:empty-table-data')}
            data={data?.order?.products!}
            rowKey="id"
            scroll={{ x: 300 }}
          />
        ) : (
          <span>{t('common:no-order-found')}</span>
        )} */}

        <div className="p-6 sm:p-8 lg:p-12 max-w-screen-lg w-full mx-auto bg-light rounded border shadow-sm">
          <h2 className="flex flex-col sm:flex-row items-center justify-between text-base font-bold text-heading mb-9 sm:mb-12">
            <span className="mt-5 sm:mt-0 me-auto order-2 sm:order-1">
              <span className="me-4">{t('text-status')} :</span>
              <Badge
                text={ORDER_STATUS_NAME[dataOrder?.status]}
                className="font-normal text-sm whitespace-nowrap"
              />
            </span>
            <Link
              href={ROUTES.DASHBOARD}
              className="inline-flex items-center order-1 sm:order-2 text-accent text-base font-normal underline hover:no-underline hover:text-accent-hover"
            >
              {t('text-back-to-home')}
            </Link>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
              <h3 className="mb-2 text-sm text-heading font-semibold">
                {t('text-order-number')}
              </h3>
              <p className="text-sm  text-body-dark">{dataOrder?.id}</p>
            </div>
            <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
              <h3 className="mb-2 text-sm  text-heading font-semibold">
                {t('text-date')}
              </h3>
              <p className="text-sm text-body-dark">
                {dayjs(dataOrder?.createdAt).format('MMMM D, YYYY')}
              </p>
            </div>
            <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
              <h3 className="mb-2 text-sm  text-heading font-semibold">
                {t('text-total')}
              </h3>
              <p className="text-sm  text-body-dark">{total}</p>
            </div>
            <div className="py-4 px-5 border border-border-200 rounded shadow-sm">
              <h3 className="mb-2 text-sm  text-heading font-semibold">
                {t('text-payment-method')}
              </h3>
              <p className="text-sm text-body-dark">
                {dataOrder?.paymentMethod?.name ?? 'N/A'}
              </p>
            </div>
          </div>
          {/* end of order received  */}

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 lg:pe-3 mb-12 lg:mb-0">
              <h2 className="text-xl font-bold text-heading mb-6">
                {t('text-total-amount')}
              </h2>
              <div>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                    {t('text-sub-total')}
                  </strong>
                  :
                  <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                    {sub_total}
                  </span>
                </p>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                    {t('text-shipping-charge')}
                  </strong>
                  :
                  <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                    {shipping_charge}
                  </span>
                </p>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                    {t('text-tax')}
                  </strong>
                  :<span className="w-7/12 sm:w-8/12 ps-4 text-sm ">{tax}</span>
                </p>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                    {t('text-discount')}
                  </strong>
                  :
                  <span className="w-7/12 sm:w-8/12 ps-4 text-sm ">
                    {discount}
                  </span>
                </p>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-5/12 sm:w-4/12 text-sm  text-heading font-semibold">
                    {t('text-total')}
                  </strong>
                  :
                  <span className="w-7/12 sm:w-8/12 ps-4 text-sm">{total}</span>
                </p>
              </div>
            </div>
            {/* end of total amount */}

            <div className="w-full lg:w-1/2 lg:ps-3">
              <h2 className="text-xl font-bold text-heading mb-6">
                {t('text-order-details')}
              </h2>
              <div>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-4/12 text-sm  text-heading font-semibold">
                    {t('text-total-item')}
                  </strong>
                  :
                  <span className="w-8/12 ps-4 text-sm ">
                    {formatString(dataOrder?.items?.length, t('text-item'))}
                  </span>
                </p>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-4/12 text-sm  text-heading font-semibold">
                    {t('text-deliver-time')}
                  </strong>
                  :
                  <span className="w-8/12 ps-4 text-sm ">
                    {dataOrder?.deliveryTime}
                  </span>
                </p>
                <p className="flex text-body-dark mt-5">
                  <strong className="w-4/12 text-sm text-heading font-semibold">
                    {t('text-shipping-address')}
                  </strong>
                  :
                  <span className="w-8/12 ps-4 text-sm ">
                    {formatAddress(
                      dataOrder?.address,
                      dataOrder?.district,
                      dataOrder?.city
                    )}
                  </span>
                </p>
              </div>
            </div>
            {/* end of order details */}
          </div>
          {dataOrder?.children?.length ? (
            <div>
              <h2 className="text-xl font-bold text-heading mt-12 mb-6">
                {t('text-sub-orders')}
              </h2>
              <div>
                <div className="flex items-start border border-gray-700 rounded p-4 mb-12">
                  <span className="w-4 h-4 px-2 rounded-sm bg-dark flex items-center justify-center me-3 mt-0.5">
                    <CheckMark className="w-2 h-2 text-light flex-shrink-0" />
                  </span>
                  <p className="text-heading text-sm">
                    <span className="font-bold">{t('text-note')}:</span>{' '}
                    {t('message-sub-order')}
                  </p>
                </div>
                {/* {Array.isArray(dataOrder?.children) &&
                  dataOrder?.children.length && (
                    <div className="">
                      <SuborderItems items={dataOrder?.children} />
                    </div>
                  )} */}
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t-4 border-double border-border-200 flex flex-col w-full sm:w-1/2 md:w-1/3 ms-auto px-4 py-4 space-y-2">
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-sub-total')}</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-tax')}</span>
            <span>{sales_tax}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-delivery-fee')}</span>
            <span>{delivery_fee}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-body">
            <span>{t('common:order-discount')}</span>
            <span>{discount}</span>
          </div>
          <div className="flex items-center justify-between text-base text-heading font-semibold">
            <span>{t('common:order-total')}</span>
            <span>{total}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
        <div className="w-full sm:w-1/2 sm:pe-8 mb-10 sm:mb-0">
          <h3 className="text-heading font-semibold mb-3 pb-2 border-b border-border-200">
            {t('common:billing-address')}
          </h3>

          <div className="text-sm text-body flex flex-col items-start space-y-1">
            <span>{data?.order?.customer?.name}</span>
            {data?.order?.billing_address && (
              <span>{formatAddress(data.order.billing_address)}</span>
            )}
            {data?.order?.customer_contact && (
              <span>{data?.order?.customer_contact}</span>
            )}
          </div>
        </div>

        <div className="w-full sm:w-1/2 sm:ps-8">
          <h3 className="text-heading text-start font-semibold sm:text-end mb-3 pb-2 border-b border-border-200">
            {t('common:shipping-address')}
          </h3>

          <div className="text-sm text-body text-start sm:text-end flex flex-col items-start sm:items-end space-y-1">
            <span>{data?.order?.customer?.name}</span>
            {data?.order?.shipping_address && (
              <span>{formatAddress(data.order.shipping_address)}</span>
            )}
            {data?.order?.customer_contact && (
              <span>{data?.order?.customer_contact}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
OrderDetailsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'form', 'table'])),
  },
});

export function formatString(count: number | null | undefined, string: string) {
  if (!count) return `${count} ${string}`;
  return count > 1 ? `${count} ${string}s` : `${count} ${string}`;
}

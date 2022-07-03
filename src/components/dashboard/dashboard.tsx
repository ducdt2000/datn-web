import RecentOrders from '@components/order/recent-orders';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useOrderQuery } from '@data/orders/use-order.query';
import { useTranslation } from 'next-i18next';

export default function Dashboard() {
  const { t } = useTranslation();

  // const {
  //   data: orderData,
  //   isLoading: orderLoading,
  //   error: orderError,
  // } = useOrderQuery({
  //   limit: 10,
  //   offset: 0,
  // });

  const orderLoading = false;
  const orderError = undefined;
  const orderData = { orders: { data: [] } };

  if (orderLoading) {
    return <Loader text={t('common:text-loading')}></Loader>;
  }
  if (orderError) {
    return <ErrorMessage message={orderError?.message}></ErrorMessage>;
  }

  return (
    <>
      <div className="w-full flex flex-wrap mb-6">
        <div className="w-full sm:w-1/2 xl:w-1/2 sm:px-3 sm:pl-0 mb-6 xl:mb-0">
          <RecentOrders
            orders={orderData?.orders?.data}
            title={t('table:recent-order-table-title')}
          />
        </div>
      </div>
    </>
  );
}

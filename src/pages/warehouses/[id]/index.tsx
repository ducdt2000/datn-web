import Card from '@components/common/card';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useWarehouseQuery } from '@data/warehouses/warehouse.query';
import { ORDER_TYPE } from '@ts-types/custom.types';
import { Warehouse, WAREHOUSE_ORDER_BY } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import LinkButton from '@components/ui/link-button';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import WarehouseLogList from '@components/warehouse/warehouse-log-list';
import { useModalAction } from '@components/ui/modal/modal.context';

export default function WarehouseDetailPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState<number>();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { query } = useRouter();

  const warehouseId = query.id as string;

  const { data, isLoading: loading, error } = useWarehouseQuery(warehouseId);

  const { openModal } = useModalAction();

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-3/4 mb-4 xl:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-warehouses')}
          </h1>
        </div>
        <button
          onClick={() => {
            openModal('CREATE_WAREHOUSE_ITEM');
          }}
          className="h-12 md:ms-6 w-full md:w-auto"
        >
          <span className="block md:hidden xl:block">{t('Create Item')}</span>
          <span className="hidden md:block xl:hidden">{t('Create Item')}</span>
        </button>
        <LinkButton
          href={`${ROUTES.WAREHOUSE}/${warehouseId}/logs/create`}
          className="h-12 md:ms-6 w-full md:w-auto"
        >
          <span className="block md:hidden xl:block">{t('Create Log')}</span>
          <span className="hidden md:block xl:hidden">{t('Create Log')}</span>
        </LinkButton>
      </Card>

      <WarehouseLogList warehouse={data as Warehouse} />
    </>
  );
}
WarehouseDetailPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

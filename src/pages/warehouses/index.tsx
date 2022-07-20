import Card from '@components/common/card';
import Search from '@components/common/search';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import Layout from '@components/layouts/admin';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useWarehousesQuery } from '@data/warehouses/warehouse.query';
import { ORDER_TYPE } from '@ts-types/custom.types';
import { WAREHOUSE_ORDER_BY } from '@ts-types/generated';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import cn from 'classnames';
import WarehouseList from '@components/warehouse/warehouse-list';
import LinkButton from '@components/ui/link-button';
import { ROUTES } from '@utils/routes';

export default function WarehousesPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState<number>();
  const [status, setStatus] = useState();
  const [managerUserId, setManagerUserId] = useState();

  const [orderBy, setOrderBy] = useState<WAREHOUSE_ORDER_BY>();
  const [orderType, setOrderType] = useState<ORDER_TYPE>();

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  function handlePagination(current: any) {
    setPage(current);
    setOffset(limit * (current - 1));
  }

  const {
    data,
    isLoading: loading,
    error,
  } = useWarehousesQuery({
    search,
    limit,
    offset,
    managerUserId,
    status,
    orderBy,
    orderType,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleSearch = ({ searchText }: { searchText: string }) => {
    setSearch(searchText);
    handlePagination(1);
  };

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-3/4 mb-4 xl:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-warehouses')}
          </h1>
        </div>
        <div className="w-full md:w-3/4 flex flex-col items-center ms-auto">
          <Search onSearch={handleSearch} />
        </div>

        <button
          className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
          onClick={toggleVisible}
        >
          {t('common:text-filter')}
          {visible ? (
            <ArrowUp className="ms-2" />
          ) : (
            <ArrowDown className="ms-2" />
          )}
        </button>
        <LinkButton
          href={`${ROUTES.WAREHOUSE}/create`}
          className="h-12 md:ms-6 w-full md:w-auto"
        >
          <span className="block md:hidden xl:block">+</span>
          <span className="hidden md:block xl:hidden">+</span>
        </LinkButton>
      </Card>

      <WarehouseList
        warehouses={data?.warehouses}
        meta={data?.meta}
        onOrder={(by: any, type: any) => {
          setOrderBy(by);
          setOrderType(type);
        }}
        onPagination={handlePagination}
      />
    </>
  );
}
WarehousesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});

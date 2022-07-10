import Card from '@components/common/card';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/layouts/admin';
import { useState } from 'react';
import LinkButton from '@components/ui/link-button';
import { ROUTES } from '@utils/routes';
import { useBrandsQuery } from '@data/brands/brand.query';
import BrandList from '@components/brand/brand-list';
import Search from '@components/common/search';
import { ArrowDown } from '@components/icons/arrow-down';
import { ArrowUp } from '@components/icons/arrow-up';
import cn from 'classnames';
import BrandFilter from '@components/brand/brand-filter';

export default function BrandsPage() {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [type, setType] = useState();
  const [orderBy, setOrderBy] = useState();
  const [orderType, setOrderType] = useState();
  const [createdFrom, setCreatedFrom] = useState();
  const [createdTo, setCreatedTo] = useState();
  const [updatedFrom, setUpdatedFrom] = useState();
  const [updatedTo, setUpdatedTo] = useState();

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };
  const {
    data,
    isLoading: loading,
    error,
  } = useBrandsQuery({
    search,
    type,
    orderBy,
    orderType,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleSearch = ({ searchText }: { searchText: string }) => {
    setSearch(searchText);
  };

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-3/4 mb-4 xl:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-brands')}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col items-center ms-auto">
          <Search onSearch={handleSearch} />
        </div>

        <button
          className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
          onClick={toggleVisible}
        >
          {t('commoluônn:text-filter')}{' '}
          {visible ? (
            <ArrowUp className="ms-2" />
          ) : (
            <ArrowDown className="ms-2" />
          )}
        </button>

        <div className="w-full xl:w-1/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <LinkButton
            href={`${ROUTES.BRANDS}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">+</span>
            <span className="hidden md:block xl:hidden">
              + {t('form:button-label-add')}
            </span>
          </LinkButton>
        </div>
      </Card>
      <Card
        className={cn('flex transition', {
          'h-auto visible': visible,
          'h-0 invisible': !visible,
        })}
      >
        <BrandFilter
          className="w-full md:mr-5"
          onTypeFilter={({ value }: any) => setType(value)}
          onCreatedFrom={(value: any) => setCreatedFrom(value)}
          onCreatedTo={(value: any) => setCreatedTo(value)}
          onUpdatedFrom={(value: any) => setUpdatedFrom(value)}
          onUpdatedTo={(value: any) => setUpdatedTo(value)}
        />
        {/* <SortForm
              className="w-full md:w-1/3 mt-5 md:mt-0"
              onSortChange={({ value }: any) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: 'name', label: 'Name' },
                { value: 'price', label: 'Price' },
                { value: 'max_price', label: 'Max Price' },
                { value: 'mix_price', label: 'Min Price' },
                { value: 'sale_price', label: 'Sale Price' },
                { value: 'quantity', label: 'Quantity' },
                { value: 'created_at', label: 'Created At' },
                { value: 'updated_at', label: 'Updated At' },
              ]}
            /> */}
      </Card>
      <BrandList
        brands={data?.brands}
        onOrder={(by: any, type: any) => {
          setOrderBy(by);
          setOrderType(type);
        }}
      />
    </>
  );
}

BrandsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});

import Card from '@components/common/card';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useUsersQuery } from '@data/user/user.query';
import { ORDER_TYPE, USER_ORDER_BY } from '@ts-types/custom.types';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Layout from '@components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArrowUp } from '@components/icons/arrow-up';
import { ArrowDown } from '@components/icons/arrow-down';
import Search from '@components/common/search';
import cn from 'classnames';
import UserList from '@components/user/user-list';
import UserFilter from '@components/user/user-filter';

export default function UsersPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState<number>();
  const [city, setCity] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [gender, setGender] = useState<number>();
  const [role, setRole] = useState<string>();
  const [status, setStatus] = useState();
  const [withDelete, setWithDelete] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [orderBy, setOrderBy] = useState<USER_ORDER_BY>();
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
  } = useUsersQuery({
    search,
    limit,
    city,
    district,
    gender,
    role,
    status,
    withDelete,
    offset,
    dateFrom,
    dateTo,
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
            {t('form:input-label-users')}
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

        {/* <div className="w-full xl:w-1/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto"></div> */}
      </Card>
      <Card
        className={cn('flex transition', {
          'h-auto visible': visible,
          'h-0 invisible': !visible,
        })}
      >
        <UserFilter
          onCreatedFrom={(value: any) => setDateFrom(value)}
          onCreatedTo={(value: any) => setDateTo(value)}
          onCityFilter={(o: any) => setCity(o)}
          onDistrictFilter={(o: any) => setDistrict(o)}
          onRoleFilter={(o: any) => setRole(o?.value)}
          onStatusFilter={(o: any) => setStatus(o?.value)}
          onWithDeleteFilter={(o: any) => setWithDelete(o?.value)}
          onGenderFilter={(o: any) => setGender(o?.value)}
          className="w-full md:mr-5"
        />
      </Card>
      <UserList
        users={data?.users}
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

UsersPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});

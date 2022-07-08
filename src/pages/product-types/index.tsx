import Card from '@components/common/card';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useProductTypesQuery } from '@data/product-types/product-type.query';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@components/layouts/admin';
import ProductTypeList from '@components/product-type/product-type-list';
import { useState } from 'react';
import LinkButton from '@components/ui/link-button';
import { ROUTES } from '@utils/routes';

export default function ProductTypesPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);

  function handlePagination(current: any) {
    setPage(current);
  }

  const { data, isLoading: loading, error } = useProductTypesQuery();

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-3/4 mb-4 xl:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-productTypes')}
          </h1>
        </div>
        <div className="w-full xl:w-1/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <LinkButton
            href={`${ROUTES.PRODUCT_TYPES}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t('form:button-label-add-productTypes')}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t('form:button-label-add')}
            </span>
          </LinkButton>
        </div>
      </Card>

      <ProductTypeList
        productTypes={data?.productTypes}
        onPagination={handlePagination}
      />
    </>
  );
}

ProductTypesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});

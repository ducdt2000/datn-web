import ProductForm from '@components/product/product-form';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useProductQuery } from '@data/products/product.query';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/admin';

export default function UpdateProductPage() {
  const { query } = useRouter();
  const { t } = useTranslation();

  const {
    data,
    isLoading: loading,
    error,
  } = useProductQuery(query?.id as string);
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-product')}
        </h1>
        <h2 className="text-lg font-light text-heading">
          {' '}
          {`: ${data?.name}`}
        </h2>
      </div>
      <ProductForm initialValues={data} />
    </>
  );
}

UpdateProductPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

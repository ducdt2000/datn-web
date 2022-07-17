import { useTranslation } from 'next-i18next';
import Layout from '@components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WarehouseForm from '@components/warehouse/warehouse-form';

export default function CreateProductsPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-warehouse')}
        </h1>
      </div>
      <WarehouseForm />
    </>
  );
}

CreateProductsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

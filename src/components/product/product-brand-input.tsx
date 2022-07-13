import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { useBrandsQuery } from '@data/brands/brand.query';
import { useTranslation } from 'next-i18next';
import { Control } from 'react-hook-form';

interface Props {
  error?: string | undefined;
}

const ProductBrandInput = ({ error }: Props) => {
  const { t } = useTranslation();

  const { data, isLoading: loading } = useBrandsQuery({});

  return (
    <>
      <Label>{t('form:input-label-brand')}</Label>
      <Select
        name="brandId"
        options={data?.brands?.map((brand: any) => ({ value: brand.id }))}
        getOptionLabel={(option: any) => option.name}
        isLoading={loading}
      />
      <ValidationError message={t(error!)} />
    </>
  );
};

export default ProductBrandInput;

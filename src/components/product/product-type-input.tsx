import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';
import Select from '@components/ui/select/select';
import { useProductTypesQuery } from '@data/product-types/product-type.query';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

interface Props {
  onChange: Function;
  error?: string | undefined;
}

const ProductTypeInput = ({ onChange, error }: Props) => {
  const { t } = useTranslation();

  const [value, setValue] = useState();

  const { data, isLoading: loading } = useProductTypesQuery({});

  return (
    <>
      <Label>{t('form:input-label-productType')}</Label>
      <Select
        value={value}
        onChange={onChange}
        name="productTypeId"
        options={data?.productTypes?.map((brand: any) => ({ value: brand.id }))}
        getOptionLabel={(option: any) => option.name}
        isLoading={loading}
      />
      <ValidationError message={t(error!)} />
    </>
  );
};

export default ProductTypeInput;

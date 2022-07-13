import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { useBrandsQuery } from '@data/brands/brand.query';
import { useProductTypesQuery } from '@data/product-types/product-type.query';
import { DatePicker } from '@components/ui/date-picker';
import moment from 'moment';
import { useState } from 'react';
type Props = {
  onBrandIdFilter: Function;
  onBrandTypeFilter: Function;
  onProductTypeIdFilter: Function;
  onCreatedFrom: Function;
  onCreatedTo: Function;
  className?: string;
};

const brandTypeOptions = [{ value: 'foreign' }, { value: 'local' }];

export default function ProductFilter({
  onCreatedFrom,
  onCreatedTo,
  className,
  onBrandIdFilter,
  onBrandTypeFilter,
  onProductTypeIdFilter,
}: Props) {
  const { t } = useTranslation();

  const [createdFrom, setCreatedFrom] = useState();
  const [createdTo, setCreatedTo] = useState();

  const { data: dataBrands, isLoading: loadingBrands } = useBrandsQuery({});

  const { data: dataProductTypes, isLoading: loadingProductTypes } =
    useProductTypesQuery({});

  return (
    <div
      className={cn(
        'flex flex-row md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full',
        className
      )}
    >
      <div className="w-1/6">
        <Label>{t('form:input-label-brand')}</Label>
        <Select
          onChange={onBrandIdFilter}
          options={dataBrands?.brands?.data?.map((brand: any) => ({
            value: brand.id,
            name: brand.name,
          }))}
          isClearable={true}
          getOptionLabel={(option: any) => option.name}
          isLoading={loadingBrands}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('form:input-label-productType')}</Label>
        <Select
          isClearable={true}
          onChange={onProductTypeIdFilter}
          options={dataProductTypes?.productTypes?.data?.map(
            (productType: any) => {
              return {
                value: productType.id,
                name: productType.name,
              };
            }
          )}
          getOptionLabel={(option: any) => option.name}
          isLoading={loadingProductTypes}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('common:filter-by-type')}</Label>
        <Select
          isClearable={true}
          onChange={onBrandTypeFilter}
          options={brandTypeOptions}
          getOptionLabel={(option: any) => option.value}
          placeholder={t('common:filter-by-type-placeholder')}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('form:input-label-createdFrom')}</Label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          onChange={(value: any) => {
            onCreatedFrom(moment(value).format('YYYY/MM/DD'));
            setCreatedFrom(value);
          }}
          maxDate={createdTo}
          selected={createdFrom}
          selectsStart
          className="border border-border-base"
        />
      </div>
      <div className="w-1/6">
        <Label>{t('form:input-label-createdTo')}</Label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={createdTo}
          minDate={createdFrom}
          onChange={(value: any) => {
            onCreatedTo(moment(value).format('YYYY/MM/DD'));
            setCreatedTo(value);
          }}
          selectsStart
          className="border border-border-base"
        />
      </div>
    </div>
  );
}

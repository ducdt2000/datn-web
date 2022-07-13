import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import { DatePicker } from '@components/ui/date-picker';
import moment from 'moment';
import { useState } from 'react';

const brandTypeOptions = [
  { value: 'foreign' },
  { value: 'local' },
  { value: undefined },
];

type Props = {
  onTypeFilter: Function;
  onCreatedFrom: Function;
  onCreatedTo: Function;
  onUpdatedFrom: Function;
  onUpdatedTo: Function;
  className?: string;
};

export default function BrandFilter({
  onTypeFilter,
  onCreatedFrom,
  onCreatedTo,
  onUpdatedFrom,
  onUpdatedTo,
  className,
}: Props) {
  const { t } = useTranslation();

  const [createdFrom, setCreatedFrom] = useState();
  const [createdTo, setCreatedTo] = useState();
  const [updatedFrom, setUpdatedFrom] = useState();
  const [updatedTo, setUpdatedTo] = useState();
  return (
    <div
      className={cn(
        'flex flex-row md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full',
        className
      )}
    >
      <div className="w-1/6">
        <Label>{t('common:filter-by-type')}</Label>
        <Select
          options={brandTypeOptions}
          getOptionLabel={(option: any) => option.value}
          placeholder={t('common:filter-by-type-placeholder')}
          onChange={onTypeFilter}
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
      <div className="w-1/6">
        <Label>{t('form:input-label-updatedFrom')}</Label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          onChange={(value: any) => {
            onUpdatedFrom(moment(value).format('YYYY/MM/DD'));
            setUpdatedFrom(value);
          }}
          maxDate={updatedTo}
          selectsStart
          className="border border-border-base"
        />
      </div>
      <div className="w-1/6">
        <Label>{t('form:input-label-updatedTo')}</Label>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          onChange={(value: any) => {
            onUpdatedTo(moment(value).format('YYYY/MM/DD'));
            setUpdatedTo(value);
          }}
          minDate={updatedFrom}
          selectsStart
          className="border border-border-base"
        />
      </div>
    </div>
  );
}

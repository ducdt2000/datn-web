import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';
import Search from '@components/common/search';
import { DatePicker } from '@components/ui/date-picker';
import moment from 'moment';
import { useState } from 'react';
import { GENDER, ROLE, USER_ACTIVE } from '@ts-types/generated';
type Props = {
  onCityFilter: Function;
  onDistrictFilter: Function;
  onRoleFilter: Function;
  onStatusFilter: Function;
  onWithDeleteFilter: Function;
  onGenderFilter: Function;
  onCreatedFrom: Function;
  onCreatedTo: Function;
  className?: string;
};

const genderOptions = [
  { value: +GENDER.MALE, name: 'option:male-name' },
  { value: +GENDER.FEMALE, name: 'option:female-name' },
  { value: +GENDER.OTHER, name: 'option:other-name' },
];

const roleOptions = [
  { value: ROLE.USER, name: 'option:user-name' },
  { value: ROLE.STAFF, name: 'option:staff-name' },
  { value: ROLE.ADMIN, name: 'option:admin-name' },
];

const statusOptions = [
  { value: USER_ACTIVE.ACTIVE, name: 'option:user-active' },
  { value: USER_ACTIVE.INACTIVE, name: 'option:user-inactive' },
];

const deleteOptions = [
  { value: 1, name: 'option:user-withDelete' },
  { value: 0, name: 'option:user-notWithDelete' },
];

export default function UserFilter({
  onCreatedFrom,
  onCreatedTo,
  className,
  onGenderFilter,
  onCityFilter,
  onDistrictFilter,
  onRoleFilter,
  onStatusFilter,
  onWithDeleteFilter,
}: Props) {
  const { t } = useTranslation();

  const [createdFrom, setCreatedFrom] = useState();
  const [createdTo, setCreatedTo] = useState();

  return (
    <div
      className={cn(
        'flex flex-row md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full z-10',
        className
      )}
    >
      <div className="w-1/6">
        <Label>{t('form:input-label-role')}</Label>
        <Select
          onChange={onRoleFilter}
          options={roleOptions}
          isClearable={true}
          getOptionLabel={(option: any) => option.name}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('form:input-label-status')}</Label>
        <Select
          isClearable={true}
          onChange={onStatusFilter}
          options={statusOptions}
          getOptionLabel={(option: any) => option.name}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('common:filter-by-withDelete')}</Label>
        <Select
          isClearable={true}
          onChange={onWithDeleteFilter}
          options={deleteOptions}
          getOptionLabel={(option: any) => option.name}
          placeholder={t('common:filter-by-type-placeholder')}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('common:filter-by-gender')}</Label>
        <Select
          isClearable={true}
          onChange={onGenderFilter}
          options={genderOptions}
          getOptionLabel={(option: any) => option.name}
          placeholder={t('common:filter-by-type-placeholder')}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('common:filter-by-city')}</Label>
        <Search
          onSearch={({ searchText }) => {
            if (searchText === '') {
              onCityFilter(undefined);
            } else {
              onCityFilter(searchText);
            }
          }}
        />
      </div>
      <div className="w-1/6">
        <Label>{t('common:filter-by-district')}</Label>
        <Search
          onSearch={({ searchText }) => {
            if (searchText === '') {
              onDistrictFilter(undefined);
            } else {
              onDistrictFilter(searchText);
            }
          }}
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

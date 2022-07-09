import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';

const brandTypeOptions = [{ value: 'foreign' }, { value: 'local' }];

type Props = {
  onTypeFilter: Function;
  className?: string;
};

export default function CategoryTypeFilter({ onTypeFilter, className }: Props) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 w-full',
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
    </div>
  );
}

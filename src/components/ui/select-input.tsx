import Select from '@components/ui/select/select';
import { Controller } from 'react-hook-form';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  [key: string]: unknown;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  formatOptionLabel,
  value,
  onInputChange,
  components,
  onChange,
  onBlur,
  isMulti,
  isClearable,
  isLoading,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field: { value, onChange, onBlur, ref } }) => (
        <Select
          components={components ?? undefined}
          inputRef={ref}
          value={options?.find((o: any) => o.value === value)}
          onChange={(val: any) => {
            onChange(val.value);
          }}
          onBlur={onBlur}
          formatOptionLabel={formatOptionLabel}
          onInputChange={onInputChange}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          isMulti={isMulti}
          isClearable={isClearable}
          isLoading={isLoading}
          options={options}
        />
      )}
    />
  );
};

export default SelectInput;

import { Asterisk } from '@components/common/asterisk';
import cn from 'classnames';
import React from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

export interface Props extends CurrencyInputProps {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}
const classes = {
  root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow',
};
const CustomCurrencyInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      children,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      required = false,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline',
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );

    return (
      <div className={className}>
        <label
          htmlFor={name}
          className="block text-body-dark font-semibold text-sm leading-none mb-3"
        >
          {label}
          {required && <Asterisk />}
        </label>
        <CurrencyInput
          className={rootClassName}
          id={name}
          name={name}
          type={type}
          ref={ref}
          {...rest}
        />
        {note && <p className="mt-2 text-xs text-body">{note}</p>}
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default CustomCurrencyInput;

import React from 'react';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import { selectStyles } from './select.styles';
export type Ref = any;

export const MyAsyncSelect = React.forwardRef<Ref, AsyncProps<any, any>>(
  (props, ref) => (
    <AsyncSelect styles={selectStyles} {...props} innerRef={ref} />
  )
);
export default MyAsyncSelect;

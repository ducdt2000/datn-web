import React from 'react';
import * as ReactSelectSearch from 'react-select-search-nextjs';
import { selectStyles } from './select.styles';

export type Ref = any;

export const SelectSearch = React.forwardRef<
  Ref,
  ReactSelectSearch.SelectSearchProps
>((props, ref) => {
  return (
    <ReactSelectSearch.SelectSearch
      styles={selectStyles}
      {...props}
    ></ReactSelectSearch.SelectSearch>
  );
});

import { FilterOptionsType, Status } from '@/src/data/types/books';
import { Dispatch, SetStateAction } from 'react';

export type SearchBookTableProps = {
  setSearchBookText: Dispatch<SetStateAction<string>>;
  status: Status | '';
  filter: FilterOptionsType | '';
  setStatus: Dispatch<SetStateAction<Status | ''>>;
  setFilter: Dispatch<SetStateAction<FilterOptionsType | ''>>;
  redirectHref: string;
};

export type FilterSelectProps = {
  value: FilterOptionsType | '';
  onSelect: Dispatch<SetStateAction<FilterOptionsType>>;
};

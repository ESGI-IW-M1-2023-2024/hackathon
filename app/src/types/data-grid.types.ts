import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import { SetURLSearchParams } from 'react-router-dom';

export type PaginationProps = {
  page: number;
  limit: number;
  totalResults: number | undefined;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  handlePageChange: (newPage: number) => void;
};

export interface ListGridProps<Row> {
  columns: GridColDef[];
  rows: Row[];
  loading: boolean;
  defaultSort: {
    field: string;
    order: 'asc' | 'desc';
    sortModelChangeHandler?: (model: GridSortModel) => void;
  };
  pagination?: PaginationProps;
  remarkableEventRowId?: string;
}

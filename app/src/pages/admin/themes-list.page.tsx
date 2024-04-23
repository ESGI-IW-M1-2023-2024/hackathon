import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import { Theme, ThemesSortableField } from '@/features/admin/types/theme.types';
import useThemeColumns from '@/features/admin/utils/theme-config';
import { useGetThemesQuery } from '@/redux/api/api.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { LinearProgress } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const ThemesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Pagination
  const pagination = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || import.meta.env.VITE_DEFAULT_PAGE_SIZE || 15),
  };
  const { page, limit } = pagination;

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  // Api Data
  const { data, isLoading } = useGetThemesQuery({ page, limit });

  const listProps: ListGridProps<Theme> = {
    columns: [...useThemeColumns()],
    rows: data ? data.items : [],
    loading: isLoading,
    defaultSort: {
      field: ThemesSortableField.ID,
      order: 'asc',
    },
    pagination: {
      ...pagination,
      totalResults: data ? data.totalItemCount : 0,
      handlePageChange,
      searchParams,
      setSearchParams,
    },
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <h1>Liste des Thèmes</h1>
      <ListGridComponent {...listProps} />
    </>
  );
};

export default ThemesList;

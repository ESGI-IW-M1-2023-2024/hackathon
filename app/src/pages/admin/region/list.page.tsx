import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import useThemeColumns from '@/features/admin/utils/theme-config';
import {useGetRegionsQuery} from '@/redux/api/api.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { Button, LinearProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {Region, RegionsSortableField} from "@/features/admin/types/region.types";

const RegionList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
  const { data, isLoading } = useGetRegionsQuery({ page, limit });

  const listProps: ListGridProps<Region> = {
    columns: [...useThemeColumns()],
    rows: data ? data.items : [],
    loading: isLoading,
    defaultSort: {
      field: RegionsSortableField.ID,
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
      <h1>Liste des régions</h1>
      <Button variant='contained' onClick={() => navigate('/admin/regions/create')}>
        Créer une région
      </Button>
      <ListGridComponent {...listProps} />
    </>
  );
};

export default RegionList;

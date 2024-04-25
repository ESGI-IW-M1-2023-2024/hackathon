import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import useRegionColumns from '@/features/admin/utils/region-config';
import {useDeleteRegionMutation, useGetRegionsQuery} from '@/redux/api/api.slice';
import {ListGridProps} from '@/types/data-grid.types';
import {Button, LinearProgress} from '@mui/material';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Region, RegionsSortableField} from "@/features/admin/types/region.types";
import {openSnackBar} from "@/redux/slices/notification.slice";
import {useDispatch} from "react-redux";

const RegionList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
    const [deleteRegion] = useDeleteRegionMutation();
    const dispatch = useDispatch();

  // Pagination
  const paginationRegion = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || import.meta.env.VITE_DEFAULT_PAGE_SIZE || 15),
      archived: Boolean(searchParams.get('archived')) || false,
      pagination: Boolean(searchParams.get('pagination')) || true,
  };
    const {page, limit, archived, pagination} = paginationRegion

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

    const handleDeleteRegion = async (id: number) => {
        try {
            await deleteRegion(id).unwrap();
            dispatch(openSnackBar({message: 'Région supprimé avec succès', severity: 'success'}));
        } catch (error) {
            dispatch(openSnackBar({message: 'Erreur lors de la suppression de la région', severity: 'error'}));
        }
    };

  // Api Data
    const {data, isLoading} = useGetRegionsQuery({page, limit, archived, pagination});

  const listProps: ListGridProps<Region> = {
      columns: [...useRegionColumns({handleDeleteRegion})],
    rows: data ? data.items : [],
    loading: isLoading,
    defaultSort: {
      field: RegionsSortableField.ID,
      order: 'asc',
    },
    pagination: {
      ...paginationRegion,
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

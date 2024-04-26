import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import { useDeleteWineMutation, useEditWineQuantityMutation, useGetWinesQuery } from '@/redux/api/api.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { Box, Button, FormControlLabel, LinearProgress, Stack, Switch } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Wine, WinesSortableField } from '@/features/admin/types/wine.types';
import useWineColumns from '@/features/admin/utils/wine-config';

const WineList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [deleteWine] = useDeleteWineMutation();
  const [updateWineQuantity] = useEditWineQuantityMutation();
  const dispatch = useDispatch();

  const [showArchived, setShowArchived] = useState<0 | 1>(Number(searchParams.get('archived')) === 1 ? 1 : 0 || 0);

  // Pagination
  const pagination = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || import.meta.env.VITE_DEFAULT_PAGE_SIZE || 15),
    archived: showArchived,
    orderBy: searchParams.get('orderBy') || '',
    orderByDirection: searchParams.get('orderByDirection') || '',
  };

  const { page, limit, archived, orderBy, orderByDirection } = pagination;

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  const handleDeleteWine = async (id: number) => {
    try {
      await deleteWine(id).unwrap();
      dispatch(openSnackBar({ message: 'Vin supprimé avec succès', severity: 'success' }));
    } catch (error) {
      dispatch(openSnackBar({ message: 'Erreur lors de la suppression du vin', severity: 'error' }));
    }
  };

  const handleUpdateQuantity = async ({ id, quantity }: { id: number; quantity: number }) => {
    try {
      await updateWineQuantity({ id, quantity }).unwrap();
      dispatch(openSnackBar({ message: 'Modification de la quantité effectuée', severity: 'success' }));
    } catch (error: unknown) {
      console.error(error);
      dispatch(openSnackBar({ message: 'Echec de la modification de la quantité du vin', severity: 'error' }));
    }
  };

  // Api Data
  const { data, isLoading } = useGetWinesQuery({ page, limit, archived, orderBy, orderByDirection });

  const listProps: ListGridProps<Wine> = {
    columns: [...useWineColumns({ handleDeleteWine, handleUpdateQuantity })],
    rows: data ? data.items : [],
    loading: isLoading,
    defaultSort: {
      field: WinesSortableField.ID,
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
      <Stack width={'80%'} alignItems={'left'} margin={'1rem auto'} spacing={2} direction={'column'}>
        <Box textAlign={'center'}>
          <h1>Liste des vins</h1>
        </Box>
        <Stack width={'100%'} direction={'row'}>
          <Button variant='contained' onClick={() => navigate('/admin/wines/create')} sx={{ width: 'fit-content' }}>
            Créer un vin
          </Button>
          <FormControlLabel
            sx={{ ml: 2 }}
            control={
              <Switch checked={showArchived === 1} onChange={() => setShowArchived(showArchived === 1 ? 0 : 1)} />
            }
            label='Afficher les vins archivés'
          />
        </Stack>

        <ListGridComponent {...listProps} />
      </Stack>
    </>
  );
};

export default WineList;

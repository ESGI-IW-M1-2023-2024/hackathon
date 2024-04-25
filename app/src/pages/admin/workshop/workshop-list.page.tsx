import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import { Workshop, WorkshopSortableField } from '@/features/admin/types/workshop.types';
import useWorkshopColumns from '@/features/admin/utils/workshop-config';
import { useGetWorkshopsQuery } from '@/redux/api/api.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { Box, Button, CircularProgress, FormControlLabel, Stack, Switch } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminWorkshopList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showArchived, setShowArchived] = useState<0 | 1>(Number(searchParams.get('archived')) === 1 ? 1 : 0 || 0);

  // Pagination
  const pagination = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || import.meta.env.VITE_DEFAULT_PAGE_SIZE || 15),
    orderBy: searchParams.get('orderBy') || '',
    orderByDirection: searchParams.get('orderByDirection') || '',
    archived: showArchived,
  };
  const { page, limit, orderBy, orderByDirection } = pagination;

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  const handleDeleteWorkshop = async (id: number) => console.log(`TODO delete workshop ${id}`);

  // Api Data
  const { data, isLoading } = useGetWorkshopsQuery({ page, limit, orderBy, orderByDirection, archived: showArchived });
  console.log(data);
  const listProps: ListGridProps<Workshop> = {
    columns: [...useWorkshopColumns({ handleDeleteWorkshop })],
    rows: data ? data.items : [],
    loading: isLoading,
    defaultSort: {
      field: WorkshopSortableField.ID,
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
    return <CircularProgress />;
  }

  return (
    <Stack width={'80%'} alignItems={'left'} margin={'1rem auto'} spacing={2} direction={'column'}>
      <Box textAlign={'center'}>
        <h1>Liste des Ateliers</h1>
      </Box>

      <Stack width={'100%'} direction={'row'}>
        <Button variant='contained' onClick={() => navigate('/admin/workshops/create')} sx={{ width: 'fit-content' }}>
          Créer un atelier
        </Button>
        <FormControlLabel
          sx={{ ml: 2 }}
          control={<Switch checked={showArchived === 1} onChange={() => setShowArchived(showArchived === 1 ? 0 : 1)} />}
          label='Afficher les thèmes archivés'
        />
      </Stack>
      <ListGridComponent {...listProps} />
    </Stack>
  );
};

export default AdminWorkshopList;

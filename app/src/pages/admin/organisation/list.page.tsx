import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import {
  useDeleteOrganisationMutation, useGetOrganisationsQuery,
} from '@/redux/api/api.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { Box, Button, FormControlLabel, LinearProgress, Stack, Switch } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { openSnackBar } from "@/redux/slices/notification.slice";
import { useDispatch } from "react-redux";
import useOrganisationColumns from "@/features/admin/utils/organisation-config";
import { Organisation, OrganisationsSortableField } from "@/features/admin/types/organisation.types";
import { useState } from "react";

const OrganisationList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [deleteOrganisation] = useDeleteOrganisationMutation();
  const dispatch = useDispatch();

  const [showArchived, setShowArchived] = useState<0 | 1>(Number(searchParams.get('archived')) === 1 ? 1 : 0 || 0);


  // Pagination
  const pagination = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || import.meta.env.VITE_DEFAULT_PAGE_SIZE || 15),
    archived: showArchived,
  };
  const { page, limit, archived } = pagination;

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  const handleDeleteOrganisation = async (id: number) => {
    try {
      await deleteOrganisation(id).unwrap();
      dispatch(openSnackBar({ message: 'Organisation supprimée avec succès', severity: 'success' }));
    } catch (error) {
      dispatch(openSnackBar({ message: 'Erreur lors de la suppression de l\'organisation', severity: 'error' }));
    }
  };

  // Api Data
  const { data, isLoading } = useGetOrganisationsQuery({ page, limit, archived });

  const listProps: ListGridProps<Organisation> = {
    columns: [...useOrganisationColumns({ handleDeleteOrganisation })],
    rows: data ? data.items : [],
    loading: isLoading,
    defaultSort: {
      field: OrganisationsSortableField.ID,
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
    <Stack width={'80%'} alignItems={'left'} margin={'1rem auto'} spacing={2} direction={'column'} >
      <Box textAlign={'center'}>
        <h1>Liste des Organisation</h1>
      </Box>
      <Stack width={'100%'} direction={'row'}>
        <Button variant='contained' onClick={() => navigate('/admin/organisations/create')} sx={{ width: 'fit-content' }}>
          Créer une organisation
        </Button>
        <FormControlLabel
          sx={{ ml: 2 }}
          control={<Switch checked={showArchived === 1} onChange={() => setShowArchived(showArchived === 1 ? 0 : 1)} />}
          label='Afficher les organisations archivées'
        />
      </Stack>
      <ListGridComponent {...listProps} />
    </Stack>
  );
};

export default OrganisationList;

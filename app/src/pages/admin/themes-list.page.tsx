import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import { Theme, ThemesSortableField } from '@/features/admin/types/theme.types';
import useThemeColumns from '@/features/admin/utils/theme-config';
import { useDeleteThemeMutation, useGetThemesQuery } from '@/redux/api/api.slice';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { Button, LinearProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ThemesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteTheme] = useDeleteThemeMutation();

  // Pagination
  const pagination = {
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || import.meta.env.VITE_DEFAULT_PAGE_SIZE || 15),
    orderBy: searchParams.get('orderBy') || '',
    orderByDirection: searchParams.get('orderByDirection') || '',
    archived: Boolean(searchParams.get('archived')) || false,
  };
  const { page, limit, orderBy, orderByDirection, archived } = pagination;

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  const handleDeleteTheme = async (id: number) => {
    try {
      await deleteTheme(id).unwrap();
      dispatch(openSnackBar({ message: 'Thème supprimé avec succès', severity: 'success' }));
    } catch (error) {
      console.log(error);
      dispatch(openSnackBar({ message: 'Erreur lors de la suppression du thème', severity: 'error' }));
    }
  };

  // Api Data
  const { data, isLoading } = useGetThemesQuery({ page, limit, orderBy, orderByDirection, archived });

  const listProps: ListGridProps<Theme> = {
    columns: [...useThemeColumns({ handleDeleteTheme })],
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
      <Button variant='contained' onClick={() => navigate('/themes/create')}>
        Créer un thème
      </Button>
      <ListGridComponent {...listProps} />
    </>
  );
};

export default ThemesList;

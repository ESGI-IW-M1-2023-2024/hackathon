import ListGridComponent from '@/features/UI/list/components/list-grid.component';
import { WorkshopBooking } from '@/features/admin/types/workshop.types';
import useWorkshopBookingColumns from '@/features/admin/utils/workshop-booking-config';
import { useCancelBookingMutation, useGetOneWorkshopQuery, useValidateBookingMutation } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { ListGridProps } from '@/types/data-grid.types';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const WorkshopBookingList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [validateBooking] = useValidateBookingMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const handleValidate = async ({ id, fullname }: { id: number; fullname: string }) => {
    try {
      await validateBooking(id).unwrap();
      dispatch(openSnackBar({ message: `Validation de la réservation de ${fullname} confirmée`, severity: 'success' }));
    } catch (error: unknown) {
      console.error(error);
      dispatch(openSnackBar({ message: `impossible de confirmer l'inscription de ${fullname}`, severity: 'error' }));
    }
  };

  const handleCancel = async ({ id, fullname }: { id: number; fullname: string }) => {
    try {
      await cancelBooking(id).unwrap();
      dispatch(openSnackBar({ message: `Annulation de la réservation de ${fullname} confirmée`, severity: 'success' }));
    } catch (error: unknown) {
      console.error(error);
      dispatch(openSnackBar({ message: `impossible d'annuler l'inscription de ${fullname}`, severity: 'error' }));
    }
  };

  const { data, isLoading } = useGetOneWorkshopQuery(id!);
  const listProps: ListGridProps<WorkshopBooking> = {
    columns: [...useWorkshopBookingColumns({ handleValidate, handleCancel })],
    rows: data?.bookings ?? [],
    loading: isLoading,
    defaultSort: {
      field: 'id',
      order: 'asc',
    },
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack width={'80%'} alignItems={'left'} margin={'1rem auto'} spacing={2} direction={'column'}>
      <Box textAlign={'center'}>
        <h1>Liste des Réservation de l'atelier {data?.theme.label}</h1>
      </Box>

      <Stack width={'100%'} direction={'row'}>
        <Button variant='contained' onClick={() => navigate(`/admin/workshops/${id}`)} sx={{ width: 'fit-content' }}>
          Retourner à l'atelier
        </Button>
      </Stack>
      <ListGridComponent {...listProps} />
    </Stack>
  );
};

export default WorkshopBookingList;

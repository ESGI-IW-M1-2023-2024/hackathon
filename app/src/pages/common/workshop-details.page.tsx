import RegistrationWorkshop from '@/features/common/components/registration-workshop.component';
import { useGetOneWorkshopQuery } from '@/redux/api/api.slice';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { CircularProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

interface WorkshopDetailError {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

const WorkshopDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetOneWorkshopQuery(id!);
  console.log(data);

  if (error) {
    const customError = error as WorkshopDetailError;
    dispatch(
      openSnackBar({
        message:
          customError.originalStatus === 404
            ? 'Atelier introuvable'
            : "Une erreur est surveue lors de la récupération de l'atelier",
        severity: 'error',
      }),
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <Typography variant='h1'>Aucune donnée</Typography>;
  }

  return (
    <>
      <Typography variant='h1'>Detail d'un atelier</Typography>
      {data?.theme.label}
      <RegistrationWorkshop workshop={data} />
    </>
  );
};

export default WorkshopDetails;

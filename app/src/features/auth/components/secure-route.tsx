import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LoggedUser } from '../types/logged-user.type';
import { RootState } from '@/redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { openSnackBar } from '@/redux/slices/notification.slice';

const SecureRoute = () => {
  const user: LoggedUser | null = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  if (!user) {
    dispatch(openSnackBar({ message: 'Vous devez être connecté pour accéder à cette page', severity: 'warning' }));
    return <Navigate to='/login' />;
  }

  if (user) {
    return <Outlet />;
  }

  return <LinearProgress />;
};

export default SecureRoute;

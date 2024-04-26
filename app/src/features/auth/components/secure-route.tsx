import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LoggedUser } from '../types/logged-user.type';
import { RootState } from '@/redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { setUser } from '@/redux/slices/user.slice';

const SecureRoute = () => {
  const user: LoggedUser | null = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const getUserFromCookies = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'loggedUser') {
        return JSON.parse(decodeURIComponent(value)); // Parse and decode the stored JSON string
      }
    }
    return null;
  };

  if (!user) {
    const loggedUser = getUserFromCookies();
    if (loggedUser) {
      dispatch(setUser(loggedUser));
      return <Outlet />;
    }
    dispatch(openSnackBar({ message: 'Vous devez être connecté pour accéder à cette page', severity: 'warning' }));
    return <Navigate to='/login' />;
  }

  if (user) {
    return <Outlet />;
  }

  return <LinearProgress />;
};

export default SecureRoute;

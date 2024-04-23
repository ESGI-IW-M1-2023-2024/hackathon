import { useAppSelector } from '@/redux/hooks';
import { LoggedUser } from '../types/logged-user.type';
import { RootState } from '@/redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const SecureRoute = () => {
  const user: LoggedUser | null = useAppSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (user) {
    return <Outlet />;
  }

  return <LinearProgress />;
};

export default SecureRoute;

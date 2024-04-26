import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import { closeSnackBar } from '../../../../redux/slices/notification.slice';

const Notification = () => {
  const dispatch = useAppDispatch();

  const notificationState = useAppSelector((state: RootState) => state.notification);
  const { message, severity, isActive } = notificationState;

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(closeSnackBar());
  };

  if (!notificationState) return null;

  return (
    <>
      <Snackbar
        open={isActive}
        onClose={handleClose}
        TransitionProps={{ enter: true, exit: true }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert severity={severity} onClose={handleClose} variant='filled'>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;

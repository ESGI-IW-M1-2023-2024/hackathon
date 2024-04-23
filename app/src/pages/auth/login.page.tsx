import { ChangeEvent, useState } from 'react';
import { UserCredentials } from '../../features/auth/types/logged-user.type';
import { Button, TextField } from '@mui/material';
import { apiSlice } from '../../redux/api/api.slice';
import { useAppDispatch } from '../../redux/hooks';
import { openSnackBar } from '../../redux/slices/notification.slice';

const Login = () => {
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState<UserCredentials>({ username: '', password: '' });
  const [loginUser] = apiSlice.useLoginUserMutation();

  const handleLoginUser = async () => {
    try {
      await loginUser(credentials).unwrap();
      console.log('ok');
      dispatch(openSnackBar({ message: 'Connexion réussi', severity: 'success' }));
    } catch (error: unknown) {
      console.log('pas ok');
      dispatch(openSnackBar({ message: 'Echec de la connexion', severity: 'error' }));
    }
  };

  return (
    <>
      <TextField
        label="Nom d'utilisateur"
        value={credentials.username}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setCredentials({ ...credentials, username: event.target.value })
        }
      />
      <TextField
        label='Mot de passe'
        value={credentials.password}
        type='password'
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setCredentials({ ...credentials, password: event.target.value })
        }
      />
      <Button variant='contained' onClick={handleLoginUser}>
        Se connecter
      </Button>
    </>
  );
};

export default Login;

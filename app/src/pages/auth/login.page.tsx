import { UserCredentials } from '../../features/auth/types/logged-user.type';
import { Alert, Box, Button, Stack } from '@mui/material';
import { apiSlice } from '../../redux/api/api.slice';
import { useAppDispatch } from '../../redux/hooks';
import { openSnackBar } from '../../redux/slices/notification.slice';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { customErrorMap } from '../../utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '../../features/UI/custom-mui-components/components/custom-form-field.component';
import { setUser } from '../../redux/slices/user.slice';
import { useNavigate } from 'react-router-dom';

const zodSchema = () =>
  z.object({
    username: z.string().email('Format de mail non valide'),
    password: z.string(),
  });

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginUser] = apiSlice.useLoginUserMutation();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleFormSubmit = async (formData: UserCredentials): Promise<void> => {
    try {
      const response = await loginUser(formData).unwrap();
      dispatch(setUser(response));
      dispatch(openSnackBar({ message: 'Connexion réussi', severity: 'success' }));
      navigate('/admin');
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: 'Echec de la connexion', severity: 'error' }));
    }
  };

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      margin={'6rem auto'}
      width={'30rem'}
      spacing={2}
    >
      <h1>Authentification</h1>
      <Alert severity='warning'>
        L'authentification est réservée aux administrateurs de la cave
      </Alert>
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='username'
        options={{ label: "Nom d'utilisateur" }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='password'
        options={{ label: 'Mot de passe' }}
        props={{ type: 'password' }}
      />
      <Button variant='contained' type='submit'>
        Se connecter
      </Button>
    </Stack>
  );
};

export default Login;

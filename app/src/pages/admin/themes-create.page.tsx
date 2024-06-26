import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';
import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { NewTheme } from '@/features/admin/types/theme.types';
import { useCreateThemeMutation } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const zodSchema = () =>
  z.object({
    label: z.string(),
    content: z.string(),
    subtitle: z.string().optional(),
    file: z.string().base64(),
  });

const CreateTheme = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createTheme] = useCreateThemeMutation();

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      label: '',
      content: '',
      subtitle: '',
      file: '',
    },
  });

  const handleFormSubmit = async (formData: NewTheme): Promise<void> => {
    try {
      await createTheme(formData).unwrap();
      dispatch(openSnackBar({ message: 'Thème créé avec succès', severity: 'success' }));
      navigate('/admin/themes');
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: 'Impossible de créer le thème', severity: 'error' }));
    }
  };

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      width={'80%'}
      alignItems={'center'}
      spacing={2}
      margin={'2rem auto'}
    >
      <h1>Nouveau Thème</h1>

      <Stack direction={'row'} spacing={2} minWidth={'100%'}>
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='label'
          options={{ label: 'Label' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='subtitle'
          options={{ label: 'Sous-titre' }}
        />
        <CustomFormField
          childrenComponentType='FILE_FIELD'
          control={control}
          controlName='file'
          options={{ label: 'Fichier', setValue: setValue }}
        />
      </Stack>
      <Stack direction={'row'} spacing={2} minWidth={'100%'}>
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='content'
          options={{ label: 'Contenu' }}
        />
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Button variant='contained' type='submit'>
          Créer le thème
        </Button>
        <ColorButton variant='contained' onClick={() => navigate('/admin/themes')} sx={{ textTransform: 'uppercase' }}>
          Retour à la liste
        </ColorButton>
      </Stack>
    </Stack>
  );
};

export default CreateTheme;

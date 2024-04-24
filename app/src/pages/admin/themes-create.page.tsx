import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { NewTheme } from '@/features/admin/types/theme.types';
import { useCreateThemeMutation } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
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
      navigate('/themes');
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: 'Impossible de créer le thème', severity: 'error' }));
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='label'
        options={{ label: 'Label' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='content'
        options={{ label: 'Contenu' }}
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
      <Button variant='contained' type='submit'>
        Créer le thème
      </Button>
      <Button variant='contained' onClick={() => navigate('/themes')}>
        Retour à la liste
      </Button>
    </Box>
  );
};

export default CreateTheme;

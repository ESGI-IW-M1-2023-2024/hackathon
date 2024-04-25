import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';
import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { EditTheme as EditThemeType } from '@/features/admin/types/theme.types';
import { useEditThemeMutation, useGetOneThemeQuery } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const zodSchema = () =>
  z.object({
    id: z.number(),
    label: z.string(),
    content: z.string(),
    subtitle: z.string().optional(),
    file: z.string().base64(),
  });

const EditTheme = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [editTheme] = useEditThemeMutation();
  const { data } = useGetOneThemeQuery(Number(id));
  const defaultValues = data
    ? {
      id: data.id,
      label: data.label,
      content: data.content,
      subtitle: data.subtitle,
      file: '',
    }
    : {
      id: Number(id),
      label: '',
      content: '',
      subtitle: '',
      file: '',
    };

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  if (data) {
    setValue('content', data.content);
    setValue('label', data.label);
    setValue('subtitle', data.subtitle);
  }

  const handleFormSubmit = async (formData: EditThemeType): Promise<void> => {
    try {
      await editTheme(formData).unwrap();
      dispatch(openSnackBar({ message: 'Thème modifié avec succès', severity: 'success' }));
      navigate('/themes');
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: 'Impossible de modifier le thème', severity: 'error' }));
    }
  };

  return (
    <Stack component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      width={'80%'}
      alignItems={'center'}
      spacing={2}
      margin={'2rem auto'}
    >

      <h1>Édition d'un Thème</h1>

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
      </Stack>
      <Stack direction={"row"} spacing={2}>
        <Button variant='contained' type='submit'>
          Modifier le thème
        </Button>
        <ColorButton variant='contained' onClick={() => navigate('/themes')} sx={{ textTransform: 'uppercase' }}>
          Retour à la liste
        </ColorButton>
      </Stack>
    </Stack>
  );
};

export default EditTheme;

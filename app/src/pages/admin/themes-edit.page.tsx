import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { EditTheme as EditThemeType } from '@/features/admin/types/theme.types';
import { useEditThemeMutation, useGetOneThemeQuery } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: 'Impossible de modifier le thème', severity: 'error' }));
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
        Modifier le thème
      </Button>
    </Box>
  );
};

export default EditTheme;

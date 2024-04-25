import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';
import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { EditWorkshop as EditWorkshopType } from '@/features/admin/types/workshop.types';
import {
  useEditWorkshopMutation,
  useGetOneWorkshopQuery,
  useGetOrganisationsQuery,
  useGetThemesQuery,
  useGetWinesQuery,
} from '@/redux/api/api.slice';
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
    dateStart: z.string().min(1, { message: 'Champ obligatoire' }),
    length: z.string().min(1, { message: 'Champ obligatoire' }),
    maxPerson: z.string().min(1, { message: 'Champ obligatoire' }),
    location: z.string().min(1, { message: 'Champ obligatoire' }),
    maxBookingDate: z.string().min(1, { message: 'Champ obligatoire' }),
    price: z.string().min(1, { message: 'Champ obligatoire' }),
    themeId: z.string().min(1, { message: 'Champ obligatoire' }),
    organisationId: z.string().min(1, { message: 'Champ obligatoire' }),
    wines: z.array(z.string()).min(1, { message: 'Champ obligatoire' }),
    status: z.string(),
    id: z.number(),
  });

const EditWorkshop = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [editWorkshop] = useEditWorkshopMutation();
  const { data } = useGetOneWorkshopQuery(id!);
  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      dateStart: '',
      length: '',
      maxPerson: '',
      location: '',
      maxBookingDate: '',
      price: '',
      themeId: '',
      organisationId: '',
      wines: [''],
      status: '',
      id: Number(id),
    },
  });

  if (data) {
    setValue('dateStart', data.dateStart.toString().split('T')[0]);
    setValue('length', data.length.toString());
    setValue('maxPerson', data.maxPerson.toString());
    setValue('location', data.location);
    setValue('maxBookingDate', data.maxBookingDate.toString().split('T')[0]);
    setValue('price', data.price.toString());
    setValue('themeId', data.theme.id.toString());
    setValue('organisationId', data.organisation.id.toString());
    setValue(
      'wines',
      data.wines.map((wine) => wine.id.toString()),
    );
    setValue('status', data.status);
  }

  const handleFormSubmit = async (formData: EditWorkshopType) => {
    try {
      await editWorkshop(formData).unwrap();
      dispatch(openSnackBar({ message: 'Atelier modifié avec succès', severity: 'success' }));
      navigate('/admin/workshops');
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: "Impossible de modifier l'atelier", severity: 'error' }));
    }
  };

  const { data: themes } = useGetThemesQuery({ pagination: false });
  const { data: organisations } = useGetOrganisationsQuery({ pagination: false });
  const { data: wines } = useGetWinesQuery({ pagination: false });

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      width={'80%'}
      alignItems={'center'}
      spacing={2}
      margin={'2rem auto'}
    >
      <h1>Edition d'un Atelier</h1>

      <Box
        display='flex'
        flexDirection={'row'}
        gap={2}
        flexWrap='wrap'
        sx={{ '& > *': { flexBasis: '300px', flexGrow: 1, maxWidth: '80vw' } }}
      >
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='dateStart'
          options={{ label: 'Date de début' }}
          props={{ type: 'date' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='length'
          options={{ label: 'Durée en minute' }}
          props={{ type: 'number' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='maxPerson'
          options={{ label: 'Nombre de places' }}
          props={{ type: 'number' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='location'
          options={{ label: 'Lieu' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='maxBookingDate'
          options={{ label: "Date limite d'inscription" }}
          props={{ type: 'date' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='price'
          options={{ label: 'Prix' }}
          props={{ type: 'number' }}
        />
        <CustomFormField
          childrenComponentType='SELECT'
          control={control}
          controlName='themeId'
          options={{
            label: 'Theme',
            items: themes?.items.map((theme) => ({ text: theme.label, value: theme.id.toString() })) ?? [],
          }}
        />
        <CustomFormField
          childrenComponentType='SELECT'
          control={control}
          controlName='organisationId'
          options={{
            label: 'Organisation',
            items:
              organisations?.items.map((organisation) => ({
                text: organisation.label ?? '',
                value: organisation.id.toString(),
              })) ?? [],
          }}
        />
        <CustomFormField
          childrenComponentType='SELECT'
          control={control}
          controlName='wines'
          props={{ multiple: true }}
          options={{
            label: 'Vins',
            items:
              wines?.items.map((wine) => ({
                text: `${wine.productYear} : ${wine.label}`,
                value: wine.id.toString(),
              })) ?? [],
          }}
        />
      </Box>
      <Stack direction={'row'} spacing={2}>
        <Button variant='contained' type='submit'>
          Modifier l'atelier
        </Button>
        <ColorButton
          variant='contained'
          onClick={() => navigate('/admin/workshops')}
          sx={{ textTransform: 'uppercase' }}
        >
          Retour à la liste
        </ColorButton>
      </Stack>
    </Stack>
  );
};

export default EditWorkshop;

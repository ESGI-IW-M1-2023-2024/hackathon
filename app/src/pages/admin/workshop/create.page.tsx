import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';
import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { CreateWorkshop as CreateWorkshopType, WorkshopStatus } from '@/features/admin/types/workshop.types';
import {
  useCreateWorkshopMutation,
  useGetOrganisationsQuery,
  useGetThemesQuery,
  useGetWinesQuery,
} from '@/redux/api/api.slice';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  });

const CreateWorkshop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date();
  const currentDate = date.toLocaleString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit',  });

  const [createWorkshop] = useCreateWorkshopMutation();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      dateStart: currentDate,
      length: '',
      maxPerson: '',
      location: '',
      maxBookingDate: currentDate,
      price: '',
      themeId: '',
      organisationId: '',
      wines: [''],
      status: WorkshopStatus.HIDDEN,
    },
  });

  const handleFormSubmit = async (formData: CreateWorkshopType) => {
    try {
      await createWorkshop(formData).unwrap();
      dispatch(openSnackBar({ message: 'Atelier créé avec succès', severity: 'success' }));
      navigate('/admin/workshops');
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: "Impossible de créer l'atelier", severity: 'error' }));
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
      <h1>Nouvel Atelier</h1>

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
          props={{ multiple: true, sx: { width: '80vw' } }}
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
          Créer l'atelier
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

export default CreateWorkshop;

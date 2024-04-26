import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { CreateBooking } from '@/features/admin/types/booking.types';
import { Workshop } from '@/features/admin/types/workshop.types';
import { useCreateBookingMutation } from '@/redux/api/api.slice';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const zodSchema = () =>
  z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    schoolClass: z.string(),
    workshopId: z.number().int(),
    majority: z.boolean().refine((val) => val === true, {
      message: 'Vous devez être majeur pour vous inscrire',
    }),
    legalMentions: z.boolean().refine((val) => val === true, {
      message: 'Vous devez accepter les conditions générales pour vous inscrire',
    }),
  });

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface RegistrationWorkshopProps {
  workshop: Workshop;
}

const RegistrationWorkshop = ({ workshop }: RegistrationWorkshopProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [createBooking] = useCreateBookingMutation();
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      schoolClass: '',
      workshopId: workshop.id,
      majority: false,
      legalMentions: false,
    },
  });

  const handleFormSubmit = async (formData: CreateBooking) => {
    try {
      await createBooking(formData).unwrap();
      setOpenDialog(true);
    } catch (error: unknown) {
      dispatch(openSnackBar({ message: "impossible de s'inscrire à l'atelier", severity: 'error' }));
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '80%',
        padding: '1rem',

      }}
    >
      <Stack
        direction='row'
        spacing={2}
      >
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='firstname'
          options={{ label: 'Prénom' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='lastname'
          options={{ label: 'Nom de famille' }}
        />
      </Stack>
      <Stack
        direction='row'
        spacing={2}
      >
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='email'
          options={{ label: 'Adresse mail' }}
          props={{ type: 'email' }}
        />
        <CustomFormField
          childrenComponentType='TEXT_FIELD'
          control={control}
          controlName='schoolClass'
          options={{ label: 'Classe' }}
        />
      </Stack>
      <CustomFormField
        childrenComponentType='CHECKBOX'
        control={control}
        controlName='majority'
        options={{ label: 'Je certifie avoir plus de 18ans', checked: watch('majority') }}
      />

      <CustomFormField
        childrenComponentType='CHECKBOX'
        control={control}
        controlName='legalMentions'
        options={{
          label: (
            <>
              J'ai lu et j'accepte les {' '}
              <Link onClick={() => navigate('/cgu')}>conditions générales</Link>
              {' '} du site.
            </>
          ),
          checked: watch('legalMentions')
        }}
      />
      <Typography variant='body2'>Un email récapitulatif vous sera adressé avec les modalités de paiement. Votre inscription ne sera confirmée qu’après paiement.</Typography>
      <Button variant='contained' type='submit'>
        S'inscrire
      </Button>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby='confirmation-dialog-slide-description'
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id='confirmation-dialog-slide-description'>
            Votre inscription a été enregistrée. Un mail vous a été envoyé afin de confirmer votre inscription.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>J'ai compris</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegistrationWorkshop;

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
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
    },
  });

  const handleFormSubmit = async (formData: CreateBooking) => {
    try {
      await createBooking(formData).unwrap();
      setOpenDialog(true);
    } catch (error: unknown) {
      console.log(error);
      dispatch(openSnackBar({ message: "impossible de s'inscrire à l'atelier", severity: 'error' }));
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
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
      <CustomFormField
        childrenComponentType='CHECKBOX'
        control={control}
        controlName='majority'
        options={{ label: 'Je certifie avoir plus de 18ans', checked: watch('majority') }}
      />
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

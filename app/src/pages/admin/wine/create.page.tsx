import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { useCreateWineMutation, useGetRegionsQuery } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, LinearProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { NewWine } from '@/features/admin/types/wine.types';

const zodSchema = () =>
  z.object({
    label: z.string(),
    productYear: z.string(),
    producer: z.string(),
    grapeVariety: z.string(),
    alcoholLevel: z.string(),
    color: z.string(),
    quantity: z.string(),
    bottleSize: z.string(),
    comments: z.string(),
    region: z.string(),
    servingTemperature: z.number().optional(),
    storage: z.string().optional(),
    upTo: z.string().optional(),
    byTaste: z.string().optional(),
    byEye: z.string().optional(),
    onTheNose: z.string().optional(),
    inTheMouth: z.string().optional(),
    winePairing: z.string().optional(),
    recommandedPairing: z.string().optional(),
    content: z.string().optional(),
    file: z.string().base64(),
  });

const CreateWine = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createWine] = useCreateWineMutation();

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      label: null,
      productYear: null,
      producer: null,
      grapeVariety: null,
      alcoholLevel: null,
      color: null,
      quantity: null,
      bottleSize: 'piccolo',
      comments: null,
      region: null,
      servingTemperature: null,
      storage: '',
      upTo: '',
      byTaste: '',
      byEye: '',
      onTheNose: '',
      inTheMouth: '',
      winePairing: '',
      recommandedPairing: '',
      content: '',
      file: null,
    },
  });

  const { data: regionData, isLoading } = useGetRegionsQuery({ pagination: false });

  const handleFormSubmit = async (formData: NewWine): Promise<void> => {
    try {
      await createWine(formData).unwrap();
      dispatch(openSnackBar({ message: 'Vin créé avec succès', severity: 'success' }));

      navigate(`/admin/wines`);
    } catch (error: unknown) {
      dispatch(openSnackBar({ message: 'Impossible de créer le vin', severity: 'error' }));
    }
  };

  if (isLoading) {
    return <LinearProgress />;
  }

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
        controlName='productYear'
        options={{ label: 'Année de production' }}
        props={{ type: 'number' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='producer'
        options={{ label: 'Producteur' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='grapeVariety'
        options={{ label: 'grapeVariety' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='alcoholLevel'
        options={{ label: 'alcoholLevel' }}
        props={{ type: 'number' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='color'
        options={{ label: 'color' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='quantity'
        options={{ label: 'quantity' }}
        props={{ type: 'number' }}
      />
      <CustomFormField
        childrenComponentType='SELECT'
        control={control}
        controlName='bottleSize'
        options={{
          label: 'bottleSize',
          items: [
            {
              text: 'Piccolo',
              value: 'piccolo',
            },
            {
              text: 'Demi',
              value: 'half',
            },
            {
              text: 'Standard',
              value: 'standard',
            },
            {
              text: 'Magnum',
              value: 'magnum',
            },
            {
              text: 'Double magnum',
              value: 'double magnum',
            },
            {
              text: 'Jeroboam',
              value: 'jeroboam',
            },
            {
              text: 'Mathusalem',
              value: 'methuselah',
            },
            {
              text: 'Salmanazar',
              value: 'salmanazar',
            },
            {
              text: 'Balthazar',
              value: 'balthazar',
            },
            {
              text: 'Nabuchodonosor',
              value: 'nebuchadnezar',
            },
            {
              text: 'Melchior',
              value: 'melchior',
            },
            {
              text: 'Melchisédek',
              value: 'melchizedek',
            },
          ],
        }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='comments'
        options={{ label: 'comments' }}
      />
      <CustomFormField
        childrenComponentType='AUTOCOMPLETE'
        control={control}
        controlName='region'
        options={{
          inputLabel: 'region',
          items: regionData
            ? [
                ...regionData.items.map((region) => ({
                  label: region.label + '(' + region.countryName + ')',
                  id: region.id,
                })),
              ]
            : [],
          noOptionsText: 'Aucune région',
        }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='servingTemperature'
        options={{ label: 'servingTemperature' }}
        props={{ type: 'number' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='storage'
        options={{ label: 'storage' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='upTo'
        options={{ label: 'upTo' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='taste'
        options={{ label: 'taste' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='byTaste'
        options={{ label: 'byTaste' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='byEye'
        options={{ label: 'byEye' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='onTheNose'
        options={{ label: 'onTheNose' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='inTheMouth'
        options={{ label: 'inTheMouth' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='winePairing'
        options={{ label: 'winePairing' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='recommandedPairing'
        options={{ label: 'recommandedPairing' }}
      />
      <CustomFormField
        childrenComponentType='TEXT_FIELD'
        control={control}
        controlName='content'
        options={{ label: 'content' }}
      />
      <CustomFormField
        childrenComponentType='FILE_FIELD'
        control={control}
        controlName='file'
        options={{ label: 'file', setValue: setValue }}
      />
      <Button variant='contained' type='submit'>
        Créer le vin
      </Button>
    </Box>
  );
};

export default CreateWine;

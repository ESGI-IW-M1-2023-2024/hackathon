import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { useEditWineMutation, useGetOneWineQuery, useGetRegionsQuery } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, Divider, LinearProgress, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { EditWine as EditWineType } from '@/features/admin/types/wine.types';
import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';

const zodSchema = () =>
  z.object({
    label: z.string().min(1, { message: 'Champ obligatoire' }),
    productYear: z.string().min(1, { message: 'Champ obligatoire' }),
    producer: z.string().min(1, { message: 'Champ obligatoire' }),
    grapeVariety: z.string().min(1, { message: 'Champ obligatoire' }),
    alcoholLevel: z.string().min(1, { message: 'Champ obligatoire' }),
    color: z.string().min(1, { message: 'Champ obligatoire' }),
    quantity: z.string().min(1, { message: 'Champ obligatoire' }),
    bottleSize: z.string().min(1, { message: 'Champ obligatoire' }),
    comments: z.string().min(1, { message: 'Champ obligatoire' }),
    regionId: z.string().min(1, { message: 'Champ obligatoire' }),
    servingTemperature: z.number(),
    storage: z.string(),
    upTo: z.string(),
    taste: z.string(),
    byTaste: z.string(),
    byEye: z.string(),
    onTheNose: z.string(),
    inTheMouth: z.string(),
    winePairing: z.string(),
    recommandedPairing: z.string(),
    content: z.string(),
    file: z.string().base64(),
  });

const EditWine = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [editWine] = useEditWineMutation();
  const { data } = useGetOneWineQuery(Number(id));

  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      id: Number(id),
      label: '',
      productYear: '',
      producer: '',
      grapeVariety: '',
      alcoholLevel: '',
      color: '',
      quantity: '',
      bottleSize: '',
      comments: '',
      regionId: '',
      servingTemperature: 0,
      storage: '',
      upTo: '',
      taste: '',
      byTaste: '',
      byEye: '',
      onTheNose: '',
      inTheMouth: '',
      winePairing: '',
      recommandedPairing: '',
      content: '',
      file: '',
    },
  });

  if (data) {
    console.log(data);
    setValue('label', data.label ?? '');
    setValue('productYear', data.productYear?.toString() ?? '');
    setValue('producer', data.producer ?? '');
    setValue('grapeVariety', data.grapeVariety ?? '');
    setValue('alcoholLevel', data.alcoholLevel?.toString() ?? '');
    setValue('color', data.color ?? '');
    setValue('quantity', data.quantity?.toString() ?? '');
    setValue('bottleSize', data.bottleSize ?? '');
    setValue('comments', data.comments ?? '');
    setValue('regionId', data.region?.id.toString() ?? '');
    setValue('servingTemperature', data.servingTemperature ?? 0);
    setValue('storage', data.storage ?? '');
    setValue('upTo', data.upTo ?? '');
    setValue('taste', data.taste ?? '');
    setValue('byTaste', data.byTaste ?? '');
    setValue('byEye', data.byEye ?? '');
    setValue('onTheNose', data.onTheNose ?? '');
    setValue('inTheMouth', data.inTheMouth ?? '');
    setValue('winePairing', data.winePairing ?? '');
    setValue('recommandedPairing', data.recommandedPairing ?? '');
    setValue('content', data.content ?? '');
    setValue('id', data.id);
  }

  const { data: regionData, isLoading } = useGetRegionsQuery({ pagination: false });

  const handleFormSubmit = async (formData: EditWineType): Promise<void> => {
    try {
      formData.id = Number(id!);
      await editWine(formData).unwrap();
      dispatch(openSnackBar({ message: 'Vin modifié avec succès', severity: 'success' }));
      navigate('/admin/wines');
    } catch (error: unknown) {
      dispatch(openSnackBar({ message: 'Impossible de modifier le vin', severity: 'error' }));
    }
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      width={'80%'}
      alignItems={'center'}
      spacing={2}
      margin={'2rem auto'}
    >
      <h1>Éditer un Vin</h1>
      <Stack spacing={5} minWidth={'100%'}>
        <Card
          sx={{
            minWidth: '100%',
          }}
        >
          <CardContent>
            <Typography variant={'h3'}>Informations générales</Typography>
            <Divider
              sx={{
                my: 2,
              }}
            ></Divider>
            <Stack direction={'row'} spacing={2} minWidth={'100%'}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='label'
                options={{ label: 'Nom' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='grapeVariety'
                options={{ label: 'Type de raisin' }}
              />
            </Stack>
            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='producer'
                options={{ label: 'Producteur' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='productYear'
                options={{ label: 'Année de production' }}
                props={{ type: 'number' }}
              />
            </Stack>
            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='alcoholLevel'
                options={{ label: "Niveau d'alcool" }}
                props={{ type: 'number' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='color'
                options={{ label: 'Couleur' }}
              />
            </Stack>
            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='quantity'
                options={{ label: 'Quantité' }}
                props={{ type: 'number' }}
              />
              <CustomFormField
                childrenComponentType='SELECT'
                control={control}
                controlName='bottleSize'
                options={{
                  label: 'Taille de bouteille',
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
            </Stack>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='comments'
                options={{ label: 'Commentaires' }}
              />
              <CustomFormField
                childrenComponentType='SELECT'
                control={control}
                controlName='regionId'
                options={{
                  label: 'Région',
                  items: regionData
                    ? [
                        ...regionData.items.map((region) => ({
                          label: region.label + '(' + region.countryName + ')',
                          id: region.id,
                          text: region.label + '(' + region.countryName + ')',
                          value: region.id,
                        })),
                      ]
                    : [],
                  noOptionsText: 'Aucune région',
                }}
              />
            </Stack>
            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='FILE_FIELD'
                control={control}
                controlName='file'
                options={{ label: 'Fichier', setValue: setValue }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: '100%',
            mt: 10,
          }}
        >
          <CardContent>
            <Typography variant={'h3'}>Informations complémentaires</Typography>
            <Divider
              sx={{
                my: 2,
              }}
            ></Divider>
            <Stack direction={'row'} spacing={2} minWidth={'100%'}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='servingTemperature'
                options={{ label: 'Température de service' }}
                props={{ type: 'number' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='storage'
                options={{ label: 'Stockage' }}
              />
            </Stack>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='upTo'
                options={{ label: "Jusqu'à" }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='taste'
                options={{ label: 'Goût' }}
              />
            </Stack>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='byTaste'
                options={{ label: 'Par goût' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='byEye'
                options={{ label: "À l'oeil" }}
              />
            </Stack>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='onTheNose'
                options={{ label: 'Dans le nez' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='inTheMouth'
                options={{ label: 'Dans la boûche' }}
              />
            </Stack>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='winePairing'
                options={{ label: 'Accord du vin' }}
              />
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='recommandedPairing'
                options={{ label: 'Accord recommandé' }}
              />
            </Stack>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
              <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='content'
                options={{ label: 'Contenu' }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
        <Button variant='contained' type='submit'>
          Éditer le vin
        </Button>
        <ColorButton variant='contained' onClick={() => navigate('/admin/wines')} sx={{ textTransform: 'uppercase' }}>
          Retour à la liste
        </ColorButton>
      </Stack>
    </Stack>
  );
};

export default EditWine;

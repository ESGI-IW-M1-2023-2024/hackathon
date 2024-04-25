import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import {useCreateWineMutation, useGetRegionsQuery} from '@/redux/api/api.slice';
import {useAppDispatch} from '@/redux/hooks';
import {openSnackBar} from '@/redux/slices/notification.slice';
import {customErrorMap} from '@/utils/customZodErrorMap';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Card, CardContent, Divider, LinearProgress, Stack, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useNavigate} from 'react-router-dom';
import {NewWine} from '@/features/admin/types/wine.types';
import ColorButton from "@/features/UI/custom-mui-components/components/custom-button.component";

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
      regionId: z.number(),
    servingTemperature: z.string().optional(),
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
        regionId: null,
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
        <Stack component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}
               width={'80%'}
               alignItems={'center'}
               spacing={2}
               margin={'2rem auto'}
        >
            <h1>Nouveau Vin</h1>
            <Stack spacing={5} minWidth={'100%'} >
                <Card sx={{
                    minWidth: '100%'
                }}>
                    <CardContent>
                        <Typography variant={'h3'}>
                            Informations générales
                        </Typography>
                        <Divider sx={{
                            my: 2
                        }}></Divider>
                        <Stack direction={'row'} spacing={2} minWidth={'100%'}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='label'
                                options={{label: 'Nom'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='grapeVariety'
                                options={{label: 'Type de raisin'}}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='producer'
                                options={{label: 'Producteur'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='productYear'
                                options={{label: 'Année de production'}}
                                props={{type: 'number'}}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='alcoholLevel'
                                options={{label: 'Niveau d\'alcool'}}
                                props={{type: 'number'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='color'
                                options={{label: 'Couleur'}}
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='quantity'
                                options={{label: 'Quantité'}}
                                props={{type: 'number'}}
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
                                options={{label: 'Commentaires'}}
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
                                options={{label: 'Fichier', setValue: setValue}}
                            />
                        </Stack>
                    </CardContent>
                </Card>

                <Card sx={{
                    minWidth: '100%',
                    mt: 10
                }}>
                    <CardContent>
                        <Typography variant={'h3'}>
                            Informations complémentaires
                        </Typography>
                        <Divider sx={{
                            my: 2
                        }}></Divider>
                        <Stack direction={'row'} spacing={2} minWidth={'100%'}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='servingTemperature'
                                options={{label: 'Température de service'}}
                                props={{type: 'number'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='storage'
                                options={{label: 'Stockage'}}
                            />
                        </Stack>

                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='upTo'
                                options={{label: 'Jusqu\'à'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='taste'
                                options={{label: 'Goût'}}
                            />
                        </Stack>

                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='byTaste'
                                options={{label: 'Par goût'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='byEye'
                                options={{label: 'À l\'oeil'}}
                            />
                        </Stack>

                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='onTheNose'
                                options={{label: 'Dans le nez'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='inTheMouth'
                                options={{label: 'Dans la boûche'}}
                            />
                        </Stack>

                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='winePairing'
                                options={{label: 'Accord du vin'}}
                            />
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='recommandedPairing'
                                options={{label: 'Accord recommandé'}}
                            />
                        </Stack>

                        <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                            <CustomFormField
                                childrenComponentType='TEXT_FIELD'
                                control={control}
                                controlName='content'
                                options={{label: 'Contenu'}}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>


            <Stack direction={'row'} spacing={2} minWidth={'100%'} mt={2}>
                <Button variant='contained' type='submit'>
                    Créer le vin
                </Button>
                <ColorButton variant='contained' onClick={() => navigate('/wines')} sx={{ textTransform: 'uppercase' }}>
                    Retour à la liste
                </ColorButton>
            </Stack>
        </Stack>
    )
};

export default CreateWine;

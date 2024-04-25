import { useGetOneWineQuery } from "@/redux/api/api.slice";
import { Box, CircularProgress, Container, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import wineImage from '@/assets/wines/wine1.png';
import ColorButton from "@/features/UI/custom-mui-components/components/custom-button.component";

const Wine = () => {

    const { id } = useParams();
    const theme = useTheme();

    const { data, isLoading } = useGetOneWineQuery(Number(id));

    if (isLoading) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
                sx={{
                    backgroundColor: '#B9515B',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    const DescriptionElement = (props: { title: string, value?: string | null, isHeading?: boolean }) => {
        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        color: 'white',
                        justifyContent: 'space-between',
                        alignItems: { sm: 'center' },
                        width: '100%',
                    }}
                >
                    <Typography
                        variant={props.isHeading ? 'h2' : 'body1'}
                        sx={{
                            flex: '1 1 auto',
                            fontWeight: 'bold',
                        }}
                    >
                        {props.isHeading ? props.value : props.title}
                    </Typography>
                    <Typography
                        display={props.isHeading ? 'none' : 'block'}
                        sx={{
                            flex: '2',
                            textAlign: 'right',
                        }}
                    >
                        {props.value ?? '-'}
                    </Typography>

                </Box>
                <Divider
                    sx={{
                        mt: 1,
                        width: '100%',
                    }}
                />
            </>
        )
    }

    const defaultValues = data
        ? {
            id: data.id,
            label: data.label,
            productYear: data.productYear,
            producer: data.producer,
            grapeVariety: data.grapeVariety,
            alcoholLevel: data.alcoholLevel,
            color: data.color,
            quantity: data.quantity,
            bottleSize: data.bottleSize,
            comments: data.comments,
            region: data.region.label,
            servingTemperature: data.servingTemperature,
            storage: data.storage,
            upTo: data.upTo,
            taste: data.taste,
            byTaste: data.byTaste,
            byEye: data.byEye,
            onTheNose: data.onTheNose,
            inTheMouth: data.inTheMouth,
            winePairing: data.winePairing,
            recommandedPairing: data.recommandedPairing,
            content: data.content,
            imageFilename: data.imageFilename,
            archived: data.archived,
        }
        : {
            id: Number(id),
            label: '',
            productYear: 0,
            producer: '',
            grapeVariety: '',
            alcoholLevel: 0,
            color: '',
            quantity: 0,
            bottleSize: '',
            comments: '',
            region: '',
            servingTemperature: '',
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
            imageFilename: '',
            archived: false,
        };

    return (
        <Stack sx={
            {

                backgroundColor: "#B9515B",
                width: '100vw',
            }
        }>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: "#B9515B",
                    padding: '2rem',
                    //minHeight: '100vh',
                }}
            >
                {/* Description du vin */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={4}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{
                        color: 'white',
                        mb: 4,
                        width: '100%',
                    }}
                >
                    {/* Textes descriptifs */}
                    <Stack
                        component='ul'
                        direction={'column'}
                        alignItems={'flex-start'}
                        justifyContent={'flex-start'}
                        spacing={2}
                        sx={{
                            width: { xs: '100%', sm: '70%' },
                            color: 'white',
                        }}
                    >
                        <DescriptionElement title='Nom' value={defaultValues.label} isHeading />
                        <DescriptionElement title='Région' value={data?.region.label} />
                        <DescriptionElement title='Cépage' value={defaultValues.grapeVariety} />
                        <DescriptionElement title='Température de service' value={defaultValues.servingTemperature} />
                        <DescriptionElement title='Conservation' value={defaultValues.storage} />
                        <DescriptionElement title='Durée de garde' value={defaultValues.upTo} />
                        <DescriptionElement title='Goûts' value={defaultValues.taste} />
                        <DescriptionElement title='Par goûts' value={defaultValues.byTaste} />
                        <DescriptionElement title='À l’œil' value={defaultValues.byEye} />
                        <DescriptionElement title='Au nez' value={defaultValues.onTheNose} />
                        <DescriptionElement title='En bouche' value={defaultValues.inTheMouth} />
                        <DescriptionElement title='Accords mets-vins' value={defaultValues.winePairing} />
                        <DescriptionElement title='Accords recommandés' value={defaultValues.recommandedPairing} />
                    </Stack>
                    {/* Image du vin */}
                    <Stack
                        component='figure'
                        className='d-shadow'
                        flexDirection={'column'}
                        sx={{
                            width: 'auto',
                            height: 'auto',
                            '& img': {
                                width: '100%',
                                height: { xs: '90vh', sm: 'auto' },
                                objectFit: 'contain',
                            },
                            backgroundColor: theme.palette.secondary.main,
                            borderRadius: '4px',
                            alignSelf: 'center',
                        }}
                    >
                        <img className="d-shadow" src={defaultValues.imageFilename || wineImage} alt={defaultValues.label} />

                        <Typography
                            component={'figcaption'}
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                padding: '1rem',
                            }}
                        >
                            Quantité : <strong>{defaultValues.quantity}</strong>
                        </Typography>
                    </Stack>
                    {/* Fin de l'image du vin */}
                </Stack>
                {/* fin de la description du vin */}
                <Stack>
                    <Typography
                        variant='h3'
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        Commentaires d'Olivier
                    </Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '1rem',
                        }}
                    >
                        {defaultValues.comments}
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        mt: 4,
                        mb: 4,
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        Description
                    </Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '1rem',
                        }}
                    >
                        {defaultValues.content}
                    </Typography>
                </Stack>
                <Stack>
                    <ColorButton>Télécharger la fiche technique</ColorButton>
                </Stack>
            </Container>
        </Stack>
    )
}

export default Wine
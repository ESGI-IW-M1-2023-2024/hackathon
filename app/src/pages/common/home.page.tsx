import Navbar from "@/features/UI/common/components/navbar";
import { Box, Button, ButtonProps, Card, CardContent, CardMedia, CircularProgress, Container, Stack, styled, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import herobanner from "@/assets/homepage/herobanner.jpg";
import TextImage from "@/features/UI/homepage/components/text-image.component";
import { useGetWorkshopsQuery } from "@/redux/api/api.slice";

const Home = () => {
    const { data, isLoading } = useGetWorkshopsQuery();

    const renderWorkshopCards = () => {
        // Assure-toi que data est non-null et a au moins un élément
        if (!data || data.length === 0) return <Typography variant="h6">Aucun atelier disponible pour le moment.</Typography>;

        // Prends les trois derniers éléments de l'array
        console.log(data);
        const lastThreeWorkshops = data.slice(-3);

        return lastThreeWorkshops.map((workshop, index) => {
            // Assure-toi que chaque atelier a une propriété 'image', 'title', et 'description'
            if (!workshop.theme || !workshop.theme.headerFilename || !workshop.theme.label || !workshop.theme.subtitle) return null;

            return (
                <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={workshop.theme.headerFilename}
                        alt={workshop.theme.label}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {workshop.theme.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {workshop.theme.subtitle}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });
    };

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#660033'),
        backgroundColor: '#660033',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#B9515B',
        },
    }));

    return (
        <>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    color: "white",
                    '& > h1': {
                        fontSize: "3rem",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                    },
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backgroundImage: `url(${herobanner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    //backgroundGradient: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
                    height: "70vh"
                }}
            >
                <Navbar transparent={true} />
                <h1>Bœnnologie</h1>
            </Stack>
            <Container component="main">
                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                >
                    <ColorButton variant='contained' startIcon={<Diversity3Icon />}>
                        Participer aux ateliers
                    </ColorButton>
                </Box>

                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                >
                    <TextImage
                        title="Explorez le Monde du Vin"
                        text={<>
                            Plongez dans l'univers fascinant du vin avec nos ateliers de dégustation. Que vous soyez novice ou connaisseur, nos sessions sont conçues pour éveiller vos sens et enrichir votre palais.<br /> Découvrez les secrets des vignerons, les nuances des cépages, et partagez des moments inoubliables. Rejoignez-nous pour explorer, apprendre et savourer.<br /><br /> <strong>Votre voyage dans le monde du vin commence ici!</strong>
                        </>}
                        src="https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                </Box>

                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginTop={'2rem'}
                    marginBottom={'2rem'}
                >
                    <TextImage
                        title="Cultivez Votre Passion pour le Vin"
                        text={<>
                            Laissez-vous guider à travers le riche patrimoine viticole et affinez votre compréhension du vin avec nos ateliers éducatifs. De la vigne au verre, nos experts vous transporteront dans un voyage de découverte et d'apprentissage.<br />Acquérez les compétences de dégustation, comprenez les subtilités des accords mets-vins et devenez un véritable connaisseur. Avec chaque gorgée, transformez votre curiosité en savoir.<br /><br /><strong>Apprenez, dégustez, excellez.</strong>
                        </>}
                        src="https://images.pexels.com/photos/2440524/pexels-photo-2440524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        reverse
                    />
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        component={'section'}
                        display={'flex'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        flexWrap={'wrap'}
                        marginTop={'2rem'}
                        marginBottom={'2rem'}
                    >
                        {renderWorkshopCards()}
                    </Box>
                )}
            </Container>
        </>

    )
}

export default Home;

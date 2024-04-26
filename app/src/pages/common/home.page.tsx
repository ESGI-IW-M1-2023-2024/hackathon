import { Box, Card, CardActions, CardContent, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import herobanner from "@/assets/homepage/herobanner.jpg";
import TextImage from "@/features/UI/homepage/components/text-image.component";
import { useGetThreeLastWorkshopsQuery } from "@/redux/api/api.slice";
import ColorButton from "@/features/UI/custom-mui-components/components/custom-button.component";
import Button from '@mui/material/Button';
import Olivier from '@/assets/about/olivier-cut.png';
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';

const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetThreeLastWorkshopsQuery();
    const renderWorkshopCards = () => {
        // Assure-toi que data est non-null et a au moins un élément
        if (!data || !data.items || data.items.length === 0) return <Typography variant="h6">Aucun atelier disponible pour le moment.</Typography>;

        // Prends les trois derniers éléments de l'array
        const lastThreeWorkshops = data.items;

        return lastThreeWorkshops.map((workshop, index) => {
            // Assure-toi que chaque atelier a une propriété 'image', 'title', et 'description'
            //if (!workshop.theme || !workshop.theme.headerFilename || !workshop.theme.label || !workshop.theme.subtitle) return null;

            const dateStart = new Date(workshop.dateStart);
            const formattedDate = dateStart.toLocaleDateString('fr-FR', {
                day: '2-digit', // Affiche le jour avec deux chiffres
                month: 'long',   // Affiche le mois en toute lettre,
                year: "numeric"
            });

            return (
                <Card key={index}
                    sx={{
                        width: { md: 'calc(97% / 3)', sm: 'calc(97% / 2)', xs: '100%' },
                        display: 'flex',
                        flexWrap: "wrap",
                        flexDirection: 'column'
                    }}

                >
                    <CardContent>
                        <Box sx={{
                            display: "flex"
                        }}>
                            <Box>
                                <Typography variant="h4" component={"h4"}>
                                    {workshop.theme.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {workshop.theme.subtitle}
                                </Typography>
                            </Box>
                            <Box sx={{
                                marginLeft: "auto"
                            }}>
                                <Chip label={formattedDate} />
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 2, mt: 2 }} />
                        <Box sx={{ display: 'flex', gap: "8px" }}>
                            <Chip sx={{ backgroundColor: "primary.light" }} label={(Math.round(workshop.length / 60)) + " heures"} icon={<AccessTimeIcon />} />
                            <Chip sx={{ backgroundColor: "primary.light" }} label={workshop.maxPerson + " personnes max"} icon={<GroupIcon />} />
                        </Box>
                        <Typography sx={{ mt: 2 }}>
                            {workshop.theme.content.substring(0, 100) + "..."}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ marginTop: 'auto' }}>
                        <ColorButton onClick={() => navigate('/workshops/' + workshop.id)}>
                            Voir la fiche
                        </ColorButton>
                    </CardActions>
                </Card>
            );
        });
    };

    return (
        <>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    color: "white",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${herobanner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: { xs: "calc(100vh - 90px)", sm: "600px" },
                    maxHeight: { xs: "calc(100vh - 90px)", sm: "70vh" },
                    filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
                }}
            >

                <Stack
                    spacing={2}
                    alignItems="center"
                    marginTop='auto'
                    marginBottom='auto'
                    sx={{
                        padding: { xs: 2, sm: 4 },
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h1" className="d-shadow" sx={{
                        fontSize: { xs: '2rem', sm: '4.5rem' }
                    }}>Participez à des ateliers de dégustation de vin</Typography>
                    <Typography className="d-shadow">Envolez-vous dans un monde de saveurs et de découvertes</Typography>
                    <br />
                    <ColorButton variant='contained' startIcon={<Diversity3Icon />}
                        onClick={() => navigate('/workshops')}
                    >
                        Participer aux ateliers
                    </ColorButton>
                </Stack>
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
                    <TextImage
                        title="Explorez le Monde du Vin"
                        src="https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        button={
                            <ColorButton href="/concept" variant='contained' startIcon={<Diversity3Icon />}>
                                Découvrir le concept des ateliers
                            </ColorButton>
                        }
                    >
                        Plongez dans l'univers fascinant du vin avec nos ateliers de dégustation. Que vous soyez novice ou connaisseur, nos sessions sont conçues pour éveiller vos sens et enrichir votre palais.<br />
                        Découvrez les secrets des vignerons, les nuances des cépages, et partagez des moments inoubliables. Rejoignez-nous pour explorer, apprendre et savourer.<br /><br />
                        <strong>Votre voyage dans le monde du vin commence ici!</strong>
                    </TextImage>
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
                        src="https://images.pexels.com/photos/2440524/pexels-photo-2440524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        reverse
                        button={
                            <ColorButton variant='contained' startIcon={<Diversity3Icon />}
                                onClick={() => navigate('/workshops')}
                            >
                                Participer aux ateliers
                            </ColorButton>
                        }
                        sx={{
                            backgroundColor: { sm: 'rgba(199, 172, 146, 0.2)' },
                            borderRadius: '4px'
                        }}
                    >
                        Laissez-vous guider à travers le riche patrimoine viticole et affinez votre compréhension du vin avec nos ateliers éducatifs. De la vigne au verre, nos experts vous transporteront dans un voyage de découverte et d'apprentissage.<br />
                        Acquérez les compétences de dégustation, comprenez les subtilités des accords mets-vins et devenez un véritable connaisseur. Avec chaque gorgée, transformez votre curiosité en savoir.<br /><br />
                        <strong>Apprenez, dégustez, excellez.</strong>
                    </TextImage>
                </Box>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginTop: "2rem",
                        marginBottom: "2rem"
                    }}
                >
                    <Typography variant="h2">Prochains Ateliers</Typography>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5, marginBottom: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box mt={'40px'}
                            mb={'40px'}
                            component={'section'}
                            display={'flex'}
                            flexDirection={'row'}
                            justifyContent={'flex-start'}
                            flexWrap={'wrap'}
                            rowGap={'20px'}
                            columnGap={'1%'}
                        >
                            {data && (renderWorkshopCards())}
                        </Box>
                    )}
                </Stack>

                {/* Qui suis-je ? */}
                <Typography sx={{
                    fontWeight: '700',
                    fontSize: '2rem'
                }}>
                    Qui suis-je ?
                </Typography>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        marginTop: "2rem",
                        marginBottom: "4rem",
                        width: '100%'
                    }}
                >
                    <Box
                        component={'section'}
                        margin={'0'}
                        width={1}
                    >
                        <Card sx={{
                            margin: 'auto',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(199, 172, 146, 0.2)',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                            },
                            display: 'flex',
                            width: '100%',
                            padding: '0 20px'
                        }}>
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}>
                                <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>
                                    Mon nom est
                                </Typography>
                                <Typography variant='h1' sx={{ marginBottom: '1rem', textAlign: 'center' }}>
                                    Olivier Bonneton
                                </Typography>
                                <Typography variant="body1" component="p" sx={{ marginBottom: '1rem' }}>
                                    Découvrez qui je suis et ce que je fais. En tant que passionné de vin, je vous invite à explorer mon univers et à en apprendre davantage sur ma passion pour les cépages, les terroirs et les techniques de dégustation. Plongez dans mon expertise dans le domaine viticole et laissez-vous guider à travers un voyage gustatif unique et enrichissant.
                                </Typography>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="contained" color="secondary" sx={{ color: 'white' }}
                                        onClick={() => navigate('/about')}
                                    >
                                        Voir plus
                                    </Button>
                                </CardActions>
                            </CardContent>

                            <Box
                                component={'img'}
                                src={Olivier}
                                sx={{
                                    margin: 'auto',
                                    backgroundPosition: 'center',
                                    objectFit: 'cover',
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '4px'
                                }}
                            />
                        </Card>

                    </Box>
                </Stack>

            </Container>

        </>

    )
}

export default Home;

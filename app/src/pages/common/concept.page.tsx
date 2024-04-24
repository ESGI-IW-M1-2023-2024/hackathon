import winecave from "@/assets/concept/wine-cave.jpg";
import wineglasses from "@/assets/concept/wine-glasses.jpg";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LiquorIcon from '@mui/icons-material/Liquor';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Stack from '@mui/material/Stack';
import { Container, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ColorButton from "@/features/UI/custom-mui-components/components/custom-button.component";

export default function OutlinedCard() {

    return (
        <>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    color: "white",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${winecave})`,
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
                    }}>Découverte et dégustations de vins</Typography>
                    <Typography className="d-shadow">Un voyage à travers les saveurs</Typography>
                    <br />
                    <ColorButton href="/workshops" variant='contained' startIcon={<Diversity3Icon />}>

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
                    marginTop={'6rem'}
                    marginBottom={'4rem'}
                >
                    <Typography
                        sx={{
                            textAlign: { xs: 'justify', sm: 'left' }
                        }}
                    >
                        Rejoignez-nous pour un <strong>atelier exceptionnel</strong> de dégustation de vins dans un cadre historique et enchanteur.<br />
                        Au cours de cet événement de deux heures trente, vous serez guidé par les principes de la prestigieuse formation Wine and Spirit Education Trust (WSET).<br />
                        Découvrez les secrets des vins de diverses régions, que ce soit les nuances délicates des blancs, la profondeur des rouges, ou l'unicité des spécialités régionales.
                        Chaque session offre une palette unique de six vins soigneusement sélectionnés pour enrichir votre expérience et éveiller vos sens.<br />
                        Vous perfectionnerez votre aptitude à identifier les arômes, les saveurs et à caractériser un vin en utilisant un vocabulaire précis et adapté.
                    </Typography>
                </Box>

                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    justifyContent={'space-between'}
                    marginTop={'4rem'}
                    marginBottom={'4rem'}
                    gap={"20px"}
                    alignItems={'center'}
                >
                    <Box
                        component={'section'}
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        marginTop={'2rem'}
                        marginBottom={'2rem'}
                    >
                        <Typography variant="h3">Différents thèmes vous sont proposés</Typography>
                        <Typography>Participez aux ateliers vous faisant voyager à travers les différentes régions de France ou partez à l'étranger en vous laisant guider par les saveurs de nos vins du monde entier !</Typography>
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 1,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                mt: 2,
                                maxHeight: 300,
                                '& ul': { padding: 0 },
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                    backgroundColor: '#D5C1AE'
                                },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                                    borderRadius: '10px',
                                    backgroundColor: '#D5C1AE'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#660033',
                                    borderRadius: '10px'
                                }
                            }}
                            subheader={<li />}
                        >
                            {[0, 1, 2, 3, 4].map((sectionId) => (
                                <ul>
                                    <ListSubheader sx={{ fontSize: '18px', padding: 0 }}>{'France'}</ListSubheader>
                                    {[0, 1, 2].map((item) => (
                                        <ListItem key={`item-${sectionId}-${item}`} sx={{ padding: 0, paddingRight: 2 }}>
                                            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#D5C1AE80', gap: 4, width: 1, padding: 2, marginBottom: 2, position: 'relative' }}>
                                                <div className={'curve'} />
                                                <LiquorIcon />
                                                <Stack>
                                                    <p style={{ fontWeight: 600, fontSize: '20px' }}>
                                                        Ma première dégustation : Tour de France
                                                    </p>
                                                    <p color='text.secondary'>
                                                        Ceci est une description de l'atelier !
                                                    </p>
                                                </Stack>
                                            </Card>
                                        </ListItem>
                                    ))}
                                </ul>
                            ))}
                        </List>
                        <p style={{ marginTop: '2rem' }}><strong>Dégustez, apprenez, voyagez !</strong></p>
                    </Box>

                    <Box
                        component={'img'}
                        className="d-shadow"
                        sx={{
                            width: { xs: '100%', sm: '200px', md: '400px' },
                            height: { xs: 'auto', sm: '200px', md: '400px' },
                            objectFit: "cover",
                            borderRadius: "4px",
                            aspectRatio: "1/1",
                        }}
                        src={wineglasses}
                        alt="wine glasses"
                    />
                </Box>

                {/* Section "les modalités" */}
                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={{ xs: 'column-reverse', sm: 'row' }}
                    justifyContent={'space-between'}
                    marginTop={'4rem'}
                    marginBottom={'4rem'}
                    alignItems={'center'}
                    gap={"20px"}
                >
                    {/* Image de gauche */}
                    {/* <Box
                        component={'img'}
                        className="d-shadow"
                        // masquer pour les petits écrans
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            width: { xs: '100%', sm: '200px', md: '400px' },
                            height: { xs: 'auto', sm: '200px', md: '400px' },
                            objectFit: "cover",
                            borderRadius: "4px",
                            aspectRatio: "1/1",
                        }}
                        src={wineglasses}
                    /> */}
                    {/* bloc de droite */}
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={'10px'}
                    >


                        <Typography variant="h3">Les modalités</Typography>
                        <Typography>Pour participer à notre atelier de vin, remplissez le formulaire d'inscription en ligne et effectuez le paiement selon les instructions fournies. Assurez-vous de consulter notre calendrier pour la date et l'heure de l'atelier, et prévoyez d'arriver à l'heure pour profiter pleinement de l'expérience.</Typography>

                        {/* ticket */}
                        <Stack
                            alignSelf={'center'}
                            direction={{ xs: 'column', sm: 'row' }}
                            width={{ xs: '90%', sm: '600px' }}
                            height={{ xs: 'auto', sm: '200px' }}
                            justifyContent={'center'}
                            position={'relative'}
                            marginTop={'2rem'}
                        >
                            {/* première partie du ticket */}
                            <Card
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#f5f9ee',
                                    //backgroundColor: '#555',
                                    width: { xs: '100%', sm: '1' },
                                    //height: { xs: '70%', sm: '1' },
                                    borderRadius: { xs: '6px 6px 0 0', sm: '6px 0 0 6px' }
                                }}
                            >
                                {/* petit rond */}
                                <Typography
                                    component="span"
                                    sx={{
                                        padding: '25px 25px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        position: 'absolute',
                                        left: '-40px',
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 5,
                                        textAlign: 'center'
                                    }}
                                >
                                    <p style={{ marginBottom: '10px' }}>
                                        Comprend la dégustation des vins autour de planches apéritives
                                    </p>
                                    <p style={{ marginBottom: '10px' }}>
                                        Atelier limité à 14 personnes
                                    </p>
                                    <Chip icon={<WatchLaterIcon />} label="De 18h à 20h30" />
                                </CardContent>
                            </Card>

                            {/* deuxième partie du ticket */}
                            <Card
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#BA9878',
                                    width: { xs: '100%', sm: '1' },
                                    borderRadius: { xs: '0 0 6px 6px', sm: '0 6px 6px 0' },
                                    position: 'relative',
                                    borderRight: 0,
                                    borderStyle: 'none',
                                    color: '#fff',
                                    borderLeft: { sm: 'dashed' },
                                    borderTop: { xs: 'dashed', sm: 'none' },
                                    borderLeftColor: '#fff'
                                }}
                            >

                                <CardContent sx={{ textAlign: 'center' }}>
                                    <p style={{ color: '#fff' }}>À partir de</p>
                                    <p style={{ marginLeft: 5, marginRight: 5, fontSize: '22px', fontWeight: 600 }}>
                                        30€*
                                    </p>
                                    <p>
                                        par personne
                                    </p>
                                    <p style={{ fontStyle: 'italic', fontSize: '12px', marginTop: '1rem' }}>
                                        * Prix variable selon l'activité
                                    </p>
                                </CardContent>
                                <span
                                    style={{
                                        padding: '25px 25px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        position: 'absolute',
                                        right: '-40px',
                                    }}
                                ></span>

                            </Card>

                        </Stack>
                        {/* fin ticket */}
                        <Typography sx={{
                            marginTop: { sm: '2rem' },
                            textAlign: 'center'
                        }}>
                            <strong>Réservez vite votre place !</strong>
                        </Typography>
                    </Box>
                </Box>

                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginBottom={'2rem'}
                >
                    <ColorButton href="/workshops" variant='contained' startIcon={<Diversity3Icon />} className="d-shadow">
                        Participer aux ateliers
                    </ColorButton>
                </Box>
            </Container >
        </>
    );
}
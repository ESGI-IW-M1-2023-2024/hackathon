import Navbar from "@/features/UI/common/components/navbar";
import winecave from "@/assets/concept/wine-cave.jpg";
import wineglasses from "@/assets/concept/wine-glasses.jpg";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LiquorIcon from '@mui/icons-material/Liquor';
import Button, { ButtonProps } from '@mui/material/Button';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#660033'),
    backgroundColor: '#660033',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#B9515B',
    },
}));

export default function OutlinedCard() {

    return (
        <>
           <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
        color: "white",
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${winecave})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh"
    }}
>
    <Navbar transparent={true} />
    <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', textShadow: '1px 1px 2px black' }}>
        <h2 className="d-shadow" style={{ fontWeight: 400 }}>Découverte et dégustations de vins</h2>
        <p className="d-shadow" style={{ marginBottom: '2rem' }}>Un voyage à travers les saveurs</p>
        <ColorButton variant='contained' startIcon={<Diversity3Icon />} className="d-shadow">
            Participer aux ateliers
        </ColorButton>
    </div>
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
                    <p>Rejoignez-nous pour un atelier exceptionnel de dégustation de vins dans un cadre historique et enchanteur.
                        Au cours de cet événement de deux heures trente, vous serez guidé par les principes de la prestigieuse formation Wine and Spirit Education Trust (WSET).
                        Découvrez les secrets des vins de diverses régions, que ce soit les nuances délicates des blancs, la profondeur des rouges, ou l'unicité des spécialités régionales.
                        Chaque session offre une palette unique de six vins soigneusement sélectionnés pour enrichir votre expérience et éveiller vos sens.
                        Vous perfectionnerez votre aptitude à identifier les arômes, les saveurs et à caractériser un vin en utilisant un vocabulaire précis et adapté.
                    </p>
                </Box>

                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginTop={'6rem'}
                    marginBottom={'6rem'}
                    gap={'7rem'}
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
                        <h4>Différents thèmes vous sont proposés</h4>
                        <p>Participez aux ateliers vous faisant voyager à travers les différentes régions de France ou partez à l'étranger en vous laisant guider par les saveurs de nos vins du monde entier !</p>
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 1,
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
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
                                                        <p style={{ fontWeight: 600, fontSize: '20px'}}>
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
                        sx={{ width: 400, height: 400, objectFit: 'cover' }}
                        src={wineglasses}
                    />
                </Box>

                <Box
                    component={'section'}
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    marginTop={'8rem'}
                    marginBottom={'8rem'}
                    gap={'8rem'}
                    alignItems={'center'}
                >
                    <Box
                        component={'img'}
                        className="d-shadow"
                        sx={{ width: 400, height: 400, objectFit: 'cover' }}
                        src={wineglasses}
                    />
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        gap={'10px'}    
                    >

                        <h3>Les modalités</h3>
                        <p>Pour participer à notre atelier de vin, remplissez le formulaire d'inscription en ligne et effectuez le paiement selon les instructions fournies. Assurez-vous de consulter notre calendrier pour la date et l'heure de l'atelier, et prévoyez d'arriver à l'heure pour profiter pleinement de l'expérience.</p>
                        <Stack direction='row' width={'600px'} height={'200px'} justifyContent={'center'}>
                            <Card sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f9ee', width: 1, borderRadius: '6px 0 0 6px', borderRight: 'dashed' }}>
                                <span style={{ padding: '24px 25px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', right: '800px' }}></span>
                                <CardContent sx={{ flex: 1, justifyContent: 'center', display: 'flex', flexDirection: 'column', padding: 5, textAlign: 'center' }}>
                                    <p style={{ marginBottom: '10px' }}>
                                        Comprend la dégustation des vins et des planches apéritives
                                    </p>
                                    <p style={{ marginBottom: '10px' }}>
                                        Atelier limité à 14 personnes
                                    </p>
                                    <Chip icon={<WatchLaterIcon />} label="De 18h à 20h30" />
                                </CardContent>
                            </Card>
                            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#BA9878', width: '50%', borderRadius: '0 6px 6px 0', position: 'relative', borderRight: 0, borderStyle: 'none', color: '#fff' }}>
                                <span style={{ padding: '24px 25px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', left: '190px' }}></span>
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
                            </Card>
                        </Stack>
                        <p style={{ marginTop: '2rem' }}><strong>Réservez vite votre place !</strong></p>
                    </Box>
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
                    <ColorButton variant='contained' startIcon={<Diversity3Icon />} className="d-shadow">
                        Participer aux ateliers
                    </ColorButton>
                </Box>
            </Container>
        </>
    );
}
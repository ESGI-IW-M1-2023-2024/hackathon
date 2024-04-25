import Stack from '@mui/material/Stack';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import bottles from "@/assets/about/bottle.jpg";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import wineglasses from "@/assets/concept/wine-glasses.jpg";
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Olivier from '@/assets/about/olivier.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WineBarIcon from '@mui/icons-material/WineBar';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

const data = [
    {
        link: 'https://images.unsplash.com/photo-1598306442837-613a3def54ff?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        link: 'https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        link: 'https://images.unsplash.com/photo-1585803085621-7eea6581caec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        link: 'https://images.unsplash.com/photo-1529264978834-666a0e99f884?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        link: 'https://images.unsplash.com/photo-1641830879467-e22004141bcb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },

]

const cardData = [
    {
        icon: WineBarIcon,
        title: "Passion pour le vin",
        text: "Passionné depuis des années par le monde du vin, j'apporte une énergie contagieuse à chaque atelier, partageant avec vous mon amour pour les cépages et les terroirs."
    },
    {
        icon: WorkIcon,
        title: "Expertise professionnelle",
        text: "Fort d'une formation approfondie dans l'industrie viticole, je vous offre une expertise professionnelle pour explorer et apprécier chaque nuance de vin."
    },
    {
        icon: SchoolIcon,
        title: "Approche pédagogique",
        text: "Avec une approche pédagogique chaleureuse et accessible, je vous guide à travers les arômes, les saveurs et les techniques de dégustation, vous permettant de développer votre propre palais expert en vin."
    },
]

const About = () => {

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
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bottles})`,
                    backgroundSize: "cover",
                    backgroundPosition: "55% 95%",
                    height: "70vh",
                    marginBottom: '2rem'
                }}
            >
                <Typography component='div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: '4rem 0 0 15rem'}}>
                    <Typography component='div' style={{ textAlign: 'left', width: '30%' }}>
                        <Typography variant='h1' className="d-shadow" style={{ fontWeight: 400, fontSize: '80px', marginBottom: '2rem'}}>À propos</Typography>
                        <Typography className="d-shadow" style={{ marginBottom: '2rem' }}>Dans le monde du vin, chaque bouteille raconte une histoire. Découvrez la passion et l'expertise qui animent Olivier Bonneton, votre guide dans cette aventure gustative.</Typography>
                    </Typography>
                </Typography>
            </Stack>

            <Container component='main'>

                {/* Texte intro */}
                <Box
                    component={'section'}
                    width={'90%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    margin={'auto'}
                    paddingTop={'2rem'}
                    textAlign={'justify'}
                    alignItems={'center'}
                >
                    <Typography className='about'>Depuis des années, j'ai exploré les vignobles du monde entier, goûté des cépages uniques et partagé ma passion avec d'autres amateurs de vin.
                        Ma mission est de vous offrir une expérience sensorielle inoubliable à travers mes ateliers de dégustation de vin. Que vous soyez novice ou connaisseur, chaque séance est conçue pour élargir vos horizons, approfondir vos connaissances et éveiller vos papilles.
                        Guidé par les principes de la prestigieuse formation Wine and Spirit Education Trust (WSET), je vous invite à explorer les subtilités des vins régionaux et internationaux, à découvrir les accords mets-vins exquis et à perfectionner votre palais pour apprécier pleinement chaque gorgée.
                        Rejoignez-moi pour un voyage captivant à travers les vignobles du monde, où chaque verre raconte une histoire et chaque dégustation est une célébration de l'art de vivre. Venez découvrir l'essence même du vin avec moi, Olivier, et laissez-vous emporter par la magie des saveurs, des arômes et des rencontres inoubliables.
                        Au plaisir de partager ensemble une aventure vinicole enrichissante et passionnante.
                        <Typography component='div' style={{ display: 'flex', justifyContent: 'left', gap: '10px', marginTop: '20px' }}>
                            <Typography component='a' href="#"><LinkedInIcon /></Typography>
                            <Typography component='a' href="#"><EmailIcon /></Typography>
                        </Typography>
                    </Typography>
                    <Avatar alt="Olivier Bonneton" sx={{ width: '300px', height: '300px' }} src={Olivier} />
                </Box>

                {/* Compétences */}
                <Box
                    component={'section'}
                    margin={'auto'}
                    width={'90%'}
                >
                    <Typography variant='h1' marginBottom={'2rem'}>
                        Passion et savoir-faire
                    </Typography>
                    <Box
                        component={'section'}
                        margin={'auto'}
                        display={'flex'}
                        gap={'2rem'}
                        textAlign={'center'}
                    >
                        {cardData.map((index) => (
                            <Card sx={{
                                width: '100%',
                                backgroundColor: 'rgba(199, 172, 146, 0.2)',
                                boxShadow: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                            }}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '2rem',
                                    }}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            backgroundColor: 'secondary.main',
                                            display: { xs: 'none', sm: 'flex' },
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <index.icon sx={{ fontSize: '3rem', color: '#fff' }} />
                                    </Typography>
                                    <Typography variant='h4'>
                                        {index.title}
                                    </Typography>
                                    <Typography>
                                        {index.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>

                {/* Galerie photos */}
                <Box
                    component={'section'}
                    margin={'auto'}
                    width={'90%'}
                >
                    <Typography variant='h1' sx={{ marginBottom: '2rem', marginTop: '2rem' }}>Galerie photos</Typography>
                    <Box
                        className='grid'
                    >
                        {data.map((index) => (
                            <div className="item" style={{ backgroundImage: `url(${index.link})` }}></div>
                        ))}
                    </Box>
                </Box>

                {/* Formulaire de contact */}
                <Box
                    component={'section'}
                    width={'90%'}
                    display={'flex'}
                    flexDirection={'row'}
                    margin={'auto'}
                    paddingTop={'4rem'}
                    paddingBottom={'4rem'}
                >
                    <Stack gap={'4rem'} flexDirection={'row'} alignContent={'center'} alignItems={'flex-end'}>
                        <Stack alignItems={'center'} alignContent={'center'}>
                            <Typography variant='h1' sx={{ fontSize: '80px', marginBottom: '2rem' }}>Une question ?</Typography>
                            <Box
                                component={'img'}
                                className="d-shadow"
                                sx={{ width: 600, height: 300, objectFit: 'cover' }}
                                src='https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            />
                        </Stack>
                        <FormControl sx={{ gap: 2 }}>
                            <Input placeholder='Email' aria-describedby="my-helper-text" />
                            <FormHelperText id="my-helper-text">Nous ne partagerons jamais votre adresse mail.</FormHelperText>
                            <Input placeholder='Nom' />
                            <Input placeholder='Prénom' />
                            <TextField sx={{
                                '& .MuiInputBase-input': {
                                    height: '8rem',
                                }
                            }} placeholder='Demande' helperText="Renseignez votre demande ou votre question." />
                        </FormControl>
                    </Stack>
                </Box>

            </Container>

        </>
    )
}

export default About;
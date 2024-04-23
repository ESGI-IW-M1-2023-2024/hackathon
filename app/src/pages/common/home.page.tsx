import Navbar from "@/features/UI/common/components/navbar";
import { Button, ButtonProps, Container, Stack, styled } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import herobanner from "@/assets/homepage/herobanner.jpg";

const Home = () => {

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
                <ColorButton variant='contained' startIcon={<Diversity3Icon />}>
                    Participer aux ateliers
                </ColorButton>
            </Container>
        </>

    )
}

export default Home;

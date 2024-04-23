import logoImg from '@/assets/common/navbar/logo.png'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Navbar = () => {
    const { palette } = useTheme()

    return (
        <Stack
            component="nav"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            sx={{
                backgroundColor: palette.secondary.main,
                color: palette.secondary.contrastText,
            }}
        >
            <Box
                component="a"
                href="/"
                display="block"
                width="70px"
            >
                <Box
                    component="img"
                    src={logoImg}
                    alt="logo"
                    width="100%"
                />
            </Box>
            <Stack direction="row" spacing={2}
                sx={{
                    '& > a': {
                        'font-weight': 'bold',
                    }
                }}
            >
                <a href="#">Ateliers</a>
                <a href="#">Ressources</a>
                <a href="#">A propos</a>
                <a href="#"><LinkedInIcon /></a>
            </Stack>
        </Stack>
    )
}

export default Navbar
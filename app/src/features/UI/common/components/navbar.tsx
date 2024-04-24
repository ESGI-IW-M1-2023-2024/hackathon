import logoImg from '@/assets/common/navbar/logo.svg'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const Navbar = (props: any) => {
    const { palette } = useTheme()

    return (
        <Stack
            component="nav"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingInline={5}
            sx={{
                backgroundColor: props.transparent ? palette.secondary.main : "transparent",
                color: palette.secondary.contrastText,
                width: '100%',
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Box
                    component="a"
                    href="/"
                    display="block"
                    height="90px"
                    padding={2}
                >
                    <Box
                        component="img"
                        src={logoImg}
                        alt="logo"
                        height="100%"
                        className='d-shadow'
                    />
                </Box>
                <Box
                    className="d-shadow"
                    sx={{
                        fontSize: "2.5rem",
                        fontFamily: 'MonteCarlo',
                        fontWeight: 400,
                        fontStyle: 'normal',
                    }}
                >
                    Bœnnologie
                </Box>
            </Stack>
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
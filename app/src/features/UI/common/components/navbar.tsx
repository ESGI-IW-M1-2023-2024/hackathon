import logoImg from '@/assets/common/navbar/logo.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      component='nav'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      paddingInline={5}
      sx={{
        backgroundColor: palette.secondary.main,
        color: palette.secondary.contrastText,
        width: '100%',
      }}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <Box component='a' href='/' display='block' height='90px' padding={2}>
          <Box component='img' src={logoImg} alt='logo' height='100%' className='d-shadow' />
        </Box>
        <Box
          component='a'
          href='/'
          className='d-shadow'
          sx={{
            fontSize: '2.5rem',
            fontFamily: 'MonteCarlo',
            fontWeight: 400,
            fontStyle: 'normal',
          }}
        >
          Bœnnologie
        </Box>
      </Stack>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          '& > a': {
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
          },
        }}
      >
        <Link href='/'>Accueil</Link>
        <Link href='/concept'>Concept</Link>
        <Link href='/workshops'>Ateliers</Link>
        <Link href='/about'>A propos</Link>
        <Link href='https://www.linkedin.com/in/olivier-bonneton-5a320020'>
          <LinkedInIcon />
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;

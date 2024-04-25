import logoImg from '@/assets/common/navbar/logo.svg';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Button, Link, useTheme } from '@mui/material';
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
        <Button onClick={() => navigate('/')} sx={{ display: 'block', height: '90px', p: 2 }}>
          <Box component='img' src={logoImg} alt='logo' height='100%' className='d-shadow' />
        </Button>
        <Button
          onClick={() => navigate('/')}
          className='d-shadow'
          sx={{
            fontSize: '2.5rem',
            fontFamily: 'MonteCarlo',
            fontWeight: 400,
            fontStyle: 'normal',
          }}
        >
          Bœnnologie
        </Button>
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
        <Button onClick={() => navigate('/')}>Accueil</Button>
        <Button onClick={() => navigate('/concept')}>Concept</Button>
        <Button onClick={() => navigate('/workshops')}>Ateliers</Button>
        <Button onClick={() => navigate('/about')}>A propos</Button>
        <Link href='https://www.linkedin.com/in/olivier-bonneton-5a320020'>
          <LinkedInIcon />
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;

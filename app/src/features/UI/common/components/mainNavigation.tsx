import { useState } from 'react';
import { useTheme, Link, Stack, Typography, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

//drawer elements used
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WineBarIcon from '@mui/icons-material/WineBar';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import logoImg from '@/assets/common/navbar/logo.svg';
import { LoggedUser } from '@/features/auth/types/logged-user.type';
import { useAppSelector } from '@/redux/hooks';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

export default function MainNavigation() {
  /*
    react useState hook to save the current open/close state of the drawer,
    normally variables dissapear afte the function was executed
    */
  const [open, setState] = useState(false);
  const { palette } = useTheme();
  const user: LoggedUser | null = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  /*
    function that is being called every time the drawer should open or close,
    the keys tab and shift are excluded so the user can focus between
    the elements with the keys
    */
  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const handleNavigationButtonClick = (link: string) => {
    toggleDrawer(false);
    navigate(link);
  };

  return (
    <AppBar
      position='static'
      id='main-navigation'
      sx={{
        backgroundColor: palette.secondary.main,
        color: palette.secondary.contrastText,
      }}
    >
      <Container maxWidth='lg' disableGutters={true}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <Stack direction='row' spacing={2} alignItems='center'>
            <Button onClick={() => navigate('/')} sx={{ display: 'block', height: '90px', padding: 2 }}>
              <Box component='img' src={logoImg} alt='logo' height='100%' className='d-shadow' />
            </Button>

            <Typography component={'a'} variant='h1' href='/' className='d-shadow'>
              Bœnnologie
            </Typography>
          </Stack>

          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
              '& > button': {
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
              },
            }}
          >
            {!user ? (
              <>
                <Button onClick={() => navigate('/')}>Accueil</Button>
                <Button onClick={() => navigate('/concept')}>Concept</Button>
                <Button onClick={() => navigate('/workshops')}>Ateliers</Button>
                <Button onClick={() => navigate('/about')}>A propos</Button>
                <Link href='https://www.linkedin.com/in/olivier-bonneton-5a320020' target='_blank' sx={{ color: 'white' }}>
                  <LinkedInIcon />
                </Link>
              </>
            ) : (
              <>
                <Dropdown>
                  <MenuButton slots={{ root: Link }} sx={{ backgroundColor: 'white' }}>
                    Liste des pages
                  </MenuButton>
                  <Menu slots={{ listbox: Listbox }} style={{ zIndex: 1 }}>
                    <MenuItem>
                      <Button onClick={() => navigate('/admin/themes')} color='secondary'>
                        Liste des thèmes
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button onClick={() => navigate('/admin/regions')} color='secondary'>
                        Liste des régions
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button onClick={() => navigate('/admin/organisations')} color='secondary'>
                        Liste des organisation
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button onClick={() => navigate('/admin/workshops')} color='secondary'>
                        Liste des ateliers
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button onClick={() => navigate('/admin/wines')} color='secondary'>
                        Liste des vins
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button onClick={() => navigate('/admin/workshops/calendar')} color='secondary'>
                        Calendrier des ateliers
                      </Button>
                    </MenuItem>
                  </Menu>
                </Dropdown>
                <Button onClick={() => navigate('/admin')}>Dashboard</Button>
                <Button onClick={() => navigate('/')}>Retour au site client</Button>
              </>
            )}
          </Stack>

          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: {
                xs: 'block',
                sm: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The outside of the drawer */}
          <Drawer
            anchor='right'
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
              width: '100vw',
              color: palette.secondary.contrastText,
            }}
          //onOpen={toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: palette.secondary.main,
                width: '100vw',
              }}
            >
              <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                <CloseIcon sx={{ color: palette.secondary.contrastText }} />
              </IconButton>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  mb: 2,
                  color: palette.secondary.contrastText,
                  '& > a': {
                    fontWeight: 'bold',
                    color: 'white',
                    textDecoration: 'none',
                  },
                }}
              >
                {!user ? (
                  <>
                    <Button onClick={() => handleNavigationButtonClick('/')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <WineBarIcon sx={{ color: palette.secondary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary='Accueil' />
                      </ListItemButton>
                    </Button>
                    <Button onClick={() => handleNavigationButtonClick('/concept')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <TipsAndUpdatesIcon sx={{ color: palette.secondary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary='Concept' />
                      </ListItemButton>
                    </Button>
                    <Button onClick={() => handleNavigationButtonClick('/workshops')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <GroupsIcon sx={{ color: palette.secondary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary='Ateliers' />
                      </ListItemButton>
                    </Button>
                    <Button onClick={() => handleNavigationButtonClick('/about')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <InfoIcon sx={{ color: palette.secondary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary='A propos' />
                      </ListItemButton>
                    </Button>
                  </>
                ) : (
                  <>
                    <Accordion
                      component='div'
                      aria-controls='panel1-content'
                      id='panel1-header'
                      style={{ background: palette.secondary.light, color: palette.secondary.contrastText }}
                      className={'navbar-accordion'}
                    >
                      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                        <ListItemButton>
                          <ListItemIcon>
                            <AdminPanelSettingsIcon sx={{ color: palette.secondary.contrastText }} />
                          </ListItemIcon>
                          <ListItemText primary='Admin' />
                        </ListItemButton>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Button onClick={() => handleNavigationButtonClick('/admin/themes')}>Liste des thèmes</Button>
                      </AccordionDetails>
                      <AccordionDetails>
                        <Button onClick={() => handleNavigationButtonClick('/admin/regions')}>Liste des régions</Button>
                      </AccordionDetails>
                      <AccordionDetails>
                        <Button onClick={() => handleNavigationButtonClick('/admin/organisations')}>
                          Liste des organisations
                        </Button>
                      </AccordionDetails>
                      <AccordionDetails>
                        <Button onClick={() => handleNavigationButtonClick('/admin/workshops')}>
                          Liste des ateliers
                        </Button>
                      </AccordionDetails>
                      <AccordionDetails>
                        <Button onClick={() => handleNavigationButtonClick('/admin/workshops/calendar')}>
                          Calendrier des ateliers
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                    <Button onClick={() => handleNavigationButtonClick('/admin')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <DashboardIcon sx={{ color: palette.secondary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                      </ListItemButton>
                    </Button>
                    <Button onClick={() => handleNavigationButtonClick('/')}>
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonIcon sx={{ color: palette.secondary.contrastText }} />
                        </ListItemIcon>
                        <ListItemText primary='Retour vers le site client' />
                      </ListItemButton>
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const red = {
  200: '#8F0047',
  300: '#660033',
  600: '#3D001F',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  z-index: 500  ;
  background: #fff;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'};
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? red[600] : red[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  a {
    color: black;
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? red[300] : red[200]};
    outline: none;
  }
`,
);

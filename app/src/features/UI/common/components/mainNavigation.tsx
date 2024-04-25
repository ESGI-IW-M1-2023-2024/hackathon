import { useState } from "react";
import { useTheme, Link, Stack, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WineBarIcon from '@mui/icons-material/WineBar';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import logoImg from '@/assets/common/navbar/logo.svg'

export default function MainNavigation() {

    /*
    react useState hook to save the current open/close state of the drawer,
    normally variables dissapear afte the function was executed
    */
    const [open, setState] = useState(false);
    const { palette } = useTheme()

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

    return (

        <AppBar position="static"
            sx={{
                backgroundColor: palette.secondary.main,
                color: palette.secondary.contrastText
            }}
        >
            <Container maxWidth="lg" disableGutters={true} >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 0,
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

                        <Typography
                            component={'a'}
                            variant='h1'
                            href="/"
                            className="d-shadow"
                        >
                            Bœnnologie
                        </Typography>
                    </Stack>


                    <Stack direction="row" spacing={2} alignItems="center"
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block',
                            },
                            '& > a': {
                                'fontWeight': 'bold',
                                'color': 'white',
                                'textDecoration': 'none',
                            }
                        }}
                    >
                        <Link href="/">Accueil</Link>
                        <Link href="/concept">Concept</Link>
                        <Link href="/workshops">Ateliers</Link>
                        <Link href="/about">A propos</Link>
                        <Link href="https://www.linkedin.com/in/olivier-bonneton-5a320020"><LinkedInIcon /></Link>
                    </Stack>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        sx={{
                            mr: 2,
                            display: {
                                xs: 'block',
                                sm: 'none',
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* The outside of the drawer */}
                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={toggleDrawer(false)}
                        sx={{
                            width: '100vw',
                            color: palette.secondary.contrastText
                        }}
                    //onOpen={toggleDrawer(true)}
                    >
                        {/* The inside of the drawer */}
                        <Box sx={{
                            p: 2,
                            height: 1,
                            backgroundColor: palette.secondary.main,
                            width: '100vw',
                        }}>

                            <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                                <CloseIcon sx={{ color: palette.secondary.contrastText }} />
                            </IconButton>

                            <Divider sx={{ mb: 2 }} />

                            <Box
                                sx={{
                                    mb: 2,
                                    color: palette.secondary.contrastText,
                                    '& > a': {
                                        'fontWeight': 'bold',
                                        'color': 'white',
                                        'textDecoration': 'none',
                                    }
                                }}>
                                <Link href="/" onClick={toggleDrawer(false)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <WineBarIcon sx={{ color: palette.secondary.contrastText }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Accueil" />
                                    </ListItemButton>
                                </Link>
                                <Link href="/concept" onClick={toggleDrawer(false)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <TipsAndUpdatesIcon sx={{ color: palette.secondary.contrastText }} />
                                        </ListItemIcon >
                                        <ListItemText primary="Concept" />
                                    </ListItemButton>
                                </Link>
                                <Link href="/workshops" onClick={toggleDrawer(false)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <GroupsIcon sx={{ color: palette.secondary.contrastText }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Ateliers" />
                                    </ListItemButton>
                                </Link>
                                <Link href="/about" onClick={toggleDrawer(false)}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoIcon sx={{ color: palette.secondary.contrastText }} />
                                        </ListItemIcon>
                                        <ListItemText primary="A propos" />
                                    </ListItemButton>
                                </Link>
                            </Box>
                        </Box>

                    </Drawer>


                </Toolbar>
            </Container>
        </AppBar>

    );
}
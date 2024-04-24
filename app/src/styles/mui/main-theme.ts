import { PaletteOptions, ThemeOptions, createTheme } from "@mui/material";
import { SnackbarOverride } from "./snackbar-override";

const theme = createTheme();

export const customPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#C7AC92",
    light: "#D5C1AE",
    dark: "#BA9878",
  },
  secondary: {
    main: "#660033",
    light: "#8F0047",
    dark: "#3D001F",
  },
};

export const customTypography = {
  fontFamily: "Montserrat, sans-serif",
  h1: {
    fontFamily: "MonteCarlo, cursive",
    fontSize: "3rem",
    fontWeight: "400",
    fontStyle: "normal",
  },
  h2: {
    fontFamily: "MonteCarlo, cursive",
    fontSize: "2.5rem",
    fontWeight: "400",
    fontStyle: "normal",
  },
  h3: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  h4: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  h5: {
    fontSize: "1rem",
  },
  h6: {
    fontSize: "0.875rem",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  strong: {
    fontWeight: "bold",
  },

}

export const themeOptions: ThemeOptions = {
  ...theme,
  palette: { ...customPalette },
  components: {
    ...SnackbarOverride(),
  },
  typography: { ...customTypography },
};

export default createTheme({ ...theme, ...themeOptions });

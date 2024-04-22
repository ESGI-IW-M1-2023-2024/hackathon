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

export const themeOptions: ThemeOptions = {
  ...theme,
  palette: { ...customPalette },
  components: {
    ...SnackbarOverride(),
  },
};

export default createTheme({ ...theme, ...themeOptions });

import { Components } from "@mui/material/styles";

export const SnackbarOverride = (): Pick<Components, "MuiSnackbar"> => {
  return {
    MuiSnackbar: {
      defaultProps: {
        autoHideDuration: 5000,
      },
      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
  };
};

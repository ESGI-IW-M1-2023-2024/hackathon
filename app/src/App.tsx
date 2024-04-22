import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/mui/main-theme";
import AppRoutes from "./config/app-routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;

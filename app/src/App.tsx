import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/mui/main-theme';
import Notification from './features/UI/common/components/notification.component';
import AppRoutes from './config/app-routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
      <Notification />
    </ThemeProvider>
  );
}

export default App;

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/mui/main-theme';
import Notification from './features/UI/common/components/notification.component';
import AppRoutes from './config/app-routes';
import Footer from './features/UI/common/components/footer';
import MainNavigation from './features/UI/common/components/mainNavigation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainNavigation />
      <AppRoutes />
      <Footer />
      <Notification />
    </ThemeProvider>
  );
}

export default App;

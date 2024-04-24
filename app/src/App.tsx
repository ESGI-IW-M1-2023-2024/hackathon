import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/mui/main-theme';
import Notification from './features/UI/common/components/notification.component';
import AppRoutes from './config/app-routes';
import Navbar from './features/UI/common/components/navbar';
import Footer from './features/UI/common/components/footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <AppRoutes />
      <Footer />
      <Notification />
    </ThemeProvider>
  );
}

export default App;

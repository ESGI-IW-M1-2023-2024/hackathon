import {Container, CssBaseline, ThemeProvider} from '@mui/material';
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
      <Container component={'main'} style={{paddingLeft:'0', paddingRight:'0', maxWidth:'unset'}}>
        <AppRoutes />
      </Container>
      <Footer />
      <Notification />
    </ThemeProvider>
  );
}

export default App;

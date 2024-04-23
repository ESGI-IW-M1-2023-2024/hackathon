import { Routes, Route } from 'react-router-dom';
import Home from '../pages/common/home.page';
import Login from '../pages/auth/login.page';
import NotFound from '../pages/common/not-found.page';
import SecureRoute from '@/features/auth/components/secure-route';
import Dashboard from '@/pages/admin/dashboard.page';
import ThemesList from '@/pages/admin/themes-list.page';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route element={<SecureRoute />}>
      <Route path='/admin' element={<Dashboard />} />
      <Route path='/themes' element={<ThemesList />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRoutes;

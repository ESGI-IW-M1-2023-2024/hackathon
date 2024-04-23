import { Routes, Route } from 'react-router-dom';
import Home from '../pages/common/home.page';
import Login from '../pages/auth/login.page';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
  </Routes>
);

export default AppRoutes;

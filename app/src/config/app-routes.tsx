import { Routes, Route } from 'react-router-dom';
import Home from '../pages/common/home.page';
import Login from '../pages/auth/login.page';
import NotFound from '../pages/common/not-found.page';
import SecureRoute from '@/features/auth/components/secure-route';
import Dashboard from '@/pages/admin/dashboard.page';
import Concept from '../pages/common/concept.page';
import ThemesList from '@/pages/admin/themes-list.page';
import RegionList from '@/pages/admin/region/list.page';
import CreateRegion from '@/pages/admin/region/create.page';
import EditTheme from '@/pages/admin/themes-edit.page';
import CreateTheme from '@/pages/admin/themes-create.page';
import EditRegion from '@/pages/admin/region/edit.page';
import OrganisationList from '@/pages/admin/organisation/list.page';
import CreateOrganisation from '@/pages/admin/organisation/create.page';
import EditOrganisation from '@/pages/admin/organisation/edit.page';
import WineList from '@/pages/admin/wine/list.page';
import CreateWine from '@/pages/admin/wine/create.page';
import EditWine from '@/pages/admin/wine/edit.page';
import About from '../pages/common/about.page';
import WorkshopList from '@/pages/common/workshop-list.page';
import Wine from '@/pages/common/wine.page';
import WorkshopDetails from '@/pages/common/workshop-details.page';
import AdminWorkshopList from '@/pages/admin/workshop/workshop-list.page';
import WorkshopCalendar from '@/pages/admin/workshop/calendar.page';
import CreateWorkshop from '@/pages/admin/workshop/create.page';
import EditWorkshop from '@/pages/admin/workshop/edit.page';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/concept' element={<Concept />} />
    <Route path='/about' element={<About />} />
    <Route path='/workshops' element={<WorkshopList />} />
    <Route path='/wines/:id' element={<Wine />} />
    <Route path='/workshops/:id' element={<WorkshopDetails />} />
    <Route element={<SecureRoute />}>
      <Route path='/admin' element={<Dashboard />} />
      <Route path='/admin/themes' element={<ThemesList />} />
      <Route path='/admin/themes/create' element={<CreateTheme />} />
      <Route path='/admin/themes/:id' element={<EditTheme />} />
      <Route path='/admin/regions' element={<RegionList />} />
      <Route path='/admin/regions/create' element={<CreateRegion />} />
      <Route path='/admin/regions/:id' element={<EditRegion />} />
      <Route path='/admin/organisations' element={<OrganisationList />} />
      <Route path='/admin/organisations/create' element={<CreateOrganisation />} />
      <Route path='/admin/organisations/:id' element={<EditOrganisation />} />
      <Route path='/admin/wines' element={<WineList />} />
      <Route path='/admin/wines/create' element={<CreateWine />} />
      <Route path='/admin/wines/:id' element={<EditWine />} />
      <Route path='/admin/workshops' element={<AdminWorkshopList />} />
      <Route path='/admin/workshops/create' element={<CreateWorkshop />} />
      <Route path='/admin/workshops/:id' element={<EditWorkshop />} />
      <Route path='/admin/workshops/calendar' element={<WorkshopCalendar />} />
    </Route>
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default AppRoutes;

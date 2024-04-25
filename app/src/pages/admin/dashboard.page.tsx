import DashboardButton from '@/features/UI/admin/dashboard-button.component';
import { Stack } from '@mui/material';

const Dashboard = () => {
  return (
    <Stack margin={'2rem auto'} alignItems={'center'} paddingInline={'2rem'} width={'100%'}>
      <h1>Admin dashboard</h1>
      <Stack direction={'row'} flexWrap={"wrap"}>
        <DashboardButton redirectPath='/admin/themes' text='Liste des Thèmes' />
        <DashboardButton redirectPath='/admin/regions' text='Liste des Régions' />
        <DashboardButton redirectPath='/admin/organisations' text='Liste des Organisations' />
        <DashboardButton redirectPath='/admin/workshops' text='Liste des Ateliers' />
        <DashboardButton redirectPath='/admin/workshops/calendar' text='Calendriers des Ateliers' />
      </Stack>
    </Stack>
  );
};

export default Dashboard;

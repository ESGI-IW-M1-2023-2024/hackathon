import DashboardButton from '@/features/UI/admin/dashboard-button.component';
import { Stack } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EventIcon from '@mui/icons-material/Event';
import LiquorIcon from '@mui/icons-material/Liquor';

const Dashboard = () => {
  return (
    <Stack margin={'2rem auto'} alignItems={'center'} paddingInline={'2rem'} width={'100%'}>
      <h1>Admin dashboard</h1>
      <Stack direction={'row'} flexWrap={"wrap"}>
        <DashboardButton redirectPath='/admin/workshops' text='Ateliers' icon={<HomeRepairServiceIcon fontSize='large' />} />
        <DashboardButton redirectPath='/admin/workshops/calendar' text='Calendrier' icon={<EventIcon fontSize='large' />} />
        <DashboardButton redirectPath='/admin/organisations' text='Organisations' icon={<SchoolIcon fontSize='large' />} />
        <DashboardButton redirectPath='/admin/regions' text='Régions' icon={<FlagIcon fontSize='large' />} />
        <DashboardButton redirectPath='/admin/themes' text='Thèmes' icon={<ClassIcon fontSize='large' />} />
        <DashboardButton redirectPath='/admin/wines' text='Vins' icon={<LiquorIcon fontSize='large' />} />
      </Stack>
    </Stack>
  );
};

export default Dashboard;

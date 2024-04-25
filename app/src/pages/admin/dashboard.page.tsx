import { Button, Card, CardActions, CardContent, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Stack
      margin={'2rem auto'}
      alignItems={'center'}
      paddingInline={'2rem'}
      width={'100%'}>
      <h1>Admin dashboard</h1>
      <Stack direction={'row'}>
        <Card onClick={() => navigate('/themes')}
          sx={{ backgroundColor: '#c7ac92', fontSize: '36px', textAlign: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', maxWidth: 300, minWidth: 300, height: 150, margin: 2, display: 'flex', flexDirection: 'column' }}
        >
          Liste des Thèmes
        </Card>
        <Card onClick={() => navigate('/admin/regions')}
          sx={{ backgroundColor: '#c7ac92', fontSize: '36px', textAlign: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', maxWidth: 300, minWidth: 300, height: 150, margin: 2, display: 'flex', flexDirection: 'column' }}
        >
          Liste des Régions
        </Card>
        <Card onClick={() => navigate('/admin/organisations')}
          sx={{ backgroundColor: '#c7ac92', fontSize: '36px', textAlign: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', maxWidth: 300, minWidth: 300, height: 150, margin: 2, display: 'flex', flexDirection: 'column' }}
        >
          Liste des Organisations
        </Card>
      </Stack>
      <Stack direction={"row"}>
        <Card onClick={() => navigate('/admin/workshops/calendar') }
          sx={{ backgroundColor: '#c7ac92', fontSize: '36px', textAlign: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', maxWidth: 300, minWidth: 300, height: 150, margin: 2, display: 'flex', flexDirection: 'column' }}
        >
          Calendrier des Ateliers
        </Card>
      </Stack>

    </Stack>

  );
};

export default Dashboard;

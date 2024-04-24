import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Admin dashboard</h1>
      <Button variant='contained' onClick={() => navigate('/themes')}>
        Liste des thèmes
      </Button>
        <Button variant='contained' onClick={() => navigate('/admin/regions')}>
            Liste des régions
        </Button>
    </>
  );
};

export default Dashboard;

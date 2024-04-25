import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DashboardButtonProps {
  text: string;
  redirectPath: string;
}

const DashboardButton = ({ text, redirectPath }: DashboardButtonProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(redirectPath)}
      sx={{
        backgroundColor: '#c7ac92',
        fontSize: '36px',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 300,
        minWidth: 300,
        height: 150,
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {text}
    </Card>
  );
};

export default DashboardButton;

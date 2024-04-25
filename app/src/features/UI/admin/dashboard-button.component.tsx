import { Card, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DashboardButtonProps {
  text: string;
  redirectPath: string;
  icon: JSX.Element;
}

const DashboardButton = ({ text, redirectPath, icon }: DashboardButtonProps) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(redirectPath)}
      sx={{
        backgroundColor: '#c7ac92',
        fontSize: '24px',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 220,
        height: 90,
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'} spacing={2}>
        {icon}
        {text}
      </Stack>

    </Card>
  );
};

export default DashboardButton;

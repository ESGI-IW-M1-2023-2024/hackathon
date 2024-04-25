import { useGetWorkshopsQuery } from '@/redux/api/api.slice';
import { CircularProgress, Typography } from '@mui/material';

const WorkshopList = () => {
  const { data, isLoading } = useGetWorkshopsQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  console.log(data);

  return (
    <>
      <Typography variant='h1'>Liste des ateliers</Typography>
      {data && (
        <ul>
          {data.items.map((workshop) => (
            <li>{workshop.theme ? workshop.theme.label : 'titleless'}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WorkshopList;

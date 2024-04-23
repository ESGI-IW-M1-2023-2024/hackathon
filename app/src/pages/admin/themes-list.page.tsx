import { useGetThemesQuery } from '@/redux/api/api.slice';
import { LinearProgress } from '@mui/material';

const ThemesList = () => {
  const { data, isLoading } = useGetThemesQuery();

  if (isLoading) {
    return <LinearProgress />;
  }

  console.log(data);

  return <h1>Liste des Thèmes</h1>;
};

export default ThemesList;

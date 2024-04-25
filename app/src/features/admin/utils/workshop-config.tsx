import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useWorkshopColumns = ({
  handleDeleteWorkshop,
}: {
  handleDeleteWorkshop: (id: number) => Promise<void>;
}): GridColDef[] => {
  const navigate = useNavigate();

  return [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: 'dateStart',
      headerName: 'Date de début',
      flex: 1,
    },
    {
      field: 'label',
      headerName: 'Nom du thème',
      flex: 1,
      renderCell: (params) => params.row.theme.label,
    },
    {
      field: 'numberOfBookings',
      headerName: "Nombre d'inscrits",
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return [
          <Tooltip key='editWorkshop' title='Editer'>
            <IconButton onClick={() => navigate(`/workshops/${params.row.id}`)} color='primary'>
              <EditIcon />
            </IconButton>
          </Tooltip>,
          <Tooltip key='deleteWorkshop' title='Supprimer'>
            <IconButton onClick={() => handleDeleteWorkshop(params.row.id)} color='secondary'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
};

export default useWorkshopColumns;

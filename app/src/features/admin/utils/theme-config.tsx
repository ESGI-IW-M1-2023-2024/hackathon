import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useThemeColumns = ({ handleDeleteTheme }: { handleDeleteTheme: (id: number) => Promise<void> }): GridColDef[] => {
  const navigate = useNavigate();

  return [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: 'label',
      headerName: 'Nom',
      flex: 1,
    },
    {
      field: 'archived',
      headerName: 'Archivé',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => (params.value ? <CancelIcon color='error' /> : <CheckCircleIcon color='success' />),
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
          <Tooltip key='editTheme' title='Editer'>
            <IconButton onClick={() => navigate(`/themes/${params.row.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>,
          <Tooltip key='deleteTheme' title='Supprimer'>
            <IconButton onClick={() => handleDeleteTheme(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
};

export default useThemeColumns;

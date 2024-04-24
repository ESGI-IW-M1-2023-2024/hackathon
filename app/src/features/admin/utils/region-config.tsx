import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useRegionColumns = ({ handleDeleteRegion }: { handleDeleteRegion: (id: number) => Promise<void> }): GridColDef[] => {
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
      field: 'countryName',
      headerName: 'Pays',
      flex: 1,
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
          <Tooltip key='editRegion' title='Editer'>
            <IconButton onClick={() => navigate(`/admin/regions/${params.row.id}`)} color='primary'>
              <EditIcon />
            </IconButton>
          </Tooltip>,
          <Tooltip key='deleteRegion' title='Supprimer'>
            <IconButton onClick={() => handleDeleteRegion(params.row.id)} color='secondary'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
};

export default useRegionColumns;

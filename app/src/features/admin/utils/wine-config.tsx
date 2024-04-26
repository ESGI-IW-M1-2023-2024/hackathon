import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const useWineColumns = ({
  handleDeleteWine,
  handleUpdateQuantity,
}: {
  handleDeleteWine: (id: number) => Promise<void>;
  handleUpdateQuantity: ({ id, quantity }: { id: number; quantity: number }) => Promise<void>;
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
      field: 'label',
      headerName: 'Nom',
      flex: 1,
    },
    {
      field: 'productYear',
      headerName: 'Année de production',
      flex: 0.5,
    },
    {
      field: 'producer',
      headerName: 'Producteur',
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantité',
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton
            color='error'
            onClick={() => handleUpdateQuantity({ id: params.row.id, quantity: params.value - 1 })}
          >
            <RemoveIcon />
          </IconButton>
          {params.row.quantity}
          <IconButton
            color='success'
            onClick={() => handleUpdateQuantity({ id: params.row.id, quantity: params.value + 1 })}
          >
            <AddIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: 'bottleSize',
      headerName: 'Taille de bouteille',
      flex: 1,
    },
    {
      field: 'region',
      headerName: 'Région',
      flex: 0.5,
      renderCell: (params) => params.row.region.label,
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
          <Tooltip key='editWine' title='Editer'>
            <IconButton onClick={() => navigate(`/admin/wines/${params.row.id}`)} color='primary'>
              <EditIcon />
            </IconButton>
          </Tooltip>,
          <Tooltip key='deleteWine' title='Supprimer'>
            <IconButton onClick={() => handleDeleteWine(params.row.id)} color='secondary'>
              <DeleteIcon />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
};

export default useWineColumns;

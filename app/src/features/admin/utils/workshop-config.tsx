import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { WorkshopStatus } from '../types/workshop.types';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const renderStatus = (status: WorkshopStatus) => {
  switch (status) {
    case WorkshopStatus.BOOKING:
      return 'Ouvert au inscriptions';
    case WorkshopStatus.CANCELED:
      return 'Annulé';
    case WorkshopStatus.CLOSED:
      return 'Fermé aux inscriptions';
    case WorkshopStatus.FINISHED:
      return 'Terminé';
    case WorkshopStatus.HIDDEN:
      return 'Non visible';
  }
};

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
      field: 'status',
      headerName: 'Statut',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => renderStatus(params.value),
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
          <Tooltip key='editWorkshop' title='Editer'>
            <IconButton onClick={() => navigate(`/admin/workshops/${params.row.id}`)} color='primary'>
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

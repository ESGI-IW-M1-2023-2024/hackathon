import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { WorkshopStatus } from '../types/workshop.types';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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
  handleFinishWorkshop,
  handleCancelWorkshop,
}: {
  handleDeleteWorkshop: (id: number) => Promise<void>;
  handleFinishWorkshop: (id: number) => Promise<void>;
  handleCancelWorkshop: (id: number) => Promise<void>;
}): GridColDef[] => {
  const navigate = useNavigate();

  const actionsIcon = (params: any) => {
    const icons = [
      <Tooltip key='editWorkshop' title='Editer'>
        <IconButton onClick={() => navigate(`/admin/workshops/${params.row.id}`)} color='primary'>
          <EditIcon />
        </IconButton>
      </Tooltip>,
      <Tooltip key='deleteWorkshop' title='Archiver'>
        <IconButton onClick={() => handleDeleteWorkshop(params.row.id)} color='secondary'>
          <DeleteIcon />
        </IconButton>
      </Tooltip>,
    ];

    // Bouton terminer l'atelier
    if (WorkshopStatus.CLOSED == params.row.status) {
      icons.push(
        <Tooltip key='finishWorkshop' title='Atelier terminer'>
          <IconButton onClick={() => handleFinishWorkshop(params.row.id)} color='primary'>
            <DoneIcon />
          </IconButton>
        </Tooltip>,
      );
    } else {
      icons.push(
        <Tooltip key='finishWorkshop' title='Atelier terminer'>
          <IconButton>
            <DoneIcon />
          </IconButton>
        </Tooltip>,
      );
    }

    if ([WorkshopStatus.BOOKING, WorkshopStatus.CLOSED, WorkshopStatus.HIDDEN].includes(params.row.status)) {
      icons.push(
        <Tooltip key='cancelWorkshop' title='Annuler Atelier'>
          <IconButton onClick={() => handleCancelWorkshop(params.row.id)} color='secondary'>
            <DoDisturbIcon />
          </IconButton>
        </Tooltip>,
      );
    } else {
      icons.push(
        <Tooltip key='cancelWorkshop' title='Annuler Atelier'>
          <IconButton>
            <DoDisturbIcon />
          </IconButton>
        </Tooltip>,
      );
    }

    // Booking gestion
    if (params.row.status === WorkshopStatus.BOOKING || params.row.status === WorkshopStatus.CLOSED) {
      icons.push(
        <Tooltip key='manageBooking' title='Gérer les réservations'>
          <IconButton onClick={() => navigate(`/admin/workshops/${params.row.id}/bookings`)}>
            <ManageAccountsIcon />
          </IconButton>
        </Tooltip>,
      );
    }

    return icons;
  };

  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 65,
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
      width: 75,
      renderCell: (params) => (params.value ? <CancelIcon color='error' /> : <CheckCircleIcon color='success' />),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      headerAlign: 'center',
      width: 220,
      renderCell: (params) => {
        return actionsIcon(params);
      },
    },
  ];
};

export default useWorkshopColumns;

import {IconButton, Tooltip} from '@mui/material';
import {GridColDef} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import {WorkshopStatus} from '../types/workshop.types';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {MeetingRoom} from "@mui/icons-material";


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
                                handleOpenWorkshop,
}: {
  handleDeleteWorkshop: (id: number) => Promise<void>;
  handleFinishWorkshop: (id: number) => Promise<void>;
  handleCancelWorkshop: (id: number) => Promise<void>;
    handleOpenWorkshop: (id: number) => Promise<void>;
}): GridColDef[] => {
  const navigate = useNavigate();

  const actionsIcon = (params: any) => {
    const icons = [
      <Tooltip key='editWorkshop' title='Editer'>
        <IconButton onClick={() => navigate(`/admin/workshops/${params.row.id}`)} color='warning'>
          <EditIcon />
        </IconButton>
      </Tooltip>,
      <Tooltip key='seeWorkshopBookings' title='Voir les réservations'>
        <IconButton onClick={() => navigate(`/admin/workshops/${params.row.id}/bookings`)} color='info'>
          <ManageAccountsIcon />
        </IconButton>
      </Tooltip>,
      <Tooltip key='deleteWorkshop' title='Archiver'>
        <IconButton onClick={() => handleDeleteWorkshop(params.row.id)} color='secondary'>
          <DeleteIcon />
        </IconButton>
      </Tooltip>,
    ];

      if (WorkshopStatus.HIDDEN === params.row.status) {
          icons.push(
              <Tooltip key='openWorkshop' title='Ouvrir Atelier'>
                  <IconButton onClick={() => handleOpenWorkshop(params.row.id)} color='secondary'>
                      <MeetingRoom/>
                  </IconButton>
              </Tooltip>,
          );
      } else {
          icons.push(
              <Tooltip key='openWorkshop' title='Ouvrir Atelier'>
                  <IconButton>
                      <MeetingRoom/>
                  </IconButton>
              </Tooltip>,
          );
      }

    // Bouton terminer l'atelier
    if (WorkshopStatus.CLOSED == params.row.status) {
      icons.push(
        <Tooltip key='finishWorkshop' title='Atelier terminer'>
          <IconButton onClick={() => handleFinishWorkshop(params.row.id)} color='success'>
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
          <IconButton onClick={() => handleCancelWorkshop(params.row.id)} color='error'>
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
        display: 'flex',
      width: 75,
        renderCell: (params) => (params.value ? <CheckCircleIcon color='success'/> : <CancelIcon color='error'/>),
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

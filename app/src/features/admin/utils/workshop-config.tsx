import { IconButton, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { WorkshopStatus } from '../types/workshop.types';

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
    ]

    // Bouton terminer l'atelier
    if (WorkshopStatus.CLOSED == params.row.status) {
      icons.push(
        <Tooltip key='finishWorkshop' title="Atelier terminer">
          <IconButton onClick={() => handleFinishWorkshop(params.row.id)} color='primary'>
            <DoneIcon />
          </IconButton>
        </Tooltip>
      )
    } else {
      icons.push(
        <Tooltip key='finishWorkshop' title="Atelier terminer">
          <IconButton>
            <DoneIcon />
          </IconButton>
        </Tooltip>
      )
    }

    if ([WorkshopStatus.BOOKING, WorkshopStatus.CLOSED, WorkshopStatus.HIDDEN].includes(params.row.status)) {
      icons.push(
        <Tooltip key='cancelWorkshop' title="Annuler Atelier">
          <IconButton onClick={() => handleCancelWorkshop(params.row.id)} color='secondary'>
            <DoDisturbIcon />
          </IconButton>
        </Tooltip>
      )
    } else {
      icons.push(
        <Tooltip key='cancelWorkshop' title="Annuler Atelier">
          <IconButton>
            <DoDisturbIcon />
          </IconButton>
        </Tooltip>
      )
    }

    return icons
  }

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
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return actionsIcon(params);
      },
    },
  ];
};

export default useWorkshopColumns;

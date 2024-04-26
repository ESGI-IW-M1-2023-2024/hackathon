import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { BookingStatus } from '../types/booking.types';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

const useWorkshopBookingColumns = ({
  handleValidate,
  handleCancel,
}: {
  handleValidate: ({ id, fullname }: { id: number; fullname: string }) => Promise<void>;
  handleCancel: ({ id, fullname }: { id: number; fullname: string }) => Promise<void>;
}): GridColDef[] => {
  const getFullName = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) =>
    `${params.row.firstname} ${params.row.lastname}`;

  return [
    {
      field: 'fullname',
      headerName: 'Nom',
      flex: 1,
      renderCell: (params) => getFullName(params),
    },
    {
      field: 'email',
      headerName: 'Mail',
      flex: 1,
    },
    {
      field: 'schoolClass',
      headerName: 'Classe',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'statut',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        if (params.value === BookingStatus.PENDING) {
          return (
            <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
              <PendingActionsIcon color='info' />
              <Typography>En attente</Typography>
            </Box>
          );
        }
        if (params.value === BookingStatus.PAID) {
          return (
            <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
              <CheckCircleIcon color='success' />
              <Typography>Payé</Typography>
            </Box>
          );
        }
        if (params.value === BookingStatus.CANCELED) {
          return (
            <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
              <WarningIcon color='warning' />
              <Typography>Annulé</Typography>
            </Box>
          );
        }
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 0.5,
      renderCell: (params) => [
        <Tooltip key='validateBooking' title='Valider la réservation'>
          <IconButton
            onClick={() => handleValidate({ id: params.row.id, fullname: getFullName(params) })}
            color='success'
            disabled={params.row.status === BookingStatus.PAID}
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>,
        <Tooltip key='cancelBooking' title='Annuler la réservation'>
          <IconButton
            onClick={() => handleCancel({ id: params.row.id, fullname: getFullName(params) })}
            color='warning'
            disabled={params.row.status === BookingStatus.CANCELED}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>,
      ],
    },
  ];
};

export default useWorkshopBookingColumns;

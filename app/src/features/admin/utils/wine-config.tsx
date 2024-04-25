import {IconButton, Tooltip} from '@mui/material';
import {GridColDef} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const useWineColumns = ({handleDeleteWine}: { handleDeleteWine: (id: number) => Promise<void> }): GridColDef[] => {
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
            flex: 1,
        },
        {
            field: 'producer',
            headerName: 'Producteur',
            flex: 1,
        },
        {
            field: 'quantity',
            headerName: 'Quantité',
            flex: 1,
        },
        {
            field: 'bottleSize',
            headerName: 'Taille de bouteille',
            flex: 1,
        },
        {
            field: 'region',
            headerName: 'Région',
            flex: 1,
            renderCell: params => params.row.region.label
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
                        <IconButton onClick={() => navigate(`/admin/wines/${params.row.id}`)}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>,
                    <Tooltip key='deleteWine' title='Supprimer'>
                        <IconButton onClick={() => handleDeleteWine(params.row.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>,
                ];
            },
        },
    ];
};

export default useWineColumns;

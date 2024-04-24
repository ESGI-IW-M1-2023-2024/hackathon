import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import {useEditOrganisationMutation, useGetOneOrganisationQuery,} from '@/redux/api/api.slice';
import {useAppDispatch} from '@/redux/hooks';
import {openSnackBar} from '@/redux/slices/notification.slice';
import {customErrorMap} from '@/utils/customZodErrorMap';
import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {z} from 'zod';
import {EditOrganisation as EditOrganisationType} from "@/features/admin/types/organisation.types";

const zodSchema = () =>
    z.object({
        id: z.number(),
        label: z.string(),
        logoFile: z.string().base64(),
    });

const EditOrganisation = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const [editOrganisation] = useEditOrganisationMutation();
    const {data} = useGetOneOrganisationQuery(Number(id));
    const defaultValues = data
        ? {
            id: data.id,
            label: data.label,
            logoFile: '',
        }
        : {
            id: Number(id),
            label: '',
            logoFile: '',
        };

    const {control, handleSubmit, setValue} = useForm({
        resolver: zodResolver(zodSchema(), {errorMap: customErrorMap}),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues,
    });

    if (data) {
        setValue('label', data.label);
    }

    const handleFormSubmit = async (formData: EditOrganisationType): Promise<void> => {
        try {
            await editOrganisation(formData).unwrap();
            dispatch(openSnackBar({message: 'Organisation modifiée avec succès', severity: 'success'}));
            navigate('/admin/organisations');
        } catch (error: unknown) {
            dispatch(openSnackBar({message: 'Impossible de modifier l\'organisation', severity: 'error'}));
        }
    };

    return (
        <Box component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='label'
                options={{label: 'Label'}}
            />
            <CustomFormField
                childrenComponentType='FILE_FIELD'
                control={control}
                controlName='logoFile'
                options={{label: 'Fichier', setValue: setValue}}
            />
            <Button variant='contained' type='submit'>
                Modifier l'organisation
            </Button>
            <Button variant='contained' onClick={() => navigate('/admin/organisations')}>
                Retour à la liste
            </Button>
        </Box>
    );
};

export default EditOrganisation;

import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { useEditOrganisationMutation, useGetOneOrganisationQuery, } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { EditOrganisation as EditOrganisationType } from "@/features/admin/types/organisation.types";
import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';

const zodSchema = () =>
    z.object({
        id: z.number(),
        label: z.string(),
        logoFile: z.string().base64(),
    });

const EditOrganisation = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [editOrganisation] = useEditOrganisationMutation();
    const { data } = useGetOneOrganisationQuery(Number(id));
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

    const { control, handleSubmit, setValue } = useForm({
        resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
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
            dispatch(openSnackBar({ message: 'Organisation modifiée avec succès', severity: 'success' }));
            navigate('/admin/organisations');
        } catch (error: unknown) {
            dispatch(openSnackBar({ message: 'Impossible de modifier l\'organisation', severity: 'error' }));
        }
    };

    return (
        <Stack component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            width={'80%'}
            alignItems={'center'}
            spacing={2}
            margin={'2rem auto'}
        >

            <h1>Édition d'une organisation</h1>

            <Stack direction={'row'} spacing={2} minWidth={'100%'} justifyContent={'space-evenly'}>
                <CustomFormField
                    childrenComponentType='TEXT_FIELD'
                    control={control}
                    controlName='label'
                    options={{ label: 'Label' }}
                />
                <CustomFormField
                    childrenComponentType='FILE_FIELD'
                    control={control}
                    controlName='logoFile'
                    options={{ label: 'Fichier', setValue: setValue }}
                />
            </Stack>

            <Stack direction={"row"} spacing={2} alignItems={'center'} justifyContent={'space-evenly'}>
                <Button variant='contained' type='submit'>
                    Modifier l'organisation
                </Button>
                <ColorButton variant='contained' onClick={() => navigate('/admin/organisations')} sx={{ textTransform: 'uppercase' }}>
                    Retour à la liste
                </ColorButton>
            </Stack>
        </Stack>
    );
};

export default EditOrganisation;

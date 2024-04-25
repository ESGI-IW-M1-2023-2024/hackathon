import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { useCreateOrganisationMutation } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from "react-router-dom";
import { NewOrganisation } from "@/features/admin/types/organisation.types";
import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';

const zodSchema = () =>
    z.object({
        label: z.string(),
        logoFile: z.string().base64(),
    });

const CreateOrganisation = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [createOrganisation] = useCreateOrganisationMutation();


    const { control, handleSubmit, setValue } = useForm({
        resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            label: '',
            logoFile: '',
        },
    });

    const handleFormSubmit = async (formData: NewOrganisation): Promise<void> => {
        try {
            await createOrganisation(formData).unwrap();
            dispatch(openSnackBar({ message: 'Organisation créée avec succès', severity: 'success' }));

            navigate(`/admin/organisations`)
        } catch (error: unknown) {
            dispatch(openSnackBar({ message: 'Impossible de créer l\'organisation', severity: 'error' }));
        }
    };

    return (
        <Stack component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            width={'80%'}
            alignItems={'center'}
            spacing={2}
            margin={'2rem auto'}
        >
            <h1>Nouvelle Oragnisation</h1>
            <Stack direction={'row'} spacing={2} minWidth={'100%'}>
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

            <Stack direction={"row"} spacing={2}>
                <Button variant='contained' type='submit'>
                    Créer la région
                </Button>
                <ColorButton variant='contained' type='button' onClick={() => navigate('/admin/organisations')} sx={{ textTransform: 'uppercase' }}>
                    Retour à la liste
                </ColorButton>
            </Stack>
        </Stack>
    );
};

export default CreateOrganisation;

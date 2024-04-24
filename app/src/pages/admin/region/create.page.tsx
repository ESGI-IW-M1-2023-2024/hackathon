import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { useCreateRegionMutation, useGetCountriesQuery } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, LinearProgress, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NewRegion } from "@/features/admin/types/region.types";
import { useNavigate } from "react-router-dom";
import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';

const zodSchema = () =>
    z.object({
        label: z.string(),
        country: z.string(),
    });

const CreateRegion = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [createRegion] = useCreateRegionMutation();

    const { data: countries, isLoading } = useGetCountriesQuery();

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            label: null,
            country: null,
        },
    });

    const handleFormSubmit = async (formData: NewRegion): Promise<void> => {
        try {
            await createRegion(formData).unwrap();
            dispatch(openSnackBar({ message: 'Région créée avec succès', severity: 'success' }));

            navigate(`/admin/regions`)
        } catch (error: unknown) {
            dispatch(openSnackBar({ message: 'Impossible de créer la région', severity: 'error' }));
        }
    };

    if (isLoading) {
        return <LinearProgress />;
    }

    return (
        <Stack component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            width={'80%'}
            alignItems={'center'}
            spacing={2}
            margin={'2rem auto'}
        >
            <h1>Nouvelle Région</h1>

            <Stack direction={'row'} spacing={2} minWidth={'100%'}>
                <CustomFormField
                    childrenComponentType='TEXT_FIELD'
                    control={control}
                    controlName='label'
                    options={{ label: 'Label' }}
                />
                <CustomFormField
                    childrenComponentType='SELECT'
                    control={control}
                    controlName='country'
                    options={{
                        label: 'Pays',
                        items: countries ?? []
                    }}
                />
            </Stack>

            <Stack direction={"row"} spacing={2}>
                <Button variant='contained' type='submit'>
                    Créer la région
                </Button>
                <ColorButton variant='contained' type='button' onClick={() => navigate('/admin/regions')} sx={{ textTransform: 'uppercase' }}>
                    Retour à la liste
                </ColorButton>
            </Stack>
        </Stack>
    );
};

export default CreateRegion;

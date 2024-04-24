import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import { useEditRegionMutation, useGetCountriesQuery, useGetOneRegionQuery } from '@/redux/api/api.slice';
import { useAppDispatch } from '@/redux/hooks';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { customErrorMap } from '@/utils/customZodErrorMap';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, LinearProgress, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { EditRegion as EditRegionType } from "@/features/admin/types/region.types";
import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';

const zodSchema = () =>
    z.object({
        id: z.number(),
        label: z.string(),
        country: z.string(),
    });

const EditRegion = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [editTheme] = useEditRegionMutation();
    const { data } = useGetOneRegionQuery(Number(id));
    const defaultValues = data
        ? {
            id: data.id,
            label: data.label,
            country: data.country,
        }
        : {
            id: Number(id),
            label: null,
            country: null,
        };

    const { data: countries, isLoading } = useGetCountriesQuery();

    const { control, handleSubmit, setValue } = useForm({
        resolver: zodResolver(zodSchema(), { errorMap: customErrorMap }),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues,
    });

    if (data) {
        setValue('label', data.label);
        setValue('country', data.country);
    }

    const handleFormSubmit = async (formData: EditRegionType): Promise<void> => {
        try {
            console.log(formData)
            await editTheme(formData).unwrap();
            dispatch(openSnackBar({ message: 'Région modifiée avec succès', severity: 'success' }));
            navigate('/admin/regions');
        } catch (error: unknown) {
            dispatch(openSnackBar({ message: 'Impossible de modifier le région', severity: 'error' }));
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

            <h1>Édition d'une Région</h1>

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
                    Modifier la région
                </Button>
                <ColorButton variant='contained' onClick={() => navigate('/admin/regions')} sx={{ textTransform: 'uppercase' }}>
                    Retour à la liste
                </ColorButton>
            </Stack>

        </Stack>
    );
};

export default EditRegion;

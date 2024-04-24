import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import {useEditRegionMutation, useGetCountriesQuery, useGetOneRegionQuery} from '@/redux/api/api.slice';
import {useAppDispatch} from '@/redux/hooks';
import {openSnackBar} from '@/redux/slices/notification.slice';
import {customErrorMap} from '@/utils/customZodErrorMap';
import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, LinearProgress} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {z} from 'zod';
import {EditRegion as EditRegionType} from "@/features/admin/types/region.types";

const zodSchema = () =>
    z.object({
        id: z.number(),
        label: z.string(),
        country: z.string(),
    });

const EditRegion = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const [editTheme] = useEditRegionMutation();
    const {data} = useGetOneRegionQuery(Number(id));
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

    const {data: countries, isLoading} = useGetCountriesQuery();

    const {control, handleSubmit, setValue} = useForm({
        resolver: zodResolver(zodSchema(), {errorMap: customErrorMap}),
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
            dispatch(openSnackBar({message: 'Région modifiée avec succès', severity: 'success'}));
            navigate('/admin/regions');
        } catch (error: unknown) {
            dispatch(openSnackBar({message: 'Impossible de modifier le région', severity: 'error'}));
        }
    };

    if (isLoading) {
        return <LinearProgress/>;
    }

    return (
        <Box component='form' onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='label'
                options={{label: 'Label'}}
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
            <Button variant='contained' type='submit'>
                Modifier la région
            </Button>
            <Button variant='contained' onClick={() => navigate('/regions')}>
                Retour à la liste
            </Button>
        </Box>
    );
};

export default EditRegion;

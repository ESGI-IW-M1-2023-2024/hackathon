import CustomFormField from '@/features/UI/custom-mui-components/components/custom-form-field.component';
import {useEditWineMutation, useGetOneWineQuery, useGetRegionsQuery} from '@/redux/api/api.slice';
import {useAppDispatch} from '@/redux/hooks';
import {openSnackBar} from '@/redux/slices/notification.slice';
import {customErrorMap} from '@/utils/customZodErrorMap';
import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, LinearProgress} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import {z} from 'zod';
import {EditWine as EditWineType} from "@/features/admin/types/wine.types";

const zodSchema = () =>
    z.object({
        label: z.string(),
        productYear: z.string(),
        producer: z.string(),
        grapeVariety: z.string(),
        alcoholLevel: z.string(),
        color: z.string(),
        quantity: z.string(),
        bottleSize: z.string(),
        comments: z.string(),
        region: z.string(),
        servingTemperature: z.string(),
        storage: z.string(),
        upTo: z.string(),
        byTaste: z.string(),
        byEye: z.string(),
        onTheNose: z.string(),
        inTheMouth: z.string(),
        winePairing: z.string(),
        recommandedPairing: z.string(),
        content: z.string(),
        file: z.string().base64(),
    });

const EditWine = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const [editWine] = useEditWineMutation();
    const {data} = useGetOneWineQuery(Number(id));
    const defaultValues = data
        ? {
            id: data.id,
            label: data.label,
            productYear: data.productYear,
            producer: data.producer,
            grapeVariety: data.grapeVariety,
            alcoholLevel: data.alcoholLevel,
            color: data.color,
            quantity: data.quantity,
            bottleSize: data.bottleSize,
            comments: data.comments,
            region: data.region,
            servingTemperature: data.servingTemperature,
            storage: data.storage,
            upTo: data.upTo,
            byTaste: data.byTaste,
            byEye: data.byEye,
            onTheNose: data.onTheNose,
            inTheMouth: data.inTheMouth,
            winePairing: data.winePairing,
            recommandedPairing: data.recommandedPairing,
            content: data.content,
            file: '',
        }
        : {
            id: Number(id),
            label: null,
            productYear: null,
            producer: null,
            grapeVariety: null,
            alcoholLevel: null,
            color: null,
            quantity: null,
            bottleSize: null,
            comments: null,
            region: null,
            servingTemperature: null,
            storage: null,
            upTo: null,
            byTaste: null,
            byEye: null,
            onTheNose: null,
            inTheMouth: null,
            winePairing: null,
            recommandedPairing: null,
            content: null,
            file: '',
        };

    const {control, handleSubmit, setValue} = useForm({
        resolver: zodResolver(zodSchema(), {errorMap: customErrorMap}),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues,
    });

    if (data) {
        setValue('label', data.label);
        setValue('productYear', data.productYear);
        setValue('producer', data.producer);
        setValue('grapeVariety', data.grapeVariety);
        setValue('alcoholLevel', data.alcoholLevel);
        setValue('color', data.color);
        setValue('quantity', data.quantity);
        setValue('bottleSize', data.bottleSize);
        setValue('comments', data.comments);
        setValue('region', data.region);
        setValue('servingTemperature', data.servingTemperature);
        setValue('storage', data.storage);
        setValue('upTo', data.upTo);
        setValue('byTaste', data.byTaste);
        setValue('byEye', data.byEye);
        setValue('onTheNose', data.onTheNose);
        setValue('inTheMouth', data.inTheMouth);
        setValue('winePairing', data.winePairing);
        setValue('recommandedPairing', data.recommandedPairing);
        setValue('content', data.content);
    }

    const {data: regionData, isLoading} = useGetRegionsQuery({pagination: false});


    const handleFormSubmit = async (formData: EditWineType): Promise<void> => {
        try {
            console.log(formData)
            await editWine(formData).unwrap();
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
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='productYear'
                options={{label: 'Année de production'}}
                props={{type: "number"}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='producer'
                options={{label: 'Producteur'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='grapeVariety'
                options={{label: 'grapeVariety'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='alcoholLevel'
                options={{label: 'alcoholLevel'}}
                props={{type: "number"}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='color'
                options={{label: 'color'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='quantity'
                options={{label: 'quantity'}}
                props={{type: "number"}}
            />
            <CustomFormField
                childrenComponentType='SELECT'
                control={control}
                controlName='bottleSize'
                options={{
                    label: 'bottleSize',
                    items: [
                        {
                            text: "Piccolo",
                            value: "piccolo"
                        },
                        {
                            text: "Demi",
                            value: "half"
                        },
                        {
                            text: "Standard",
                            value: "standard"
                        },
                        {
                            text: "Magnum",
                            value: "magnum"
                        },
                        {
                            text: "Double magnum",
                            value: "double magnum",
                        },
                        {
                            text: "Jeroboam",
                            value: "jeroboam",
                        },
                        {
                            text: "Mathusalem",
                            value: "methuselah",
                        },
                        {
                            text: "Salmanazar",
                            value: "salmanazar",
                        },
                        {
                            text: "Balthazar",
                            value: "balthazar",
                        },
                        {
                            text: "Nabuchodonosor",
                            value: "nebuchadnezar",
                        },
                        {
                            text: "Melchior",
                            value: "melchior",
                        },
                        {
                            text: "Melchisédek",
                            value: "melchizedek",
                        },
                    ]
                }}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='comments'
                options={{label: 'comments'}}
            />
            <CustomFormField
                childrenComponentType='AUTOCOMPLETE'
                control={control}
                controlName='region'
                options={{
                    inputLabel: 'region',
                    items: regionData ? [
                        ...(regionData.items.map(
                            (region) => ({
                                label: region.label + '(' + region.countryName + ')',
                                id: region.id,
                            })
                        ))] : [],
                    noOptionsText: "Aucune région"
                }}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='servingTemperature'
                options={{label: 'servingTemperature'}}
                props={{type: "number"}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='storage'
                options={{label: 'storage'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='upTo'
                options={{label: 'upTo'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='taste'
                options={{label: 'taste'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='byTaste'
                options={{label: 'byTaste'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='byEye'
                options={{label: 'byEye'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='onTheNose'
                options={{label: 'onTheNose'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='inTheMouth'
                options={{label: 'inTheMouth'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='winePairing'
                options={{label: 'winePairing'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='recommandedPairing'
                options={{label: 'recommandedPairing'}}
            />
            <CustomFormField
                childrenComponentType='TEXT_FIELD'
                control={control}
                controlName='content'
                options={{label: 'content'}}
            />
            <CustomFormField
                childrenComponentType='FILE_FIELD'
                control={control}
                controlName='file'
                options={{label: 'file', setValue: setValue}}
            />
            <Button variant='contained' type='submit'>
                Créer le vin
            </Button>
        </Box>
    );
};

export default EditWine;

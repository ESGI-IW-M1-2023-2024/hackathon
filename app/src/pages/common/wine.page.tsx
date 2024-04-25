import { useGetOneWineQuery } from "@/redux/api/api.slice";
import { Box, CircularProgress, Container, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

const Wine = () => {

    const { id } = useParams();
    //setNavbarBackColor('#B9515B');

    const { data, isLoading } = useGetOneWineQuery(Number(id));

    if (isLoading) {
        return (
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='100vh'
                sx={{
                    backgroundColor: '#B9515B',
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

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
            taste: data.taste,
            byTaste: data.byTaste,
            byEye: data.byEye,
            onTheNose: data.onTheNose,
            inTheMouth: data.inTheMouth,
            winePairing: data.winePairing,
            recommandedPairing: data.recommandedPairing,
            content: data.content,
            imageFilename: data.imageFilename,
            archived: data.archived,
        }
        : {
            id: Number(id),
            label: '',
            productYear: 0,
            producer: '',
            grapeVariety: '',
            alcoholLevel: 0,
            color: '',
            quantity: 0,
            bottleSize: '',
            comments: '',
            region: '',
            servingTemperature: '',
            storage: '',
            upTo: '',
            taste: '',
            byTaste: '',
            byEye: '',
            onTheNose: '',
            inTheMouth: '',
            winePairing: '',
            recommandedPairing: '',
            content: '',
            imageFilename: '',
            archived: false,
        };

    return (
        <Box
            sx={{
                backgroundColor: '#B9515B',
                minHeight: '100vh',
                "#main-navigation": {
                    backgroundColor: '#B9515B !important',
                }
            }}
        >
            <Container>

            </Container>
        </Box>
    )
}

export default Wine
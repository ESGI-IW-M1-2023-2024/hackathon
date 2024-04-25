import {useGetWorkshopsQuery} from '@/redux/api/api.slice';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Stack,
    Typography
} from '@mui/material';
import ColorButton from "@/features/UI/custom-mui-components/components/custom-button.component";
import herobanner from "@/assets/homepage/herobanner.jpg";

const WorkshopList = () => {
  const { data, isLoading } = useGetWorkshopsQuery();

    const renderWorkshopCards = () => {
        // Assure-toi que data est non-null et a au moins un élément
        if (!data || !data.items || data.items.length === 0) return <Typography variant="h6">Aucun atelier disponible
            pour le moment.</Typography>;

        // Prends les trois derniers éléments de l'array
        const workshops = data.items;

        return workshops.map((workshop, index) => {
            // Assure-toi que chaque atelier a une propriété 'image', 'title', et 'description'
            //if (!workshop.theme || !workshop.theme.headerFilename || !workshop.theme.label || !workshop.theme.subtitle) return null;

            const dateStart = new Date(workshop.dateStart);
            const formattedDate = dateStart.toLocaleDateString('fr-FR', {
                day: '2-digit', // Affiche le jour avec deux chiffres
                month: 'long'   // Affiche le mois en toute lettre
            });

            return (
                <Card key={index}
                      sx={{width: {lg: 'calc(97% / 4)', md: 'calc(97% / 3)', sm: 'calc(97% / 2)', xs: '100%'}, display: 'flex', flexWrap: "wrap", flexDirection: 'column'}}

                >
                    <CardContent>
                        <Typography variant="h4" component={"h4"}>
                            {workshop.theme.label}
                        </Typography>
                        <Divider sx={{mb: 2, mt: 2}}/>
                        <Typography gutterBottom component="p">
                            {formattedDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {workshop.theme.subtitle}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{marginTop: 'auto'}}>
                        <ColorButton>
                            Voir plus
                        </ColorButton>
                    </CardActions>
                </Card>
            );
        });
    };


  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                color: "white",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${herobanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: {xs: "calc(100vh - 90px)", sm: "600px"},
                maxHeight: {xs: "calc(100vh - 90px)", sm: "70vh"},
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
            }}
        >
            <Stack
                spacing={2}
                alignItems="center"
                marginTop='auto'
                marginBottom='auto'
                sx={{
                    padding: {xs: 2, sm: 4},
                    textAlign: 'center',
                }}
            >
                <Typography variant="h1" className="d-shadow" sx={{
                    fontSize: {xs: '2rem', sm: '4.5rem'}
                }}>
                    Liste des ateliers
                </Typography>
            </Stack>
        </Stack>
        <Container component="main">
            <Box mt={'40px'}
                 mb={'40px'}
                component={'section'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'flex-start'}
                flexWrap={'wrap'}
                rowGap={'20px'}
                columnGap={'1%'}
            >
                {data && (renderWorkshopCards())}
            </Box>
        </Container>
    </>
  );
};

export default WorkshopList;

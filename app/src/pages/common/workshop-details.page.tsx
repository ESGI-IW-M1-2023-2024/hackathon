import RegistrationWorkshop from '@/features/common/components/registration-workshop.component';
import { useGetOneWorkshopQuery } from '@/redux/api/api.slice';
import { openSnackBar } from '@/redux/slices/notification.slice';
import { Box, Card, CardContent, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import imgDefault from '@/assets/workshop/default-herobanner.jpg';
import ColorButton from '@/features/UI/custom-mui-components/components/custom-button.component';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import WineBarIcon from '@mui/icons-material/WineBar';
import { Padding } from '@mui/icons-material';

interface WorkshopDetailError {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

const WorkshopDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetOneWorkshopQuery(id!);
  console.log(data);

  if (error) {
    const customError = error as WorkshopDetailError;
    dispatch(
      openSnackBar({
        message:
          customError.originalStatus === 404
            ? 'Atelier introuvable'
            : "Une erreur est surveue lors de la récupération de l'atelier",
        severity: 'error',
      }),
    );
  }

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!data) {
    return <Typography variant='h1'>Aucune donnée</Typography>;
  }

  const herobanner = data?.theme.headerFilename ? data.theme.headerFilename : imgDefault;

  const dateStart = new Date(data.dateStart);
  const formattedDate = dateStart.toLocaleDateString('fr-FR', {
    day: '2-digit', // Affiche le jour avec deux chiffres
    month: 'long',   // Affiche le mois en toute lettre,
    year: 'numeric'
  });
  const formatedHour = dateStart.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formatMaxDateBooking = new Date(data.maxBookingDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long'
  });

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
          minHeight: { xs: "calc(100vh - 90px)", sm: "600px" },
          maxHeight: { xs: "calc(100vh - 90px)", sm: "70vh" },
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))"
        }}
      >
        <Container
          sx={{
            marginTop: 'auto',
            marginBottom: 'auto'
          }}
        >
          {/* ligne, comprenant la card à gauche et le titre à droite */}
          <Stack
            spacing={2}
            alignItems="center"
            marginTop='auto'
            marginBottom='auto'

            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'center', sm: 'space-between' }}
            sx={{
              padding: { xs: 2, sm: 4 },
              textAlign: 'center',
            }}
          >
            {/* Bloc de gauche (card + bouton) */}
            <Stack
              flexDirection="column"
              spacing={2}
              sx={{
                width: { xs: '100%', sm: '300px' },
              }}
            >
              {/* card */}
              <Card
                className='d-shadow'
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '6px',
                  padding: '16px',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >

                  <Typography variant="h4" component={"h4"}>
                    {formattedDate} <br /> {formatedHour}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: "8px", justifyContent: 'center' }}>
                    <Chip
                      sx={{ backgroundColor: "#B9515B", color: "white", borderRadius: "6px" }}
                      label={(Math.round(data.length / 60)) + " heures"}
                      icon={<AccessTimeIcon color='inherit' />}
                    />
                    <Chip
                      sx={{ backgroundColor: "#B9515B", color: "white", borderRadius: "6px" }}
                      label={data.numberOfWines + " vins"}
                      icon={<WineBarIcon color='inherit' />}
                    />
                  </Box>

                  <Typography variant="h4" component={"h4"}>
                    Participation : {data.price} €
                  </Typography>

                  <Box sx={{ display: 'flex', gap: "8px", justifyContent: 'center' }}>
                    <Chip
                      sx={{ backgroundColor: "primary.main", color: "white", borderRadius: "6px" }}
                      label={data.numberOfBookings + "/" + data.maxPerson}
                      icon={<GroupsIcon color='inherit' />}
                    />

                    {(data.status === 'booking') ? (
                      <Chip
                        sx={{ backgroundColor: "primary.main", color: "white", borderRadius: "6px" }}
                        label='Inscriptions ouvertes'
                      />
                    ) : (
                      <Chip
                        sx={{ backgroundColor: "error.main", color: "white", borderRadius: "6px" }}
                        label={
                          data.status === 'closed' ? 'Inscriptions fermées' :
                            data.status === 'canceled' ? 'Atelier annulé' :
                              data.status === 'finished' ? 'Atelier terminé' :
                                'Atelier masqué'
                        }
                      />
                    )}

                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Date limite d'inscription : {formatMaxDateBooking}
                  </Typography>

                </CardContent>
              </Card>
              {/* bouton */}
              <ColorButton
                variant='contained'
                startIcon={<CheckIcon />}
                onClick={() => {
                  const element = document.getElementById('subscriptionForm');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Je m'inscrit
              </ColorButton>
            </Stack>
            <Box
              width="auto"
            >
              <Typography
                variant="h1"
                className="d-shadow"
                sx={{
                  fontSize: { xs: '2rem', sm: '4.5rem' }
                }}
              >
                {data?.theme.label}
              </Typography>
              <Typography className="d-shadow">{data?.theme.subtitle}</Typography>
            </Box>

          </Stack>
        </Container>
      </Stack>

      <Container component="main" sx={{ padding: '30px 0' }}>
        <div dangerouslySetInnerHTML={{ __html: data?.theme.content || "" }} />
      </Container>

      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          mb: '2rem'
        }}
      >
        <Typography variant='h1' id='subscriptionForm'>S'inscrire à cet atelier</Typography>
        {data?.theme.label} du {formattedDate} à {formatedHour}
        <RegistrationWorkshop workshop={data} />

      </Container>

    </>
  );
};

export default WorkshopDetails;

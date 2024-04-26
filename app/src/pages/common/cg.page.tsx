import { Container, Typography, Paper, Button, Box } from '@mui/material';
import {useNavigate} from "react-router-dom";


const CGUPage = () => {
    const navigate = useNavigate();

    return (
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h3" gutterBottom style={{marginBottom:"2rem", fontSize:"xx-large", textAlign:"center"}}>
                  Conditions Générales d'Utilisation
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Respect de la Loi Evin
              </Typography>
              <Typography variant="h5" gutterBottom style={{fontWeight:"bold"}}>
                  Publicité sur les boissons alcooliques
              </Typography>
              <Typography variant="body1" paragraph>
                  Conformément à la Loi Evin, la promotion de boissons alcooliques sur notre site est strictement régulée. Nous nous engageons à respecter les dispositions suivantes :
              </Typography>
              <Typography variant="body1" paragraph>
                  Publicité Responsable : Toute communication ou publicité en faveur de nos ateliers de dégustation de vin est faite de manière responsable, en visant à informer les consommateurs sans encourager la consommation excessive ou irresponsable d’alcool.<br/>
                  Protection des Mineurs : Nous ne ciblons pas et ne permettons pas l'inscription des mineurs à nos ateliers de dégustation de vin. Nous demandons à tous les participants de confirmer leur âge légal pour consommer de l’alcool au moment de l’inscription.<br/>
                  Santé Publique : Nos publicités rappellent systématiquement l'importance de consommer avec modération et indiquent les risques associés à la consommation excessive d'alcool.
              </Typography>
              <Typography variant="h5" gutterBottom style={{fontWeight:"bold"}}>
                  Information sur les risques de l'alcool
              </Typography>
              <Typography variant="body1" paragraph>
                  Nous fournissons des informations claires sur les risques liés à la consommation d'alcool et encourageons nos visiteurs et participants à adopter une consommation modérée et responsable. Ces informations sont accessibles à tout moment sur notre site et sont également communiquées lors de nos ateliers.
              </Typography>
              <Typography variant="body1" paragraph>
                  Cette section garantit que notre site se conforme aux exigences légales françaises concernant la publicité des boissons alcooliques, tout en s'engageant à promouvoir une approche responsable et éducative de la dégustation de vin.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Bienvenue sur notre site de dégustations de vin et ateliers
              </Typography>
              <Typography variant="body1" paragraph>
                  Bienvenue sur notre site web. Si vous continuez à naviguer et à utiliser ce site web,
                  vous acceptez de respecter et d'être lié par les conditions générales d'utilisation suivantes,
                  qui, avec notre politique de confidentialité, régissent la relation de Boennologie
                  avec vous en relation avec ce site web. Si vous n'êtes pas d'accord avec une partie de ces termes et conditions,
                  veuillez ne pas utiliser notre site web.
              </Typography>
              <Typography variant="body1" paragraph>
                  Les termes "Nous", "notre", se réfèrent à Boennologie, propriétaire du site web.
                  Le terme "vous" se réfère à l'utilisateur ou au visiteur de notre site web.
              </Typography>

              <Typography variant="h4" gutterBottom>
                  Informations Personnelles
              </Typography>
              <Typography variant="body1" paragraph>
                  Pour participer à nos ateliers de dégustation de vin, vous devez vous inscrire et fournir les informations suivantes :
              </Typography>
              <Typography variant="body1" paragraph>
                  Nom et Prénom : pour vous identifier et personnaliser notre communication avec vous.<br/>
                  Email : pour vous envoyer des confirmations d'inscription, des rappels et des informations sur nos futurs événements.<br/>
                  Classe : si applicable, pour adapter l'expérience d'atelier en fonction du niveau ou de l'âge des participants.
              </Typography>
              <Typography variant="body1" paragraph>
                  Nous nous engageons à protéger la confidentialité de vos données personnelles et à ne pas les partager avec des tiers sans votre consentement explicite, sauf dans le cadre légal requis.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Utilisation du Site
              </Typography>
              <Typography variant="body1" paragraph>
                  Le contenu de notre site web est destiné à fournir des informations générales sur nos services de dégustation de vin. Nous nous efforçons de maintenir les informations à jour et correctes, mais nous ne pouvons garantir l'exactitude, la complétude ou la pertinence des informations pour tous les utilisateurs.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Obligations des Utilisateurs
              </Typography>
              <Typography variant="body1" paragraph>
                  En vous inscrivant à nos ateliers, vous vous engagez à :
              </Typography>
              <Typography variant="body1" paragraph>
                  Fournir des informations véridiques et à jour lors de l'inscription.<br/>
                  Utiliser les services offerts sur le site de manière responsable et conforme aux lois en vigueur.<br/>
                  Ne pas partager votre compte ni vos accès avec d'autres personnes.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Droits de Propriété Intellectuelle
              </Typography>
              <Typography variant="body1" paragraph>
                  Les contenus présents sur le site, tels que les textes, graphismes, logos, images, ainsi que leur compilation, sont protégés par les lois françaises et internationales sur le droit d'auteur et la propriété intellectuelle. Toute reproduction non autorisée de ces contenus est strictement interdite.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Modifications des Conditions
              </Typography>
              <Typography variant="body1" paragraph>
                  Nous nous réservons le droit de modifier les présentes conditions d’utilisation à tout moment. Les modifications prendront effet immédiatement après leur publication sur le site. En continuant d'utiliser le site après ces modifications, vous acceptez les nouvelles conditions.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Loi Applicable et Juridiction
              </Typography>
              <Typography variant="body1" paragraph>
                  Les présentes conditions générales sont régies et interprétées conformément aux lois de France, et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux français pour tout litige qui pourrait survenir en relation avec ces conditions.
              </Typography>
              <Typography variant="h4" gutterBottom>
                  Contactez-nous
              </Typography>
              <Typography variant="body1" paragraph>
                  Si vous avez des questions sur ces conditions, n'hésitez pas à nous contacter via notre formulaire de contact ou à l'adresse email fournie sur notre site.
            </Typography>

              <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color={"error"} onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                      Retour
                  </Button>
                  <Button variant="contained" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                      Haut de page
                  </Button>
              </Box>
          </Paper>
      </Container>
    );
};

export default CGUPage;

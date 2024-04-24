import { Stack } from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Stack
            component={"footer"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={3}
        >
            <p><strong>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</strong></p>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={2}
            >
                <p><a href="#">Conditions générales</a></p>
                <p>Olivier Bonneton ©</p>
                <p><a href="https://www.linkedin.com/in/olivier-bonneton-5a320020"><LinkedInIcon /></a></p>
            </Stack>
        </Stack>
    )
}

export default Footer
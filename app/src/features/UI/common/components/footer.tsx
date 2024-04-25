import { Stack } from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Stack
            component={"footer"}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={3}
            gap={{ xs: 2, sm: 0 }}
            sx={{
                backgroundColor: "rgba(199, 172, 146, 0.2)",
            }}
        >
            <p><strong>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</strong></p>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={{ xs: 2, sm: 2 }}
            >
                <p><a href="#">Conditions générales</a></p>
                <p>Olivier Bonneton 2024-2025 ©</p>
                <p><a href="https://www.linkedin.com/in/olivier-bonneton-5a320020"><LinkedInIcon /></a></p>
            </Stack>
        </Stack>
    )
}

export default Footer
import { Box, Stack, Typography } from "@mui/material"

interface TextImageProps {
    reverse?: boolean
    title: string
    text: string | JSX.Element
    src: string
    alt?: string
}

const TextImage = ({ reverse, title, text, src, alt }: TextImageProps) => {
    return (
        <>
            <Stack
                component={"article"}
                direction={reverse ? "row-reverse" : "row"}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    marginTop: "2rem",
                    marginBottom: "2rem"
                }}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                    sx={{
                        width: "50%",
                        "& > h3": {
                            fontSize: "2rem",
                            fontWeight: "bold"
                        }
                    }}
                >
                    <h3>{title}</h3>
                    <p>
                        {text}
                    </p>
                </Stack>
                <Box
                    component={"img"}
                    src={src}
                    alt={alt}
                    sx={{
                        width: "400px",
                        height: "400px",
                        objectFit: "cover"
                    }}
                />
            </Stack>
        </>
    )
}

export default TextImage
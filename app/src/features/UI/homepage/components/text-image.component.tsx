import { Box, Stack, SxProps } from "@mui/material"

interface TextImageProps {
    reverse?: boolean
    button?: JSX.Element
    title: string
    text: string | JSX.Element
    src: string
    alt?: string
    sx?: SxProps
}

const TextImage = ({ reverse, title, text, src, alt, button, sx }: TextImageProps) => {
    return (
        <>
            <Stack
                component={"article"}
                direction={reverse ? "row-reverse" : "row"}
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    ...sx,
                    marginTop: "2rem",
                    marginBottom: "2rem"
                }}
            >
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
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
                    {button}
                </Stack>
                <Box
                    component={"img"}
                    src={src}
                    alt={alt}
                    sx={{
                        width: "400px",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "4px",
                    }}
                    className="d-shadow"
                />
            </Stack>
        </>
    )
}

export default TextImage
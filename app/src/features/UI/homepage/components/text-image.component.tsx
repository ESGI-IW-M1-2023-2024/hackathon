import { Box, Stack, SxProps, Theme, Typography } from "@mui/material"
import { ReactNode } from "react"

interface TextImageProps {
    reverse?: boolean
    button?: JSX.Element
    title: string
    src: string
    alt?: string
    sx?: SxProps<Theme>
    children?: ReactNode
}

const TextImage = ({ reverse, title, src, alt, button, sx, children }: TextImageProps) => {
    return (
        <>
            <Stack
                component={"article"}
                direction={reverse ? "row-reverse" : "row"}
                justifyContent="space-between"
                alignItems="center"
                gap="20px"
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
                        width: "auto",
                        paddingRight: reverse ? "20px" : "0px",
                        "& > h3": {
                            fontSize: "2rem",
                            fontWeight: "bold"
                        }
                    }}
                >
                    <Typography variant="h3">{title}</Typography>
                    <Typography>
                        {children}
                    </Typography>
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
                        aspectRatio: "1/1",
                    }}
                    className="d-shadow"
                />
            </Stack>
        </>
    )
}

export default TextImage
import { Box, Stack, SxProps, Theme } from "@mui/material"
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
                        {children}
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
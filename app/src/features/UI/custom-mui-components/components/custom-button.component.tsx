import { Button, ButtonProps, styled } from "@mui/material";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText('#660033'),
    backgroundColor: '#660033',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#B9515B',
    },
}));

export default ColorButton
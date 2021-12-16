import { createTheme } from "@mui/material/styles";

export const theme = createTheme( {
    palette: {
        primary: {
            main: '#1de9b6',
            light:'#6effe8',
            dark: '#00b686',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#455a64',
            light: '#455a64',
            dark: '#1c313a',
            contrastText: '#FFFFFF',
        },
    },
    typography: {
        h1: {
            color: '#FFFFFF'
        },
        h2: {
            color: '#FFFFFF'
        },
        h3: {
            color: '#FFFFFF'
        },
        subtitle1: {
            color: '#FFFFFF'
        },
        button: {
            color: '#FFFFFF'
        }
    }
});

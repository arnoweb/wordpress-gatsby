import React from 'react'
import Helmet from 'react-helmet'

import Mainnav from "./Mainnav"
import Footernav from "./Footernav"
import '../styles/main.scss'

import {ThemeProvider, responsiveFontSizes, createTheme} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
//import { theme } from '../themes/theme'

let theme = createTheme( {
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
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 750,
            md: 1080,
            lg: 1366,
            xl: 1920,
        },
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{

                }
            }
        }
    }
});

theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
}));

//const {header, logo, menuButton, toolbar, drawerContainer} = useStyles();


const TemplateWrapper = ({ children }) => {

    const classes = useStyles();

return (
    <ThemeProvider theme={theme}>
  <div>
    <Helmet title="Homepage" />
    <Mainnav />
    <main>
        <div>{children}</div>
    </main>
    <footer><Footernav /></footer>
  </div>
    </ThemeProvider>
)
}

export default TemplateWrapper

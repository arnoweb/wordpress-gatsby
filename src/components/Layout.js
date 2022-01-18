import React from 'react'
import Helmet from 'react-helmet'
//import {Lato} from "@fontsource/lato"
//import { ArchivoBlack } from "@fontsource/archivo-black"

import '../styles/main.scss'

import Mainnav from "./Mainnav"
import Footernav from "./Footernav"


import { CssBaseline } from '@mui/material'
import {ThemeProvider, responsiveFontSizes, createTheme} from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
//import { theme } from '../themes/theme'

let theme = createTheme()
theme = createTheme( theme ,{
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
        fontFamily: [
            'Archivo Black',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            color: '#FFFFFF'
        },
        h2: {
            color: '#FFFFFF',
            [theme.breakpoints.up("md")]: {
                color: 'red',
            }
        },
        h3: {
            color: '#FFFFFF',
            [theme.breakpoints.down('md')]: {
                fontSize: '1.4rem',
            },
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
        /*MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Archivo Black';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Archivo Black'), url(${ArchivoBlack}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
        },*/
        MuiPaper:{
            styleOverrides:{
                root:{
                    backgroundColor: '#1de9b6',
                    color: '#FFFFFF',
                }
            }
        },
        MuiButton:{
            styleOverrides:{
                root:{

                }
            }
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: '#1de9b6',
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
        <CssBaseline />
  <div>
    <Helmet title="Homepage" />
    <Mainnav />
    <main>
        <div id="main">{children}</div>
    </main>
    <footer><Footernav /></footer>
  </div>
    </ThemeProvider>
)
}

export default TemplateWrapper

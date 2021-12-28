/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import React, { useState, useEffect } from "react"
import { Link as RouterLink} from "gatsby"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    SwipeableDrawer,
    Link,
    MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from "@mui/icons-material/Menu"

import { graphql, useStaticQuery } from "gatsby"
import { UniversalLink } from "../utils/UniversalLink"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"

//import style from "../styles/layout/_Mainnav.scss"

const useStyles = makeStyles(theme => ({
    logo: {
        textAlign: "left",
    },
    menuButton: {
        color: `${theme.palette.primary.contrastText} !important`,
        fontSize: "1rem !important",
        fontWeight: "700 !important",
        padding: "6px 8px !important",
        borderRadius: "0px",
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            color: `${theme.palette.primary.contrastText} !important`,
        },
        '&:before': {
            height: "3px",
            position: "absolute",
            content: '""',
            WebkitTransition: "all 0.35s ease",
            transition: "all 0.35s ease",
            backgroundColor: theme.palette.primary.main,
            width: "0",
        },
        '&:after': {
            height: "3px",
            position: "absolute",
            content: '""',
            WebkitTransition: "all 0.35s ease",
            transition: "all 0.35s ease",
            backgroundColor: theme.palette.primary.main,
            width: "0",
        },
        '&::before':{
            top: "0",
            left: "0",
        },
        '&::after':{
            bottom: "0",
            right: "0",
        },
        '&:hover::before':{
            width: "100%",
        },
        '&:hover::after':{
            width: "100%",
        },
    },
    appbar: {
        backgroundColor:"transparent !important",
        boxShadow:"none !important",
    },
    drawerContainer: { //mobile
        padding: "20px 30px",
    },
}));



const MenuLoop = ({ menuItems }) => {

    const {logo, menuButton, appbar, drawerContainer} = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });
    const {mobileView, drawerOpen} = state;

    const [toolbarStyled, setToolbarStyled] = React.useState('customDynamicToolbar');
    const toolbarRef = React.useRef()
    toolbarRef.current = toolbarStyled

    useEffect(() => {

        const setResponsiveness = () => {
            return window.innerWidth < 1080
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        let scrollPosition = 0;

        const pageHeight = document.body.offsetHeight;
        console.log('main nav pageHeight', pageHeight)
        const viewportHeight = window.innerHeight;
        console.log('main nav viewportHeight', viewportHeight)

        const handleScroll = () => {
            const newScrollPosition = window.scrollY;
            if (newScrollPosition > 100) {
                console.log('main nav position:', 'ok')
                setToolbarStyled('customDynamicToolbarReduced');
                console.log('main nav toolbarStyled OK', toolbarRef.current)
            } else{
                console.log('main nav position:', 'ko')
                setToolbarStyled('customDynamicToolbar');
                console.log('main nav toolbarStyled KO', toolbarRef.current)
            }

            scrollPosition = newScrollPosition;


            console.log('main nav scrollPosition', scrollPosition)
            console.log('main nav newScrollPosition', newScrollPosition)
        }
        window.addEventListener('scroll', handleScroll, {passive: true});

        //console.log('main nav display', appbarStyled)

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);//end useEffect

    //DESKTOP: display Toolbar with Buttons link
    const displayDesktop = () => {
        return (
            <Toolbar className={toolbarRef.current} >
                {getLogo}
                <div> {getMenuButtons()} </div>
            </Toolbar>
    );
    };//end displayDesktop

    // MOBILE
    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({...prevState, drawerOpen: true}));
        const handleDrawerClose = () =>
            setState((prevState) => ({...prevState, drawerOpen: false}));

        return (
            <Toolbar>
            <IconButton
                {...{
                        edge: "start",
                        color:"inherit",
                        "aria-label":"menu",
                        "aria-haspopup":"true",
                        onClick:handleDrawerOpen,
                }}
            >
                <MenuIcon/>
            </IconButton>

            <SwipeableDrawer
                {...{
                anchor: "left",
                    open:drawerOpen,
                    onClose:handleDrawerClose,
                }}
            >
                <div className={drawerContainer}>{ getDrawerChoices() }</div>
            </SwipeableDrawer>

            <div>{getLogo}</div>
            </Toolbar>
    );
    };//end DisplayMobile

    //Get items LINK label,path for Navigation
    const getDrawerChoices = () => {

        console.log("getDrawerChoice MenuItems: ", menuItems);

        return menuItems.map(({label, path}) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to:path,
                        color:"inherit",
                        style:{textDecoration: "none"},
                        key: label,
                    }}
                >
                <MenuItem>{label}</MenuItem>
                </Link>
        );
        });
    };//end getDrawerChoices

    //DESKTOP : Get items BUTTON label,path for Navigation
    const getMenuButtons = () => {
        return menuItems.map(({label, path}) => {
            return (
                <Button
                    {...{
                        component: RouterLink,
                        key: label,
                        to: path,
                        className: menuButton,
                     }}
                >
                    {label}
                </Button>
        );
        });
    };//end getMenuButtons

    //LOGO
    const getLogo = (
        <Typography variant = "h6" component = "h1" className={logo}>Le Club des Déraillés</Typography>
    );


    return(
            <AppBar className={appbar}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
    )

}//end MenuLoop



const Mainnav = () => {
    const wpMenu = useStaticQuery(graphql`
    {
      allWpMenuItem(
        sort: { fields: order, order: ASC }
        filter: {
          menu: { node: { slug: { eq: "menu_principal" } } }
        }
      ) {
        nodes {
          id
          label
          path
          target
        }
      }
    }
  `)//end wpMenu

    console.log("Raw data Mainnav:", wpMenu.allWpMenuItem.nodes)

    const headerMenu = FlatListToHierarchical(wpMenu.allWpMenuItem.nodes, {
        idKey: "id",
        childrenKey: "routes",
        parentKey: "parent",
    })//end headerMenu

    //console.log("headerMenu: ", headerMenu)

    return (
        <div>
                { headerMenu.length > 0 && <MenuLoop menuItems={headerMenu}></MenuLoop> }
         </div>
    )//end return
}//end MainNav

export default Mainnav

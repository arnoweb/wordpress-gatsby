/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import * as React from "react"
import Carousel from 'react-material-ui-carousel'
import { Grid, Box, Paper, Button, Typography, Grow, Collapse, Fade, Zoom, Slide } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, makeStyles } from '@mui/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import { UniversalLink } from "../utils/UniversalLink"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"



const useStyles = makeStyles((theme) => ({
    slGridContainer: {
        backgroundColor: '',
        zIndex:1,
        position:'absolute',
        top: '30%',
        padding: '0 9em',
        [theme.breakpoints.down("md")]: {
            padding: '1.6em 6em',
        },

    }
}));
//import style from "../styles/components/_Slideshow.scss"

const SlideshowLoop = ({ slideshowItems } ) => {

    const theme = useTheme();
    //{console.log("SlideshowLoop slideshowItems: ", slideshowItems)}
    const [state, setState] = React.useState({current:0});
    const {current} = state;

    return (
        <Carousel className="slideshow-main"
            onChange={ (index) => {

                //setState({current:index)};
                setState((prevState) => ({...prevState, current: index}))

               // console.log('carousel current:',current);
                //console.log('carousel index:',index);

            }}
            autoPlay={false}
            animation={"fade"}
            duration={"1"}
            indicatorContainerProps={{
                style: {
                    position: 'absolute',
                        bottom: '1.2em',
                        textAlign: 'center',
                        zIndex: '2',
                    }
                }}
            indicatorIconButtonProps={{
                style: {
                    color: theme.palette.primary.main,
                        padding: '3px',
                }
                }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: 'transparent',
                }
            }}

    NextIcon={<ArrowForwardIosIcon className="icon-color-dark" aria-label="Suivant"/>}
    PrevIcon={<ArrowBackIosNewIcon className="icon-color-dark" aria-label="Précédent"/>}

    fullHeightHover={true}     // We want the nav buttons wrapper to only be as big as the button element is
    navButtonsAlwaysVisible={true}
    navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
            backgroundColor: theme.palette.primary.main,
                 marginLeft: '1.2em',
                 marginRight: '1.2em',
                }
        }}

        >
        {
            slideshowItems.map( (item, index) => <SlideshowItem key={index} index={index} item={item} current={current}/> )

        }
        </Carousel>

)
}

function SlideshowItem(props){
    //{console.log("SlideshowLoop slideshowItems props index: ", props.index)}
    //{console.log("SlideshowLoop slideshowItems props current: ", props.current)}
    //{console.log("SlideshowLoop slideshowItems current: ", current)}

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const classes = useStyles();
    let growIn = false;
    let slImg = {};
    if(props.index == props.current){ growIn = true }else{growIn = false};

    {console.log("SlideshowLoop slideshowItems mediaquery matches: ", matches)}
    if(matches){
        slImg = props.item.slideshowImageDesktop.localFile;
        {console.log("SlideshowLoop slideshowItems image desktop path: ", slImg)}
    }
    else{
        slImg = props.item.slideshowImageMobile.localFile;
        {console.log("SlideshowLoop slideshowItems image mobile path: ", slImg)}
    }
    //{console.log("SlideshowLoop slideshowItems props current growIn: ", growIn)}


    return (
        <Paper>

            <div class="slideshow-main-overlay"></div>

            <GatsbyImage image={ getImage(slImg) } alt={props.item.slideshowTitre} />

    <Grid container className={ classes.slGridContainer } mt={{ xs:1, sm:2, md:2, lg:8, xl:8}}>
            <Grid item xs={12}>

                <Fade
                    in={growIn}
                    style={{ transitionDelay: growIn ? '200ms' : '0ms' }}
                    >
                    <Typography variant="h3" component="h2" mb={2}>{props.item.slideshowTitre}</Typography>
                </Fade>

            </Grid>
            <Box component={Grid} item xs={8} xs={4} display={{ xs:"none", sm:"none", md:"block", lg:"block", xl:"block"}}>

                <Slide direction="left"
                    in={growIn}
                    >
                    <Typography variant="subtitle1" component="p">{props.item.slideshowDescription}</Typography>
                </Slide>

            </Box>
            <Grid item xs={12} mt={{ xs:1, sm:2, md:2, lg:3, xl:3}}>
                <Button href={`${props.item.slideshowUrl}`} variant="contained" color="primary">Voir plus</Button>
            </Grid>
            </Grid>

        </Paper>
    )
}


const Slideshow = () => {
    const wpSlideshow = useStaticQuery(graphql`
    {
  allWpPage(filter: {isFrontPage: {eq: true}}) {
    nodes {
      acf_hp {
        slideshow {
          slideshowUrl
          slideshowTitre
          slideshowDescription
          slideshowImageDesktop {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 1920
                  height: 1080
                  transformOptions: {cropFocus: CENTER}
                )
              }
            }
          }
          slideshowImageMobile {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 750
                  height: 800
                  transformOptions: {cropFocus: CENTER}
                )
              }
            }
          }

        }
      }
    }
  }
    }
  `)

    console.log("Raw data slideshow:",  wpSlideshow.allWpPage.nodes[0].acf_hp.slideshow)

    const slideshowData = FlatListToHierarchical(wpSlideshow.allWpPage.nodes[0].acf_hp.slideshow, {
        idKey: "id",
        childrenKey: "routes",
        parentKey: "parent",
    })
    console.log("slideshowData: ", slideshowData)

    return (
        <div>
        {slideshowData.length > 0 && <SlideshowLoop slideshowItems={slideshowData}></SlideshowLoop>}
            </div>
)
}

export default Slideshow

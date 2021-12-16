/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import React from "react"
import Carousel from 'react-material-ui-carousel'
import { Grid, Box, Paper, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"

const useStyles = makeStyles((theme) => ({
    slGridContainer: {
        backgroundColor: '',
        zIndex:1,
        position:'absolute',
        top:'30%',
        padding: '0 9em',
    }
}));
//import style from "../styles/components/_Slideshow.scss"

const SlideshowLoop = ({ slideshowItems }) => {

    //{console.log("SlideshowLoop slideshowItems: ", slideshowItems)}


    return (
        <Carousel className="slideshow-main"
    autoPlay={false}
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
                 color: '#3bdd8f',
                     padding: '3px',
        }
    }}
    activeIndicatorIconButtonProps={{
        style: {
            backgroundColor: 'transparent',
        }
    }}


    NextIcon={<ArrowForwardIosIcon className="icon-color-dark" aria-label="Suivant"/>}
    PrevIcon={<ArrowBackIosIcon className="icon-color-dark" aria-label="Précédent"/>}

    fullHeightHover={true}     // We want the nav buttons wrapper to only be as big as the button element is
    navButtonsAlwaysVisible={true}
    navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
            backgroundColor: '#3bdd8f',
                 marginLeft: '20px',
                marginRight: '20px',
                }
        }}

        >
        {
            slideshowItems.map( (item, i) => <SlideshowItem key={i} item={item} /> )

        }
        </Carousel>

)
}

function SlideshowItem(props){
    {console.log("SlideshowLoop slideshowItems props: ", props)}

    const classes = useStyles();

    return (
        <Paper>

            <div class="slideshow-main-overlay"></div>
            <GatsbyImage image={getImage(props.item.slideshowImageDesktop.localFile)} alt={props.item.slideshowTitre} />

            <Grid container className={ classes.slGridContainer } mt={{ xs:1, sm:2, md:2, lg:8, xl:8}}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h2" mb={2}>{props.item.slideshowTitre}</Typography>
            </Grid>
            <Box component={Grid} item xs={8} xs={4} display={{ xs:"none", sm:"block", md:"block", lg:"block", xl:"block"}}>
                <Typography variant="subtitle1" component="p">{props.item.slideshowDescription}</Typography>
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

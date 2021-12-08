/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import React from "react"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import UniversalLink from "../utils/UniversalLink"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"

//import style from "./Slideshow.module.css"

const SlideshowLoop = ({ slideshowItems }) => {

    //{console.log("SlideshowLoop slideshowItems: ", slideshowItems)}

    return (
        <Carousel>
        {
            slideshowItems.map( (item, i) => <Item key={i} item={item} /> )
        }
        </Carousel>

)
}

function Item(props){
    {console.log("SlideshowLoop slideshowItems props: ", props)}
    //const image = getImage()
    return (
        <Paper>

            <h2>{props.item.slideshowTitre}</h2>
            <GatsbyImage image={getImage(props.item.slideshowImage.localFile)} alt={props.item.slideshowTitre} />
            <Button className="CheckButton">
            Check it out!
            </Button>

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
            slideshowImage {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1920,
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

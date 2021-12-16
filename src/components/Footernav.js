/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import UniversalLink from "../utils/UniversalLink"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"

import style from "../styles/layout/_Footernav.scss"

const MenuFooterLoop = ({ menuItems }) => {
    return (
        <ul>
        {menuItems.map((menuItem, index) => {
                return (
                    <li
                key={index}
                className={menuItem.routes.length > 0 ? "has-submenu" : undefined}
                    >
                    <UniversalLink to={menuItem.path} activeClassName="current-page">
                    {menuItem.label}
                    </UniversalLink>
                {menuItem.routes.length > 0 && (
                <MenuFooterLoop menuItems={menuItem.routes}></MenuFooterLoop>
                )}
            </li>
            )
            })}
        </ul>
)
}

const Footernav = () => {
    const wpMenu = useStaticQuery(graphql`
    {
      allWpMenuItem(
        sort: { fields: order, order: ASC }
        filter: {
          menu: { node: { slug: { eq: "menu_footer" } } }
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
  `)

    console.log("Raw data Footer:", wpMenu.allWpMenuItem.nodes)

    const footerMenu = FlatListToHierarchical(wpMenu.allWpMenuItem.nodes, {
        idKey: "id",
        childrenKey: "routes",
        parentKey: "parent",
    })
    console.log("footerMenu: ", footerMenu)

    return (
        <nav>
        {footerMenu.length > 0 && <MenuFooterLoop menuItems={footerMenu}></MenuFooterLoop>}
            </nav>
)
}

export default Footernav

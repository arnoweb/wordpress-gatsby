/**
 * Creates hierarchical menu based on WordPress menu.
 * @link https://www.wpgraphql.com/docs/menus/#hierarchical-data
 */
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import UniversalLink from "../utils/UniversalLink"
import { FlatListToHierarchical } from "../utils/FlatListToHierarchical"

import style from "./Mainnav.module.css"

const MenuLoop = ({ menuItems }) => {
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
                <MenuLoop menuItems={menuItem.routes}></MenuLoop>
                )}
            </li>
            )
            })}
        </ul>
)
}

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
  `)

    console.log("Raw data Mainnav:", wpMenu.allWpMenuItem.nodes)

    const headerMenu = FlatListToHierarchical(wpMenu.allWpMenuItem.nodes, {
        idKey: "id",
        childrenKey: "routes",
        parentKey: "parent",
    })
    console.log("headerMenu: ", headerMenu)

    return (
        //<nav className={style.Mainnav}>
        <nav>
        {headerMenu.length > 0 && <MenuLoop menuItems={headerMenu}></MenuLoop>}
        </nav>
)
}

export default Mainnav

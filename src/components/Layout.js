import React from 'react'
import Helmet from 'react-helmet'

import Mainnav from "./Mainnav"
import Footernav from "./Footernav"
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Homepage" />
    <header><Mainnav /></header>
    <main>
        <div>{children}</div>
    </main>
    <footer><Footernav /></footer>
  </div>
)

export default TemplateWrapper

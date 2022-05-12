import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <div>
      <header>
        <div className="py-6">
          <Seo title={`About ${siteTitle}`} />
          <h3 className="text-center text-6xl font-black tracking-widest md:text-8xl">
            <Link to="/">{siteTitle}</Link>
          </h3>
        </div>
      </header>

      <div>
        <h1>Naoto Nishimura</h1>
        <p>Welcome to About Page.</p>
        <p>TBD.</p>
        <Link to="/">Top</Link>
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
export default About

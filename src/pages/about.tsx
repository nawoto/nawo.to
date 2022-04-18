import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About me" />
      <div className="">
        <h1 className="">Naoto Nishimura</h1>
        <p>Welcome to About Page.</p>
        <p>TBD.</p>
        <Link to="/">Topへ</Link>
      </div>
    </Layout>
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

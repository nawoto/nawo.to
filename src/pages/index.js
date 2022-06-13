import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import ContentItem from "../components/item"
import Seo from "../components/seo"

const TopPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes.filter(
    node => node.fields.collection === `blog`
  )
  const articles = data.allMarkdownRemark.nodes.filter(
    node => node.fields.collection === `article`
  )

  if (posts.length === 0 || articles.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={siteTitle} />
        <p>No contents found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle} />
      <div className="hover-style">
        <h1 className="border-y py-4 text-center text-4xl font-semibold uppercase tracking-widest md:border-none">
          <Link to="/logs">log</Link>
        </h1>
      </div>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          return (
            <li
              key={post.fields.slug}
              className="hover-style border-y border-solid py-2"
            >
              <ContentItem article={post} />
            </li>
          )
        })}
      </ol>

      <div className="hover-style">
        <h1 className="border-y py-4 text-center text-4xl font-semibold uppercase tracking-widest">
          <Link to="/texts">texts</Link>
        </h1>
      </div>
      <ol style={{ listStyle: `none` }}>
        {articles.map(article => {
          return (
            <li
              key={article.fields.slug}
              className="hover-style border-y border-solid py-2"
            >
              <ContentItem article={article} />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TopPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          collection
          slug
        }
        frontmatter {
          date(formatString: "YYYY/MM/DD")
          title
          description
        }
      }
    }
  }
`

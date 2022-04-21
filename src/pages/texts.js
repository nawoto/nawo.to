import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TextsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={`TEXTS | ${siteTitle}`} />
        <p>No contents found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`TEXTS | ${siteTitle}`} />
      <div className="hover-style py-4 text-center">
        <h1 className="text-4xl font-semibold uppercase tracking-widest">
          texts
        </h1>
        <p className="text-sm text-gray-500">
          不定期に思いついたことなどを文章にまとめています✍️
        </p>
      </div>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li
              key={post.fields.slug}
              className="hover-style border-y border-solid py-2"
            >
              <article
                className="mx-auto w-5/6"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="py-4">
                  <h2 className="text-2xl font-medium">
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                  <div className="my-2 border py-2 text-center uppercase">
                    <Link to={post.fields.slug}>read more</Link>
                  </div>
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default TextsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "article" } } }
    ) {
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

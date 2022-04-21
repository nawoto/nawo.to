import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
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

      <div className="hover-style">
        <h1 className="border-y py-4 text-center text-4xl font-semibold uppercase tracking-widest">
          <Link to="/texts">texts</Link>
        </h1>
      </div>
      <ol style={{ listStyle: `none` }}>
        {articles.map(article => {
          const title = article.frontmatter.title || article.fields.slug

          return (
            <li
              key={article.fields.slug}
              className="hover-style border-y border-solid py-2"
            >
              <article
                className="mx-auto w-5/6"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="py-4">
                  <h2 className="text-2xl font-medium">
                    <Link to={article.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{article.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        article.frontmatter.description || article.excerpt,
                    }}
                    itemProp="description"
                  />
                  <div className="my-2 border py-2 text-center uppercase">
                    <Link to={article.fields.slug}>read more</Link>
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

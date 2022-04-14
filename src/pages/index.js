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
        <Seo />
        <p>
          No contents found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo />
      <div className="hover-style">
        <h1 className="border-y text-4xl text-center tracking-widest font-semibold py-4 uppercase md:border-none">log</h1>
      </div>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} className="border-solid border-y py-2 hover-style">
              <article
                className="w-5/6 mx-auto"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="py-4">
                  <h2 className="font-medium text-2xl">
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
                  <div className="border py-2 my-2 text-center uppercase">
                    <Link to={post.fields.slug}>read more</Link>
                  </div>
                </section>
              </article>
            </li>
          )
        })}
      </ol>

      <div className="hover-style">
        <h1 className="border-y text-4xl text-center tracking-widest font-semibold py-4 uppercase">texts</h1>
      </div>
      <ol style={{ listStyle: `none` }}>
        {articles.map(article => {
          const title = article.frontmatter.title || article.fields.slug

          return (
            <li key={article.fields.slug} className="border-solid border-y py-2 hover-style">
              <article
                className="w-5/6 mx-auto"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className="py-4">
                  <h2 className="font-medium text-2xl">
                    <Link to={article.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{article.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: article.frontmatter.description || article.excerpt,
                    }}
                    itemProp="description"
                  />
                  <div className="border py-2 my-2 text-center uppercase">
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

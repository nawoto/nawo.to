import * as React from "react"
import { Link, graphql } from "gatsby"
import { LikeButton } from "@lyket/react"
import {
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteUrl = data.site.siteMetadata?.siteUrl
  const { previous, next } = data

  const pageTitle = `${post.frontmatter.title} | ${siteTitle}`
  const shareUrl = `${siteUrl}${post.fields.slug}`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={pageTitle}
        description={post.frontmatter.description || post.excerpt}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header className="p-2">
          <h1 itemProp="headline" className="text-3xl font-bold">
            {post.frontmatter.title}
          </h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="prose px-4 py-3 md:mx-10 md:max-w-fit"
        />
        <footer className="mx-2 md:mx-14">
          <TwitterShareButton url={shareUrl} title={pageTitle}>
            <TwitterIcon round={true} size={28} />
          </TwitterShareButton>
          <HatenaShareButton url={shareUrl} title={pageTitle}>
            <HatenaIcon round={true} size={28} />
          </HatenaShareButton>
          <LikeButton
            id={post.id}
            namespace={post.fields.collection}
            component={LikeButton.templates.Twitter}
          />
        </footer>
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        collection
      }
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

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
import Comments from "../components/comments"

const ArticleTemplate = ({ data, location }) => {
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
      <article
        itemScope
        itemType="http://schema.org/Article"
        className="h-entry"
      >
        <header className="p-2">
          <h1 itemProp="headline" className="p-name text-3xl font-bold">
            {post.frontmatter.title}
          </h1>
          <p className="dt-published">{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="e-content prose px-4 py-3 md:mx-10 md:max-w-fit"
        />
        <footer className="md:mx-10">
          <p className="px-4 text-sm text-gray-400">
            <a href={shareUrl} className="u-url pr-1">
              this article
            </a>
            written by
            <a
              href="http://nawo.to/about"
              rel="author"
              className="h-card p-author px-1"
            >
              NISHIMURA Naoto
            </a>
            (<span className="p-nickname">nawoto</span>)
          </p>
          <TwitterShareButton url={shareUrl} title={pageTitle} className="mx-4">
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
          <Comments />
        </footer>
      </article>
      <nav>
        <ul className="my-5 grid grid-cols-2 divide-x border-y text-center text-2xl uppercase">
          <li className="hover-style p-3">
            {previous ? (
              <Link
                to={previous.fields.slug}
                title={previous.frontmatter.title}
                rel="prev"
              >
                prev
              </Link>
            ) : (
              <span className="text-gray-400">prev</span>
            )}
          </li>
          <li className="hover-style p-3">
            {next ? (
              <Link
                to={next.fields.slug}
                title={next.frontmatter.title}
                rel="next"
              >
                next
              </Link>
            ) : (
              <span className="text-gray-400">next</span>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default ArticleTemplate

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

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import defaultOpenGraphImage from "../images/opengraph-default.png"

const Seo = ({ description, lang, meta, title, link, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const ogImageUrl =
    site.siteMetadata.siteUrl + (image || defaultOpenGraphImage)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: ogImageUrl,
        },
        {
          property: `image`,
          content: ogImageUrl,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: ogImageUrl,
        },
      ].concat(meta)}
      link={[
        { rel: `me authn`, href: `https://twitter.com/nawoto` },
        { rel: `me`, href: `https://github.com/nawoto/` },
        { rel: `me`, href: `https://speakerdeck.com/nawoto` },
        { rel: `me`, href: `https://www.instagram.com/nawoto/` },
        { rel: `me`, href: `https://www.facebook.com/nishimura.nawoto` },
        { rel: `me`, href: `https://www.amazon.co.jp/~/e/B00B46MLPG` },
        { rel: `webmention`, href: `https://webmention.io/nawo.to/webmention` },
        { rel: `pingback`, href: `https://webmention.io/nawo.to/xmlrpc` },
      ].concat(link)}
    />
  )
}

Seo.defaultProps = {
  lang: `ja`,
  meta: [],
  link: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

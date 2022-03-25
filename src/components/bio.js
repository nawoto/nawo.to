/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div>
      <h3 className="border-y font-medium text-2xl text-center tracking-widest uppercase">author</h3>
      <div className="flex">
          <div className="border h-25 w-25">
            <StaticImage
              className="rounded-full"
              layout="fixed"
              formats={["auto", "webp", "avif"]}
              src="../images/profile-pic.png"
              width={100}
              height={100}
              quality={95}
              alt="Profile picture"
            />
          </div>
        {author?.name && (
        <div className="w-full max-h-25 p-1 border-b">
          <p className="text-lg font-bold">{author.name}</p>
          <p className="text-sm">{author.summary}</p>
          <p className="text-sm text-right">
            <Link to="/about" className="uppercase underline">read more</Link>
          </p>
        </div>
      )}
      </div>
      <div>
        <ul className="text-center text-xl">
          <li className="py-2 border-b">
            <a href="https://twitter.com/nawoto">Twitter</a></li>
          <li className="py-2 border-b">
            <a href="https://github.com/nawoto/">Github</a>
          </li>
          <li className="py-2 border-b">
            <a href="https://speakerdeck.com/nawoto">SpeakerDeck</a>
          </li>
          <li className="py-2 border-b">
            <a href="https://www.instagram.com/nawoto/">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Bio

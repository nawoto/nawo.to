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

  return (
    <div>
      <h3 className="hover-style border-y text-center text-2xl font-medium uppercase tracking-widest md:hidden">
        author
      </h3>
      <div className="hover-style flex md:grid md:grid-cols-1">
        <div className="h-25 w-25 border md:mx-auto md:border-none">
          <StaticImage
            className="z-10 overflow-hidden rounded-full"
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
          <div className="max-h-25 w-full border-b p-1 md:text-center">
            <p className="text-lg font-bold">{author.name}</p>
            <p className="text-sm">{author.summary}</p>
            <p className="text-right text-sm md:text-center">
              <Link to="/about" className="uppercase underline">
                read more
              </Link>
            </p>
          </div>
        )}
      </div>
      <div>
        <ul className="text-center text-sm">
          <li className="hover-style border-b py-2">
            <a href="https://twitter.com/nawoto">Twitter</a>
          </li>
          <li className="hover-style border-b py-2">
            <a href="https://github.com/nawoto/">Github</a>
          </li>
          <li className="hover-style border-b py-2">
            <a href="https://speakerdeck.com/nawoto">SpeakerDeck</a>
          </li>
          <li className="hover-style border-b py-2">
            <a href="https://www.instagram.com/nawoto/">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Bio

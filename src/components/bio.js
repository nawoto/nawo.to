/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareRss } from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faGithub,
  faSpeakerDeck,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

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
      <div className="hover-style h-card flex md:grid md:grid-cols-1">
        <div className="border md:mx-auto md:border-none md:pt-1">
          <StaticImage
            className="z-10 overflow-hidden rounded-full"
            imgClassName="u-photo"
            layout="fixed"
            formats={["auto", "webp", "avif"]}
            src="../images/profile-pic.png"
            width={138}
            height={138}
            quality={95}
            alt="Profile picture"
          />
        </div>
        {author?.name && (
          <div className="w-full border-b p-1 md:text-center">
            <p className="text-lg font-bold">
              <Link to="/" className="p-name u-url">
                {author.name}
              </Link>
            </p>
            <p className="text-sm md:px-10 md:text-left">
              <span className="p-name">西村直人</span>。 おもに
              <span className="p-nickname">nawoto</span> という名前で
              <span className="p-note">いろいろしています</span>
            </p>
            <p className="text-right text-sm md:text-center">
              <Link to="/about" className="uppercase underline">
                read me
              </Link>
            </p>
            <ul className="flex flex-row justify-end pt-2 text-2xl md:justify-center">
              <li className="hover-style px-2">
                <a
                  href="https://twitter.com/nawoto"
                  className="u-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a
                  href="https://github.com/nawoto/"
                  className="u-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a
                  href="https://speakerdeck.com/nawoto"
                  className="u-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faSpeakerDeck} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a
                  href="https://www.instagram.com/nawoto/"
                  className="u-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="hover-style pl-2">
                <Link to="/rss.xml">
                  <FontAwesomeIcon icon={faSquareRss} />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bio

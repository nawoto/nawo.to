import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareRss } from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faGithub,
  faSpeakerDeck,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

import Seo from "../components/seo"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const authorName = data.site.siteMetadata?.author.name

  return (
    <div>
      <Seo title={`About Me | ${siteTitle}`} />
      <header>
        <div className="py-6">
          <h3 className="font-bolt text-center text-xl uppercase tracking-widest text-gray-500 md:text-4xl">
            readme
          </h3>
        </div>
        <nav>
          <ul className="grid grid-cols-2 divide-x text-center text-lg uppercase md:grid-cols-4">
            <li className="hover-style border-y">
              <Link to="/">top</Link>
            </li>
            <li className="hover-style border-y">
              <Link to="/logs">log</Link>
            </li>
            <li className="hover-style border-b md:border-y">
              <Link to="/texts">texts</Link>
            </li>
            <li className="hover-style border-b md:border-y">
              <Link to="/about">about</Link>
            </li>
          </ul>
        </nav>
      </header>

      <article
        className="h-card mx-5 md:mx-44"
        itemScope
        itemType="https://www.schema.org/Person"
      >
        <section className="flex flex-row py-3">
          <div>
            <StaticImage
              className="z-10 overflow-hidden rounded-lg"
              imgClassName="u-photo"
              layout="fixed"
              itemProp="image"
              formats={["auto", "webp", "avif"]}
              src="../images/profile-pic.png"
              width={138}
              height={138}
              quality={95}
              alt="Profile picture"
            />
          </div>
          <div className="px-3 text-right md:text-left">
            <h3
              className="p-name text-xl font-bold md:text-4xl"
              itemProp="name"
              lang="en"
            >
              {authorName}
            </h3>
            <div className="text-xl" itemProp="name">
              西村 直人
            </div>
            <div className="p-nickname text-gray-400">nawoto</div>
            <div>
              <Link className="u-url text-gray-400" to="/">
                https://nawo.to
              </Link>
            </div>
            <ul className="flex flex-row justify-end pt-2 text-xl md:justify-start md:text-sm">
              <li className="hover-style pr-2">
                <a href="https://twitter.com/nawoto">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a href="https://github.com/nawoto/">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a href="https://speakerdeck.com/nawoto">
                  <FontAwesomeIcon icon={faSpeakerDeck} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a href="https://www.instagram.com/nawoto/">
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
        </section>

        <section className="py-3 text-xs">
          <h3 className="font-bold">@@@</h3>
          <p>
            <p itemProp="affiliation" className="md:text-sm">
              一般社団法人アジャイルチームを支える会
            </p>
            <p itemProp="jobTitle" className="pl-2">
              代表理事
            </p>
          </p>
          <p className="pt-2">
            <p itemID="affiliation" className="md:text-sm">
              株式会社エス・エム・エス
            </p>
            <p itemProp="jobTitle" className="pl-2">
              エンジニアリングマネージャー
            </p>
            <p itemProp="jobTitle" className="pl-2">
              スクラムマスター
            </p>
          </p>
        </section>

        <div>
          <h3 className="text-4xl">TL;DR</h3>
          <div className="text-sm">
            <p className="py-2">
              2005年からアジャイルなソフトウェア開発を実践。
            </p>
            <p className="py-2">
              エクストリーム・プログラミングとの出会いと株式会社永和システムマネジメントでチーム開発を経験して以来、「アジャイルな開発を通じて、ビジネスとともに成長できるような良いチームを増やしたい」という想いで日々奮闘中。
            </p>
            <p className="py-2">
              書籍 『アジャイルサムライ』監訳、書籍「SCRUM BOOT CAMP THE
              BOOK【増補改訂版】」の執筆をはじめ、 「Scrum Boot Camp
              Premium」「アジャイル相談室」などこれからの人に向けた研修やイベント、支援を続けています。
            </p>
          </div>
        </div>

        <div className="py-5 text-gray-400">
          (🚧More descriptions comes later...)
        </div>

        <div>
          <p className="text-sm text-gray-400">ver 2022.05.17</p>
        </div>
      </article>

      <footer className="border-t text-center text-sm">
        © {new Date().getFullYear()}, NISHIMURA Naoto All Rights Reserved.
      </footer>
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
  }
`
export default About

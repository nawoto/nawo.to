import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareRss, faLocationDot } from "@fortawesome/free-solid-svg-icons"
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
      <Seo title={`About | ${siteTitle}`} />
      <header>
        <div className="py-6">
          <h3 className="text-center text-6xl font-black uppercase tracking-widest text-gray-500 md:text-8xl">
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
        className="mx-5 md:mx-44"
        itemScope
        itemType="https://www.schema.org/Person"
      >
        <section className="flex flex-row py-3">
          <div>
            <StaticImage
              className="z-10 overflow-hidden rounded-lg"
              layout="fixed"
              itemProp="image"
              formats={["auto", "webp", "avif"]}
              src="../images/profile-pic.png"
              width={164}
              height={164}
              quality={95}
              alt="Profile picture"
            />
          </div>
          <div className="px-3 text-right md:text-left">
            <h3
              className="text-lg font-bold md:text-4xl"
              itemProp="name"
              lang="en"
            >
              {authorName}
            </h3>
            <div className="text-xl" itemProp="name">
              西村 直人
            </div>
            <div className="text-gray-400">nawoto</div>
            <div className="text-gray-400">
              <FontAwesomeIcon icon={faLocationDot} />
              <span className="pl-px" itemProp="address">
                <span>Taito-ku, Tokyo</span>,
                <span itemProp="nationality">Japan</span>
              </span>
            </div>
            <div>
              <Link className="text-gray-400" to="/" itemProp="url">
                https://nawo.to
                <meta itemRef="my-urls" />
              </Link>
            </div>
            <ul
              className="flex flex-row justify-end pt-2 text-xl md:justify-start md:text-sm"
              id="my-urls"
            >
              <li className="hover-style pr-2">
                <a href="https://twitter.com/nawoto" itemProp="sameas">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a href="https://github.com/nawoto/" itemProp="sameas">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a href="https://speakerdeck.com/nawoto" itemProp="sameas">
                  <FontAwesomeIcon icon={faSpeakerDeck} />
                </a>
              </li>
              <li className="hover-style px-2">
                <a href="https://www.instagram.com/nawoto/" itemProp="sameas">
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

        <section>
          <meta itemProp="gender" content="Male" />
          <meta itemProp="birthDate" content="1974-05-24" />
          <meta itemRef="my-awards" />
        </section>

        <section className="py-3 text-xs">
          <h3 className="font-bold">@@@</h3>
          <p>
            <p itemProp="affiliation" className="md:text-sm">
              株式会社エス・エム・エス
            </p>
            <p itemProp="jobTitle" className="pl-2">
              エンジニアリングマネージャー
            </p>
            <p itemProp="jobTitle" className="pl-2">
              スクラムマスター
            </p>
          </p>
          <p className="pt-2">
            <p itemProp="affiliation" className="md:text-sm">
              一般社団法人アジャイルチームを支える会
            </p>
            <p itemProp="jobTitle" className="pl-2">
              代表理事
            </p>
          </p>
        </section>

        <div className="py-2">
          <h3 className="text-4xl">TL;DR</h3>
          <span className="text-sm text-gray-400">
            /** 講演するときのプロフィール **/
          </span>
          <div className="text-sm">
            <p className="py-2">
              2005年からアジャイルなソフトウェア開発を実践。
            </p>
            <p className="py-2">
              エクストリーム・プログラミングとの出会いと株式会社永和システムマネジメントでチーム開発を経験して以来、「アジャイルな開発を通じて、ビジネスとともに成長できるような良いチームを増やしたい」という想いで日々奮闘中。
            </p>
            <p className="py-2" itemProp="description">
              書籍 『アジャイルサムライ』監訳、書籍「SCRUM BOOT CAMP THE
              BOOK【増補改訂版】」の執筆をはじめ、 「Scrum Boot Camp
              Premium」「アジャイル相談室」などこれからの人に向けた研修やイベント、支援を続けています。
            </p>
            <p className="py-2">現在、幼い娘の子育てに奮闘中😊</p>
          </div>
        </div>

        <div className="py-2">
          <h3 className="text-4xl">📚Books</h3>
          <span className="text-sm text-gray-400">
            /** 自分の執筆した本です **/
          </span>
          <div>
            <h4>
              <Link
                to="https://amzn.to/3a8TEfA"
                className="font-bold underline"
              >
                SCRUM BOOT CAMP THE BOOK【増補改訂版】
              </Link>
              <span className="text-gray-400"> / 著者</span>
            </h4>
            <a
              href="https://www.amazon.co.jp/SCRUM-BOOT-CAMP-BOOK%E3%80%90%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88%E3%80%91-%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%A0%E3%83%81%E3%83%BC%E3%83%A0%E3%81%A7%E3%81%AF%E3%81%98%E3%82%81%E3%82%8B%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E9%96%8B%E7%99%BA/dp/4798163686?_encoding=UTF8&qid=1652839105&sr=8-1&linkCode=li3&tag=nawoto07-22&linkId=977f44d07526bd05ccf6990ec92df6e4&language=ja_JP&ref_=as_li_ss_il"
              target="_blank"
            >
              <img
                border="0"
                src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4798163686&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=nawoto07-22&language=ja_JP"
              />
            </a>
            <img
              src="https://ir-jp.amazon-adsystem.com/e/ir?t=nawoto07-22&language=ja_JP&l=li3&o=9&a=4798163686"
              width="1"
              height="1"
              border="0"
              alt=""
              style={{ border: "none !important", margin: "0px" }}
            />
          </div>

          <div>
            <h4>
              <Link
                to="https://amzn.to/3NibkUc"
                className="font-bold underline"
              >
                アジャイルサムライ
              </Link>
              <span className="text-gray-400"> / 監訳</span>
            </h4>
            <a
              href="https://www.amazon.co.jp/%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%B5%E3%83%A0%E3%83%A9%E3%82%A4%E2%80%95%E2%80%95%E9%81%94%E4%BA%BA%E9%96%8B%E7%99%BA%E8%80%85%E3%81%B8%E3%81%AE%E9%81%93-%EF%BC%AA%EF%BD%8F%EF%BD%8E%EF%BD%81%EF%BD%94%EF%BD%88%EF%BD%81%EF%BD%8E%EF%BC%B2%EF%BD%81%EF%BD%93%EF%BD%8D%EF%BD%95%EF%BD%93%EF%BD%93%EF%BD%8F%EF%BD%8E-ebook/dp/B00J1XKB6K?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=38V8MIFR4UQ1F&keywords=%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%B5%E3%83%A0%E3%83%A9%E3%82%A4&qid=1652838178&sprefix=%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%B5%E3%83%A0%E3%83%A9%E3%82%A4%2Caps%2C203&sr=8-1&linkCode=li3&tag=nawoto07-22&linkId=2f3d631f4979a8dae0153ce919a24644&language=ja_JP&ref_=as_li_ss_il"
              target="_blank"
            >
              <img
                border="0"
                src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00J1XKB6K&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=nawoto07-22&language=ja_JP"
              />
            </a>
            <img
              src="https://ir-jp.amazon-adsystem.com/e/ir?t=nawoto07-22&language=ja_JP&l=li3&o=9&a=B00J1XKB6K"
              width="1"
              height="1"
              border="0"
              alt=""
              style={{ border: "none !important", margin: "0px" }}
            />
          </div>
        </div>

        <div className="py-2" id="my-awards">
          <h3 className="text-xl">🏆Awards</h3>
          <span className="text-sm text-gray-400">
            /** 表彰は嬉しいものです 😊 **/
          </span>
          <div>
            <Link to="https://tech.rakuten.co.jp/rtc2011/report_award.html">
              <span itemProp="award">
                楽天テクロノロジーアワード 2011 Ruby 賞
              </span>
            </Link>
          </div>
        </div>

        <div className="py-5 text-gray-400">
          (🚧More descriptions comes later...)
        </div>

        <div>
          <p className="text-sm text-gray-400">ver 2022.05.18</p>
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

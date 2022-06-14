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
  faAmazon,
} from "@fortawesome/free-brands-svg-icons"
import { LikeButton } from "@lyket/react"
import {
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

import Comments from "../components/comments"
import Seo from "../components/seo"
import Footer from "../components/footer"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const pageTitle = `About | ${siteTitle}`
  const shareUrl = `https://nawo.to/about`
  const authorName = data.site.siteMetadata?.author.name

  return (
    <div>
      <Seo title={pageTitle} />
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
              <Link className="text-gray-400" to="/">
                https://nawo.to
              </Link>
              <meta
                itemProp="url"
                content="https://nawo.to/about"
                itemRef="my-urls"
              />
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
          <meta itemProp="author" itemRef="scrum-bcbook-2020" />
          <meta itemProp="owns" itemRef="scrum-bcbook-2020" />
          <meta itemProp="author" itemRef="scrum-bcbook" />
          <meta itemProp="owns" itemRef="scrum-bcbook" />
          <meta itemProp="translator" itemRef="agile-samurai-ja" />
          <meta itemProp="owns" itemRef="agile-samurai-ja" />
        </section>

        <section className="py-3 text-xs">
          <h3>#####</h3>
          <div>
            <p itemProp="affiliation" className="md:text-sm">
              株式会社エス・エム・エス
            </p>
            <p itemProp="jobTitle" className="pl-2">
              エンジニアリングマネージャー
            </p>
            <p itemProp="jobTitle" className="pl-2">
              スクラムマスター
            </p>
          </div>
          <div className="pt-2">
            <p itemProp="affiliation" className="md:text-sm">
              一般社団法人アジャイルチームを支える会
            </p>
            <p itemProp="jobTitle" className="pl-2">
              代表理事
            </p>
          </div>
          <span>#####</span>
        </section>

        <section className="py-2">
          <h3 className="text-2xl">TL;DR</h3>
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
              <a href="#agile-samurai-ja" className="link">
                書籍 『アジャイルサムライ』
              </a>
              監訳、
              <a href="#scrum-bcbook-2020" className="link">
                書籍「SCRUM BOOT CAMP THE BOOK【増補改訂版】」
              </a>
              の執筆をはじめ、 「Scrum Boot Camp
              Premium」「アジャイル相談室」などこれからの人に向けた研修やイベント、支援を続けています。
            </p>
            <p className="py-2">現在、幼い娘の子育てに奮闘中😊</p>
          </div>
        </section>

        <section className="py-2">
          <h3 className="text-2xl">📚Books</h3>
          <span className="text-sm text-gray-400">/** 執筆などなど **/</span>
          <ul className="md:list-disc md:text-lg">
            <li
              id="scrum-bcbook-2020"
              className="py-2"
              itemScope
              itemType="https://www.schema.org/Book"
            >
              <a
                href="https://amzn.to/3a8TEfA"
                className="link"
                target="_blank"
              >
                <span itemProp="name">
                  SCRUM BOOT CAMP THE BOOK【増補改訂版】
                  スクラムチームではじめるアジャイル開発
                </span>
              </a>
              ,
              <span
                className="pl-2"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <a
                  href="/about"
                  rel="author"
                  itemProp="url"
                  className="link"
                  target="_blank"
                >
                  <span itemProp="name">西村 直人</span>
                </a>
              </span>
              (著)・
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">永瀬 美穂</span>
              </span>
              (著)・
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">吉羽 龍太郎</span>
              </span>
              (著),
              <span
                className="pl-2"
                itemProp="publisher"
                itemScope
                itemType="http://schema.org/Organization"
              >
                <span itemProp="name">翔泳社</span>
              </span>
              ,
              <span className="pl-2" itemProp="datePublished">
                2020/05/20
              </span>
              ,
              <a
                href="https://www.shoeisha.co.jp/book/detail/9784798167282"
                className="link pl-2"
                target="_blank"
              >
                ISBM:
                <span itemProp="isbn">9784798163680</span>
              </a>
            </li>

            <li
              id="scrum-bcbook"
              className="py-2 text-gray-500"
              itemScope
              itemType="https://www.schema.org/Book"
            >
              <a href="https://amzn.to/39Yagq7" className="link">
                <span itemProp="name">SCRUM BOOT CAMP THE BOOK</span>
              </a>
              ,
              <span
                className="pl-2"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <a href="/about" rel="author" itemProp="url" className="link">
                  <span itemProp="name">西村 直人</span>
                </a>
              </span>
              (著)・
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">永瀬 美穂</span>
              </span>
              (著)・
              <span
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">吉羽 龍太郎</span>
              </span>
              (著),
              <span
                className="pl-2"
                itemProp="publisher"
                itemScope
                itemType="http://schema.org/Organization"
              >
                <span itemProp="name">翔泳社</span>
              </span>
              ,
              <span className="pl-2" itemProp="datePublished">
                2013/02/13
              </span>
              ,
              <a
                href="https://www.shoeisha.co.jp/book/detail/9784798129716"
                target="_blank"
                className="link pl-2"
              >
                ISBM:
                <span itemProp="isbn">9784798129716</span>
              </a>
            </li>

            <li
              id="agile-samurai-ja"
              className="py-2"
              itemScope
              itemType="https://www.schema.org/Book"
            >
              <a
                href="https://amzn.to/3NibkUc"
                className="link"
                target="_blank"
              >
                <span itemProp="name">アジャイルサムライ−達人開発者への道</span>
              </a>
              ,
              <span
                className="pl-2"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemID="name">Jonathan Rasmusson</span>
              </span>
              (著)・
              <span
                className="font-bold"
                itemProp="translator"
                itemScope
                itemType="https://schema.org/Person"
              >
                <a
                  href="/about"
                  rel="author"
                  itemProp="url"
                  className="link"
                  target="_blank"
                >
                  <span itemProp="name">西村 直人</span>
                </a>
              </span>
              (監訳)・
              <span
                itemProp="translator"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">角谷 信太郎</span>
              </span>
              (監訳)・
              <span
                itemProp="translator"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">近藤 修平</span>
              </span>
              (訳)・
              <span
                itemProp="translator"
                itemScope
                itemType="https://schema.org/Person"
              >
                <span itemProp="name">角掛 拓未</span>
              </span>
              (訳),
              <span
                className="pl-2"
                itemProp="publisher"
                itemScope
                itemType="http://schema.org/Organization"
              >
                <span itemProp="name">オーム社</span>
              </span>
              ,
              <span className="pl-2" itemProp="datePublished">
                2011/07/16
              </span>
              ,
              <a
                href="https://shop.ohmsha.co.jp/shopdetail/000000001901/"
                className="link"
                target="_blank"
              >
                ISBM:
                <span itemProp="isbn">9784274068560</span>
              </a>
            </li>
          </ul>

          <span className="pt-5 text-sm text-gray-400">
            /** Amazon へのリンク **/
          </span>

          <div className="flex-cols flex">
            <p>
              <a
                href="https://www.amazon.co.jp/SCRUM-BOOT-CAMP-BOOK%E3%80%90%E5%A2%97%E8%A3%9C%E6%94%B9%E8%A8%82%E7%89%88%E3%80%91-%E3%82%B9%E3%82%AF%E3%83%A9%E3%83%A0%E3%83%81%E3%83%BC%E3%83%A0%E3%81%A7%E3%81%AF%E3%81%98%E3%82%81%E3%82%8B%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E9%96%8B%E7%99%BA-ebook/dp/B086GBXRN6?crid=3T0PS4STWL4B2&keywords=scrum+boot+camp+the+book&qid=1652943687&s=books&sprefix=scrum%2Cstripbooks%2C266&sr=1-1&linkCode=li2&tag=nawoto07-22&linkId=26d70b3df0102bce6faabf93f01e18e7&language=ja_JP&ref_=as_li_ss_il"
                target="_blank"
              >
                <img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B086GBXRN6&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=nawoto07-22&language=ja_JP" />
              </a>
              <img
                src="https://ir-jp.amazon-adsystem.com/e/ir?t=nawoto07-22&language=ja_JP&l=li2&o=9&a=B086GBXRN6"
                width="1"
                height="1"
                alt=""
                style={{ border: "none !important", margin: "0px" }}
              />
            </p>

            <p className="pl-3">
              <a
                href="https://www.amazon.co.jp/%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E3%82%B5%E3%83%A0%E3%83%A9%E3%82%A4%E2%80%95%E2%80%95%E9%81%94%E4%BA%BA%E9%96%8B%E7%99%BA%E8%80%85%E3%81%B8%E3%81%AE%E9%81%93-%EF%BC%AA%EF%BD%8F%EF%BD%8E%EF%BD%81%EF%BD%94%EF%BD%88%EF%BD%81%EF%BD%8E%EF%BC%B2%EF%BD%81%EF%BD%93%EF%BD%8D%EF%BD%95%EF%BD%93%EF%BD%93%EF%BD%8F%EF%BD%8E-ebook/dp/B00J1XKB6K?pd_rd_w=6LekY&pf_rd_p=337d2f80-9540-40ce-bfd5-1d1e89aa413b&pf_rd_r=YHXQYKN4CMZBMF22SY47&pd_rd_r=b04ab310-75a0-4897-8171-4890729f8d3b&pd_rd_wg=hNqeR&pd_rd_i=B00J1XKB6K&psc=1&linkCode=li2&tag=nawoto07-22&linkId=2b361fc756bda190e82db0941c9a1ae1&language=ja_JP&ref_=as_li_ss_il"
                target="_blank"
              >
                <img src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00J1XKB6K&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=nawoto07-22&language=ja_JP" />
              </a>
              <img
                src="https://ir-jp.amazon-adsystem.com/e/ir?t=nawoto07-22&language=ja_JP&l=li2&o=9&a=B00J1XKB6K"
                width="1"
                height="1"
                alt=""
                style={{ border: "none !important", margin: "0px" }}
              />
            </p>
          </div>

          <div>
            <a
              href="https://www.amazon.co.jp/~/e/B00B46MLPG"
              className="underline"
              target="_blank"
            >
              <FontAwesomeIcon icon={faAmazon} />
              <span className="pl-1">Amazonの著者ページ</span>
            </a>
          </div>
        </section>

        <section className="py-2" id="my-awards">
          <h3 className="text-xl">🏆Awards</h3>
          <span className="text-sm text-gray-400">
            /** 表彰は嬉しいものです 😊 **/
          </span>
          <div>
            <a
              href="https://tech.rakuten.co.jp/rtc2011/report_award.html"
              className="link"
              target="_blank"
            >
              <span itemProp="award">
                楽天テクロノロジーアワード 2011 Ruby 賞
              </span>
            </a>
          </div>
        </section>

        <div className="py-5 text-gray-400">
          <p>(🚧More descriptions comes later...)</p>
          <p className="text-sm">ver 2022.05.20</p>
        </div>

        <footer className="border-y">
          <TwitterShareButton url={shareUrl} title={pageTitle} className="mr-3">
            <TwitterIcon round={true} size={28} />
          </TwitterShareButton>
          <HatenaShareButton url={shareUrl} title={pageTitle}>
            <HatenaIcon round={true} size={28} />
          </HatenaShareButton>
          <LikeButton
            id="about"
            namespace="page"
            component={LikeButton.templates.Twitter}
          />
          <Comments />
        </footer>
      </article>

      <Footer />
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

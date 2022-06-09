import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"
import Footer from "../components/footer"

const PrivacyPage = ({ date, location }) => {
  return (
    <div>
      <Seo title="Privacy Policy" />
      <header className="pb-20">
        <div>
          <h1 className="text-center text-2xl tracking-widest text-gray-500">
            &gt; Privacy Policy
          </h1>
        </div>
        <nav>
          <div className="border-b text-center">
            <Link to="/" className="text-sm uppercase underline">
              top
            </Link>
          </div>
        </nav>
      </header>
      <article className="mx-20 px-10">
        <div className="my-5">
          <h3 className="my-3 text-xl">個人情報の取り扱いについて</h3>
          <p>
            nawo.to(以下、本サイト)では、お問い合わせやコメント投稿の際に氏名・メールアドレス等の個人情報を入力いただく場合があります。
          </p>
          <p>
            取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
          </p>
          <p className="mt-2">
            本サイトは、Github Page 上で動作しており、コメントも Github の Issue
            を利用しています。
          </p>
          <p>
            そのため、Github でも必要な個人情報を収集しています。 詳しくは
            Github のプライバシーポリシーを参照してください。
          </p>
          <p className="my-2">
            <a
              className="underline"
              href="https://docs.github.com/ja/site-policy/privacy-policies/github-privacy-statement"
            >
              https://docs.github.com/ja/site-policy/privacy-policies/github-privacy-statement
            </a>
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">個人情報の第三者開示について</h3>
          <p>
            取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
            <ul className="list-disc">
              <li>本人の同意が得られた場合</li>
              <li>法令により開示が求められた場合</li>
            </ul>
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">Cookieの使用について</h3>
          <p>本サイトでは、アクセス解析のためにCookieを使用しています。</p>
          <p>
            Cookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。
          </p>
          <p>
            Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">アクセス解析ツールについて</h3>
          <p>
            本サイトでは、Googleアナリティクスによりアクセス情報を解析しています。
          </p>
          <p>
            アクセス情報の解析にはCookieを使用しています。また、アクセス情報の収集はCookieを無効にすることで拒否できます。
          </p>
          <p>
            Google社のデータ収集・処理の仕組みについては、
            <Link to="http://www.google.com/intl/ja/policies/privacy/partners/">
              こちら
            </Link>
            をご覧ください。
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">
            Amazon アソシエイト・プログラムについて
          </h3>
          <p>
            本サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
          </p>
          <p>そのため、一部のリンク先はアフェリエイトであることもあります。</p>
          <p>
            Amazonのアソシエイトとして、本サイトは適格販売により収入を得ています。
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">免責事項</h3>
          <p>
            本サイトは、掲載内容によって生じた損害に対する一切の責任を負いません。
          </p>
          <p>
            各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。
          </p>
          <p>
            また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">著作権</h3>
          <p>
            本サイトに掲載されている文章・画像の著作権は、運営者に帰属しています。
          </p>
          <p>
            法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
          </p>
          <p>
            本サイトのページは個別の記述が無い限り、自由にリンクしていただいて大丈夫です。ただし、引用する場合は引用元の表示をお願いします。
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">問い合わせ先</h3>
          <p>
            問い合わせは、
            <Link to="https://twitter.com/nawoto">Twitter:@nawoto</Link> まで DM
            でお願いします。
          </p>
        </div>

        <div className="my-5">
          <h3 className="my-3 text-xl">プライバシーポリシーの変更</h3>
          <p>
            当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。
          </p>
          <p>
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
          <ul>
            <li>制定日: 2022/04/01</li>
            <li>改訂日: 2022/05/25</li>
          </ul>
        </div>
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
export default PrivacyPage

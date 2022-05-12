---
title: Font Awesome を使おう
date: "2022-05-11T06:50:21.987Z"
description:
---

SNS とかのリンクは、ふつうにアイコンで良いと思うので定番の [Font Awesome](https://fontawesome.com/) を導入した。
(個人的にはタイポグラフィなサイトが好みなので、文字多めな傾向はある。)

## 必要な Package をインストール

このサイトは、[Gatsby](https://www.gatsbyjs.com/) で作っているので、React で利用するのとほぼ一緒な感じで設定した。

```
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/react-fontawesome
```

次に必要な icon の方もインストール。
Twitter のアイコンなどを含んでいる 'brands' と Feed アイコンをいったアイコンも使いたいので 'solid' の方をインストール。

```
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/free-brands-svg-icons
```

## 実際に使ってみる

使いたい箇所のコンポーネントをゴニョゴニョ修正。
[Font Awesome](https://fontawesome.com/) で使いたいアイコンを探して、表記を camel case に読みかえて import する。

```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareRss } from "@fortawesome/free-solid-svg-icons"
import {
  faTwitter,
  faGithub,
  faSpeakerDeck,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
```

あとは使いたい箇所で、以下のようにアイコンを呼びだせば表示された。

```jsx
<a href="https://twitter.com/nawoto">
  <FontAwesomeIcon icon={faTwitter} />
</a>
```

## スタイルを読みこんでおく

リロード時などに Font Awesome のアイコンの表示が崩れないように事前に Style を読みこんでおくために、`gatsby-broeser.js` に以下を追記。

```js
// CSS style for Font Awesome
import "@fortawesome/fontawesome-svg-core/styles.css"
```

無事にアイコンが表示できたはず 🎉

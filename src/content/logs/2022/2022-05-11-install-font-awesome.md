---
title: Font Awesome を使おう
pubDate: 2022-05-11T00:00:00.000Z
description: ""
---

自分の SNS アカウントへのリンクは、アイコンのみで良さそうなので [Font Awesome](https://fontawesome.com/) を導入した。
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

## 2025年追記: 現在のアイコン実装

2025年にGatsbyからAstroに移行した際、アイコン実装も見直しました。

https://nawo.to/2025/06/17/migrate-to-astro-by-ai/

### 現在の実装

**Font Awesome → Simple Icons + カスタムSVG**

- **Simple Icons**: 主要ブランド（X, GitHub, Instagram等）
- **カスタムSVG**: マイナーなブランド（Suzuri, SpeakerDeck等）
- **Font Awesome**: 使用していない

https://simpleicons.org/

### 変更理由

1. **バンドルサイズ削減**: Font Awesomeは重い
2. **パフォーマンス向上**: SVGは軽量
3. **依存関係簡素化**: 必要なアイコンのみ実装

### 現在の実装例

```typescript
// src/data/icons.ts
import { siX } from 'simple-icons';

export const iconData = {
  // Simple Icons使用
  x: {
    viewBox: '0 0 24 24',
    path: siX.path
  },
  // カスタムSVG
  suzuri: {
    viewBox: '0 0 640 512',
    path: 'M211.8 0c7.8 0 14.3 5.7 16.7 13.2...'
  }
}
```

### 使用例

```astro
<!-- src/components/Icon.astro -->
<Icon name="x" class="w-6 h-6" />
<Icon name="suzuri" class="w-6 h-6" />
```

より効率的で軽量な実装になりました！

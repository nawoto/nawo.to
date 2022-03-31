---
title: Hello World!!
date: "2022-04-01T22:12:03.284Z"
description:
---
雑多な文章を書きたいなっと思ったので、放置していた自分のサイトを[Gatsby](https://www.gatsbyjs.com/)で作り直してみた。
以前に、[Hugo](https://gohugo.io/) を使ってみたけど、自分のスキルだと細かい部分まで手をいれられなかったで Gatsby を使ってみた。
いろいろと触れてちょっとづつ手を加えていけそうな感じが気にいっている。
(思ったよりコードを書く必要があったけど…😅)

ひとまず雑多な文章を貼るぐらいはできるようになったので、日々のなにげない文章とかはココに置いていこう。
ちょうど、[今は亡き](https://diary.hatenastaff.com/entry/2019/07/26/153015)はてダから自動で移行された [はてなブログ](https://nawoto.hatenadiary.org/) も放置してたので。

## 備忘録
やったことをメモ。
コマンドとか細かい手順は、`Gatsby サイト` あたりをググればでるので割愛。

1. [gatsby-starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog) を設定する。→ 最初は他の Starter とかゼロから作ろうとしてみたけど、結局これが一通りのことをシンプルに実装してて、手がいれやすい感じ
1. Web日記的なものは日付つきの URL が好みなので Markdown の置き場所を `YYYY/MM/DD/なんとかかんとか` に変更(単に `content/blog/YYYY/MM/DD` に mv しただけ)
1. [Tailwind CSS](https://tailwindcss.com/)に変更。→ Starter が提供している CSS をガッと消して設定。[Using Gatsby with Tailwind CSS: A tutorial with examples](https://blog.logrocket.com/using-gatsby-with-tailwind-css-a-tutorial-with-examples/#building-a-header-section) が参考になった
1. チマチマとレイアウトとCSSを書く。→ Almost Brutalism 風なのを目指してみた😅 [こういうやつ](https://www.brutalist.design/brutal-design-1/)
1. Markdown で書いた記事の見た目を省エネで整えるのに [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)を設定。→ [この記事](https://portground.net/dev/tailwind-markdown-tailwindcss-typography) を参考
1. Favicon を設定 → シュっと [favicon.io](https://favicon.io/) で Text から作成した。フォントを [Google Fonts](https://fonts.google.com/) から選べるので、[おすすめフォント](https://photoshopvip.net/131206)を見つつ[デラゴシック](https://fonts.google.com/specimen/Dela++Gothic+One)で作成。

文章を書くつもりが、ひさびさのサイト作りの方が楽しくなっている感じはする😄
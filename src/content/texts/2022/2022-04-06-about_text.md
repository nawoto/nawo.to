---
title: 読み返したい文章も書けるように
pubDate: 2022-04-06T00:00:00.000Z
description: ""
---

日記のようなフローなコンテンツは、気軽に書ける反面、どうしても走り書きのメモのようになってしまうので、あまり読み返したりするようなちゃんとした文章にはなっていない 😅

ネタによっては、あとで「自分はどう考えて、どういう言語化した」と読み返したいときもあるので、日記的な文章とは別にまとまった内容の文章を分けて書けるようにしてみた。
あと、たまに依頼されて文章を書く機会があるので、日頃からまとまった文章を書いていないと筆がどうにも遅い。。。
なので、書く練習も兼ねて、たまにはまとまった文章も書いていこうと思う。

ネタはどんなのが良いかの〜🤔

## まずは実装してみよう

ネタは追々考えるとして、Gatsby でも Markdown で書いたファイルの置き場所を分けて、別の URL で表示することができた。
まだ、記事の一覧はちゃんと作ってないけど、日記のような文章を **LOG** というカテゴリに書いて、まとまった文章の方を **TEXTS** にのせるようにしてみた。

ただ、URL をどうするかは悩んでいる 🤔
LOG の方はいつごろ書いたが分かりやすい and ファイルをディレクトリ毎に分けときたいので YYYY/MM/DD/slug にして、まとまった文章の方を texts/slug にしてみた。
どうかなーという気持ちはあるのだけれど、良いのが思いつかない。。。

## 参考にしたサイト

- [How to create multiple types of markdown content in GatsbyJS](https://codeforheaven.com/posts/how-to-create-markdown-blog-posts-and-pages-in-gatsbyjs)
- [Gatsby JS - Multiple pages pulling in markdown files with different categorys](https://stackoverflow.com/questions/51578264/gatsby-js-multiple-pages-pulling-in-markdown-files-with-different-categorys)
- [GatsbyJS で記事の URL をカスタマイズする](https://zenn.dev/anozon/articles/gatsby-customize-slug)

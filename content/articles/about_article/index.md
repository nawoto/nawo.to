---
title: まとまった文章も書こう
date: "2022-04-06T08:52:58.848Z"
description:
---
自分のサイトで文章を書いていくにあたって、書きたいネタによっては少し整理されたまとまった文章も書けるようにしてみた。

日記のようにちょっとした気になったことや出来事は、フローなコンテンツとして気軽に書ける反面、どうしても走り書きのメモみたいになってしまう。あと、たまに依頼されて文章を書く機会があるので、日頃からまとまった文章を書いていないと筆がどうにも遅い。。。😅
なので「自分はどう考えて、どういう表現で言語化した」みたいな多少は資料的に読み返せるような文章も書いていこうと思う。

## 実装してみた
Gatsby でも、Markdown で書いたファイルの置き場所を分けて、別の URL で一覧や詳細を表示できた。
まだ、一覧はちゃんと作ってないけど LOG に日記のような文章を書いて、TEXTS にまとまった文章をのせるようにしてみた。

ただ、URL をどうするかは少し悩んだ。
LOG の方はいつごろ書いたが分かりやすい and ファイルをディレクトリ毎に分けときたいので YYYY/MM/DD/slug にして、まとまった文章の方を articles/slug にしてみた。
articles 配下かぁ〜という気持ちはあるのだけれど、良いのが思いつかない。。。

## 参考にしたサイト

 - [How to create multiple types of markdown content in GatsbyJS](https://codeforheaven.com/posts/how-to-create-markdown-blog-posts-and-pages-in-gatsbyjs)
 - [Gatsby JS - Multiple pages pulling in markdown files with different categorys](https://stackoverflow.com/questions/51578264/gatsby-js-multiple-pages-pulling-in-markdown-files-with-different-categorys)
 - [GatsbyJSで記事のURLをカスタマイズする](https://zenn.dev/anozon/articles/gatsby-customize-slug)

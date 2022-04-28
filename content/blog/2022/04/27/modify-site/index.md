---
title: 🚧 サイトのお手入れ ⛏️
date: "2022-04-27T08:46:09.664Z"
description:
---

もう少し世の中によくあるサイトみたいにしようと [nawo.to](http://nawo.to) に少しづつ手を入れている。  
ブログサイトとかに良くありそうなものだと、だいたいこんな感じだと思う。

- シェアボタン
- いいねボタン
- コメント機能

[Gatsby](https://gatsbyjs.com/)だと plugin が豊富にあるので利用していく。
あと、先人たちがだいたい何かしらやってくれているので、調べながら実装。

## シェアボタン

最近はスマホでサイトを閲覧して、そのまま OS・ブラウザの機能でシェアすることが(自分には)ほとんどなので、シェアボタンの必要性があるかは少し悩んだ。
けれど、書いた文章にシェアボタンとかがあるとなんとなくそれっぽいサイトに見えるよな〜という理由で設置してみた 😄  
シェア先は、Twitter ぐらいしか見てないので Twitter と昔ながらのはてブぐらいがあれば十分な気がする。

設置は、シュっと `react-share` を使って実装できた。

- https://github.com/nygardk/react-share

## いいねボタン

Gatsby で作ったような静的サイトでも「いいねボタン」って設置できるのかな〜っと調べてみたら、いろいろあるみたい。

- [LIKEBTN](https://likebtn.com/en/)
- [Lyket](https://lyket.dev/)

どちらも一定数の PV までなら無料で使えるので、[React まわりのドキュメント](https://lyket.dev/docs/react)が記載されてた Lyket を使ってみた。

## コメント機能

静的サイトでもコメント機能をつけられた 🎉  
[Disqus](https://disqus.com/) が有名だけど、[utterances](https://utteranc.es/)が良さそう！
コメントをどうやって保存するんだろうっと思ったら、[Github の Issue](https://github.com/nawoto/nawo.to/issues) を使うのか。スゴイ 😲

React のコンポーネントもあったけど、数行程度のコード量なので自前で持つことにした。参考にしたのはここら辺。

- [How to add comments to your Gatsby blog](https://www.emgoto.com/gatsby-comments/)
- [技術ブログのコメントシステムは utterances がいい感じ](https://miyauchi.dev/ja/posts/comment-system/)
- [utterances-component](https://github.com/TomokiMiyauci/utterances-component) ※使わなかったけど

## ボタンの配置とかとか

↑ な感じでポチポチと必要な要素を配置しながら、いろんなサイトを参考にしてみた。
最近だと、シェアとかいいね！とかは記事のタイトル部分に配置してたりするサイトが増えた気がする。(特に記事を投稿する系のサービス)
たしかに、タイトルと概要だけ読んでシュっとボタンを押して拡散する方がサービスの観点では良さそうだけど、個人サイトなんで一応、文章を読んで「これは良さそう！！」と思って押してもらった方が嬉しいので、ひとまずページ下部にボタンやコメント類を配置するオールドスタイルな感じにしてみた 😄

## まだまだお手入れの道は続く

ひとまず、ふつうのサイトっぽい機能は実装できたけど、まだまだ手を入れたいところは次々と出てくる。
ひとまず忘れないようにメモして、あとでちまちまやっていこう。

- OGP 画像つけたい。Twitter にシェアするときに残念な気持ちになる
- IndieWeb 化したい。[IndieWebfy.Me](https://indiewebify.me/)
- [Font Awesome](https://fontawesome.com/) でアイコンをつけたい
- 🍔 ハンバーガーメニューつけたい。大したメニューのコンテンツないけどなんとなく

---
title: Webmention をサポートしてみた
description: ''
pubDate: 2022-06-09T03:15:26.549Z
updatedDate: 2026-03-06T00:00:00.000Z
---

書いている文章にリアクションが来ると嬉しいので、あとで見返しやすいように Webmention をサポートしてみた。

- https://indieweb.org/Webmention

思ったより実装に時間がかかったので、ひとまず Like だけ表示できるようにした。

Trackback が懐かしい世代なので面白い仕組みだとは思うが、もう少しシュっとサポートできると良さそう。。。  
あと、Webmention の表示をくわえたので、ページの下部が煩雑になってきた 😓 おいおい整理しよう。

## 参考にしたサイト

- [コメント欄はいらない！Webmention を使ってブログにツイッターでの反応を表示する](https://qiita.com/jlkiri/items/d56ec812fa8de7a740e2)
- [Getting started with Webmentions in Gatsby](https://www.knutmelvaer.no/blog/2019/06/getting-started-with-webmentions-in-gatsby)
- [How to Use Webmentions with Gatsby.js – A Beginner's Guide](https://www.freecodecamp.org/news/how-to-use-webmentions-with-gatsby-beginners-guide/)
- [Embracing the IndieWeb](https://www.chadly.net/embracing-the-indieweb/) ← 本当はこんなデザインにしたかった
- [Webmention.io](https://webmention.io)
- [Bridgy](https://brid.gy/)

## 2026/03/06 updated

### 仕組みの整理

現在の構成はシンプルで、2つのサービスに乗っかっている。npm パッケージは使わず、自前の fetch で実装している。

- **[Webmention.io](https://webmention.io)** — Webmention の受け取り窓口。`<link rel="webmention">` タグを `<head>` に埋め込むだけで、他サイトからの言及を収集してくれる
- **[brid.gy](https://brid.gy/)** — Twitter や Mastodon などの SNS のリアクション（いいね・リポスト）を Webmention に変換して Webmention.io に送ってくれる橋渡し役

#### 受け取り口の設定

`<head>` に1行追加するだけ。

```html
<link rel="webmention" href="https://webmention.io/nawo.to/webmention" />
```

#### 表示の実装

Webmention.io の API を fetch して、いいね（`like-of`）だけ絞り込んで表示している。

```javascript
const res = await fetch(`https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(url)}`);
const data = await res.json();
const likes = data.children.filter((m) => m['wm-property'] === 'like-of');
```

### Twitter は取得不可に

2023年4月の Twitter API 有料化に伴い、brid.gy 経由での Twitter リアクションの取得ができなくなった。[`/mentions`](/mentions) で表示しているのは以前に取得済みのぶんのみ。
今後はおそらく Bluesky からの mention しか表示されないと思う。

### mentions ページに集約

最初は各記事の下に Webmention を表示していたが、その後 [`/mentions`](/mentions) としてサイト全体の受信一覧ページを作った。記事ごとの表示はいいね（like-of）のみ残してある。

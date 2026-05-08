---
title: 'dotfiles を久々に管理しはじめた'
pubDate: 2026-05-08
description: '新しいマシンへの移行をきっかけに、dotfiles 管理を再開した話。'
---

新しいマシン💻を購入したので、届く前にセットアップについて思いを馳せる。🤔

「あー、最近、設定ファイルやインストールしているアプリをちゃんと管理していないから移行めんどいかも😅」

普段よく使っている CLI 環境はこのあたり。

- **fish shell** — メインシェル。シンプルに使っているつもりだが、割といろいろ育ってきてる
- **GNU Emacs** — メインエディタとして最近復帰。一から育て直しているので無くすと面倒
- **Ghostty** — 最近メインで使ってるターミナル
- **alternative CLI tools** — その他の CLI tools 群

https://fishshell.com

https://www.gnu.org/software/emacs/

https://ghostty.org

これらをひとまとめにして GitHub で管理することにした。

## GNU Stow で整理

ツールは **GNU Stow** を使うことにした。ディレクトリ構成を整えれば `stow` と叩くだけでシンボリックリンクを張ってくれるシンプルなやつ。

```sh
stow .
```

https://www.gnu.org/software/stow/

GNU Stow を実際に試すのは新マシンが到着してからなので、少しドキドキ😅

## SETUP.md

設定ファイルの管理だけじゃなくて、新しいマシンでそれ以外の alternative CLI tools やアプリも何をインストールすればいいんだっけとなりがちなので、`SETUP.md` にまとめて記載することにした。
これと Brewfile を Claude Code に食わせればある程度セットアップは自動化できるはず👍

整理したのがこちら。

https://github.com/nawoto/dotfiles

まだ育ててる途中だけど、新しいマシンが到着したときに楽できるほどには整理できたんじゃないかな?🤗

---
title: 'Emacs で Emoji を日本語で探す'
pubDate: 2026-05-19T00:00:00+09:00
description: 'macOS の絵文字ピッカーと連携して、Emacs から日本語で便利に検索できるようにした！'
---

Emacs ではこのサイトの文章を書いたりして、絵文字(Emoji)を使う場面が多い。
Slack でリアクションを探すときは「おじき」→ 🙇‍♂️ みたいに日本語で検索しているので、Emacs でも同じようにしたくて、Claude に相談しながら作った。

## emojify からビルトインへ

これまで [emojify](https://github.com/iqbalansari/emacs-emojify) を使っていたが、Emacs 29 からビルトインで Emoji サポートが入ったので外した。

```elisp
;; before
(use-package emojify
  :hook (text-mode . emojify-mode)
  :bind ("C-c e" . emojify-insert-emoji)
  :custom (emojify-display-style 'unicode))
```

`M-x emoji-insert` や `M-x emoji-search` が使えるようになっていて、`C-x 8 e` プレフィックスからもアクセスできる。フォント設定はそのまま。

```elisp
(set-fontset-font t 'emoji "Apple Color Emoji")
```

## やっぱり日本語で検索したい

しばらくこの設定で暮らしていたんだけど、emojify やビルトインの `emoji-search` は Unicode の英語名を使っているので日本語では検索できない。

既存のパッケージも調べたが、日本語で Emoji を検索できる Emacs パッケージは見当たらなかった。

(helm-emojiだとできそうではあったが)

## macOS の絵文字ピッカーを使う

macOS の絵文字ピッカー（文字ビュワー、Ctrl+Cmd+Space）は日本語検索に対応しているので、`osascript` で macOS を操作すれば、Emacs から呼び出せる。

```elisp
(defun my/emoji-insert-macos ()
  (interactive)
  (shell-command
   "osascript -e 'tell application \"System Events\" to keystroke space using {control down, command down}'"))

(global-set-key (kbd "C-c e") #'my/emoji-insert-macos)
```

`C-c e` を押すと macOS の絵文字ピッカーが開き、日本語で検索して選ぶと Emacs バッファに直接挿入される。
実装は数行で済んで、思ったよりシンプルだった。

初回は「アクセシビリティ」の権限を求められるので許可しておく。

やっと日本語で Emoji を検索できるようになって、かなり便利になった。😊

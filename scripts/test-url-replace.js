#!/usr/bin/env node

// テスト用のURL置換スクリプト
const testContent = `[![f:id:nawoto:20110531171346j:image:w360](https://cdn-ak.f.st-hatena.com/images/fotolife/n/nawoto/20110531/20110531171346.jpg)](http://f.hatena.ne.jp/nawoto/20110531171346)`;

const oldUrl =
  'https://cdn-ak.f.st-hatena.com/images/fotolife/n/nawoto/20110531/20110531171346.jpg';
const newUrl = '/images/backtrace/2011/05/31/20110531171346.jpg';

console.log('元のコンテンツ:');
console.log(testContent);
console.log('');

// パターン1: シンプルな置換
const pattern1 = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
const result1 = testContent.replace(pattern1, newUrl);

console.log('パターン1 (シンプル置換):');
console.log(result1);
console.log('');

// パターン2: 画像付きリンク全体置換
const pattern2 = new RegExp(
  `\\[!\\[([^\\]]*)\\]\\(${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\]\\(([^\\)]+)\\)`,
  'g'
);
const result2 = testContent.replace(pattern2, `[![$1](${newUrl})]($2)`);

console.log('パターン2 (全体置換):');
console.log(result2);
console.log('');

// パターン3: より柔軟な置換
const pattern3 = new RegExp(
  `(\\[!\\[([^\\]]*)\\]\\()${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\)\\]\\(([^\\)]+)\\))`,
  'g'
);
const result3 = testContent.replace(pattern3, `$1${newUrl}$3`);

console.log('パターン3 (柔軟置換):');
console.log(result3);

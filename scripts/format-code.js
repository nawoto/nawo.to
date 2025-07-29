#!/usr/bin/env node

/**
 * コードフォーマット自動化スクリプト
 * 開発時の自動フォーマット用
 */

import { execSync } from 'child_process';

/* global console process */

console.log('🎨 コードフォーマットを開始...');

try {
  // 1. Prettierフォーマット
  console.log('📝 Prettierフォーマット中...');
  execSync('npm run format:fix', { stdio: 'inherit' });
  console.log('✅ Prettierフォーマット完了');

  // 2. ESLint自動修正
  console.log('🔧 ESLint自動修正中...');
  execSync('npm run lint:fix', { stdio: 'inherit' });
  console.log('✅ ESLint自動修正完了');

  // 3. フォーマットチェック
  console.log('🔍 フォーマットチェック中...');
  execSync('npm run format:check', { stdio: 'inherit' });
  console.log('✅ フォーマットチェック完了');

  console.log('🎉 すべてのコードフォーマットが完了しました！');
} catch (error) {
  console.error('❌ コードフォーマットでエラーが発生しました:', error.message);
  process.exit(1);
}

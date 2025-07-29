#!/usr/bin/env node

/**
 * コード品質チェックスクリプト
 * 定期的な実行用
 */

import { execSync } from 'child_process';

/* global console process */

console.log('🔍 コード品質チェックを開始...');

try {
  // 1. Lint check
  console.log('📝 ESLintチェック中...');
  execSync('npm run lint:check', { stdio: 'inherit' });
  console.log('✅ ESLintチェック完了');

  // 2. Format check
  console.log('🎨 フォーマットチェック中...');
  execSync('npm run format:check', { stdio: 'inherit' });
  console.log('✅ フォーマットチェック完了');

  // 3. Duplicate code check
  console.log('🔄 重複コードチェック中...');
  execSync('npm run duplicate', { stdio: 'inherit' });
  console.log('✅ 重複コードチェック完了');

  // 4. Type check (warning only)
  console.log('🔍 TypeScript型チェック中...');
  try {
    execSync('npm run check', { stdio: 'inherit' });
    console.log('✅ TypeScript型チェック完了');
  } catch (error) {
    console.log('⚠️ TypeScript型チェックで警告が発生しましたが、続行します');
  }

  console.log('🎉 すべてのコード品質チェックが完了しました！');
} catch (error) {
  console.error('❌ コード品質チェックでエラーが発生しました:', error.message);
  process.exit(1);
}

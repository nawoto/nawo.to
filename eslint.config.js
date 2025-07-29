// @ts-check

import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],

  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        URL: 'readonly',
      },
    },
    rules: {
      // カスタムルール
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
    },
  }
);

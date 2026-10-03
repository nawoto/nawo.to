// @ts-check

import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],

  {
    languageOptions: {
      globals: {
        URL: 'readonly',
      },
    },
    rules: {
      // カスタムルール
      'no-console': 'off',
      'no-debugger': 'error',
      'no-alert': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Let Prettier own formatting, including whitespace in embedded Astro styles.
  eslintConfigPrettier
);

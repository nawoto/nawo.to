module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
    // 重複コードの検出
    'no-duplicate-imports': 'error',
    'no-duplicate-case': 'error',
    
    // 未使用変数の検出
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    
    // コードスタイル
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    
    // 型安全性
    'no-var': 'error',
    'prefer-const': 'error',
    'no-const-assign': 'error',
    
    // 可読性
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      rules: {
        // Astro固有のルール
        'astro/no-conflict-set-directives': 'error',
        'astro/no-unused-define-vars-in-style': 'error',
      },
    },
  ],
}; 
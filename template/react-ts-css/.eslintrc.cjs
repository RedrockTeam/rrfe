module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-refresh',
    'simple-import-sort',
  ],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  globals: {
    React: 'readonly',
  },
};

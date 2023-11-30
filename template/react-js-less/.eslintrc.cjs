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
  parser: 'babel-eslint', 
  parserOptions: {
    ecmaVersion: 2023, 
    sourceType: 'module', 
},
  plugins: ['react', 'react-refresh'],
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  globals: {
    React: 'readonly',
  },
};

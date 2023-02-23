/* eslint-disable comma-dangle */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    // 'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { before: true, after: true }
    ],
    'no-console': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  plugins: ['jest']
}

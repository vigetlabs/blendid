var isIntegration = !!process.env.CI

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    jasmine: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  extends: ['eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    semi: 'off',
    'no-console': 'off',
    'no-debugger': isIntegration ? 'error' : 'off',
    'no-unused-vars': [
      1,
      { args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^_' }
    ],
    'no-return-assign': 'error',
    'prettier/prettier': isIntegration ? 'error' : 'warn'
  }
}

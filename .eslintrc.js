const path = require('path');

module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  globals: {
    CLIENT_TYPE: true,
    APP_TYPE: true,
    VERSION: true,
    DEV_SERVER: true,
    HOST: true,
    PORT: true,
  },
  rules: {
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'jsx-a11y/click-events-have-key-events': 0,
    'no-plusplus': ['error', { "allowForLoopAfterthoughts": true }],
    'max-len': ['warn', { code: 100, ignoreComments: true }],
    'prefer-destructuring': ['warn', { object: true, array: true }],
    'no-underscore-dangle': 0,
    'no-console': 0,
    'import/no-extraneous-dependencies': ['warn'],
    'import/prefer-default-export': ['warn'],
    'import/no-unresolved': ['error', {
      "ignore": [ /CLIENT_TYPE/ ]
    }],
    'no-nested-ternary': 0,
    'no-param-reassign': 0,

    // TODO: in future need enable errors
    'react/sort-prop-types': ['warn'],
    'react/no-typos': ['warn'],
    'react/forbid-prop-types': ['warn'],
    'react/destructuring-assignment': [true, 'never'],
    'react/button-has-type': ['warn'],
    'react/require-default-props': ['warn'],

    'jsx-a11y/label-has-for': ['warn'],
    'react/no-array-index-key': ['warn'],
    'react/prop-types': ['warn']
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './build/webpack.common.js'),
      },
    },
  },
  plugins: ['jest'],
};

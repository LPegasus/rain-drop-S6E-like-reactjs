'use strict';

const eslintrc = {
  extends: ['eslint-config-airbnb'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: false,
      templateStrings: true,
      spread: true,
      restParams: true,
    },
  },
  plugins: [
    'markdown',
    'react',
    'babel',
  ],
  rules: {
    //'func-names': 0,
    'guard-for-in': 0,
    'no-underscore-dangle': 0,
    'no-cond-assign': 0,
    'no-else-return': 0,
    'prefer-template': 0,
    'prefer-const': 0,
    'arrow-body-style': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-no-bind': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'consistent-return': 0,
    "no-inner-declarations": [0],
    "object-curly-spacing": [1],
    "comma-dangle": [0],
    'no-unused-vars': 1,
    'semi': 1,
    'react/prefer-stateless-function': 1,
  }
};

if (process.env.RUN_ENV === 'DEMO') {
  eslintrc.globals = {
    React: true,
    ReactDOM: true,
    mountNode: true,
  };

  Object.assign(eslintrc.rules, {
    'no-console': 0,
    'eol-last': 0,
    'prefer-rest-params': 0,
    'react/no-multi-comp': 0,
    'react/prefer-es6-class': 0,
  });
}

module.exports = eslintrc;

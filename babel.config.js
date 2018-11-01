/* @flow */

module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: ['@babel/flow', '@babel/env'],
  env: {
    test: {
      presets: ['@babel/flow', '@babel/env'],
    },
  },
};

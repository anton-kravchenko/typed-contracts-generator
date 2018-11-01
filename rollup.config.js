// @flow

// FIXME: add shebang (uglify removes banner)
// FIXME: add cleanup (remove bundle before build)

import packageJson from './package.json';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const banner = `
'#!/usr/bin/env node'
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 */
`;

module.exports = {
  input: './main.js',
  output: {
    file: './build/bundle.js',
    format: 'cjs',
    banner,
  },
  plugins: [babel(), uglify()],
  external: ['fs'],
};

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      sourcemapPathTransform: relpath => {
        return '/Users/shaheen/code/fbsource/xplat/jellyfish/node_modules/react-blessed/dist/' + relpath
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      sourcemapPathTransform: relpath => {
        return '/Users/shaheen/code/fbsource/xplat/jellyfish/node_modules/react-blessed/dist/' + relpath
      }
    }
  ],
  external: [
    'blessed', 'ws', 'react-devtools-core', 'react-reconciler', 'yoga-layout-prebuilt'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      ignore: ['ws', 'react-devtools-core']
    })
  ]
}

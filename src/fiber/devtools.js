/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */

try {
  const defineProperty = Object.defineProperty;
  defineProperty(global, 'WebSocket', {
    value: require('ws')
  });
  defineProperty(global, 'window', {
    value: global
  });
  const {connectToDevTools} = require('react-devtools-core');

  connectToDevTools({
    isAppActive() {
      // Don't steal the DevTools from currently active app.
      return true;
    },
    host: 'localhost',
    port: 8097,
    resolveRNStyle: null, // TODO maybe: require('flattenStyle')
  });
} catch (err) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('WARNING: the `ws` package must be installed to use `react-devtools`.');
  }
}

const devtoolsConfig = {
  bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
  version: '16.8.6', // pretend renderer version is the official react version of react-reconciler
  rendererPackageName: "react-blessed",
  findFiberByHostInstance: () => null,
};
export default devtoolsConfig;

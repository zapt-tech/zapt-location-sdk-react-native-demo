module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

//uncomment below if you want to test zapt-sdk changes locally (zapt tech team)
// const path = require('path');
// const exclusionList = require('metro-config/src/defaults/exclusionList');
// const escape = require('escape-string-regexp');
// const root = path.resolve(__dirname, '..');

// module.exports = {
//   projectRoot: __dirname,
//   watchFolders: [root],

//   resolver: {

//     blacklistRE: exclusionList([
//       new RegExp(`^${escape(path.join(root, 'node_modules'))}\\/.*$`)
//     ]),

//     extraNodeModules: new Proxy(
//       {},
//       { get: (_, name) => path.resolve('.', 'node_modules', name) }
//     )
//   },
// }

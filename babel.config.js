const plugins = [
  'dynamic-import-node',
  ['lodash'],
];

const prodTargets = [
  'Chrome >=66', 'Edge >= 16', 'Firefox >= 60', 'ie >= 11',
  'Opera >= 52', 'Safari >= 11',
];

const devTargets = ['last 2 Chrome versions', 'iOS >= 10'];

const getPresets = dev => [
  [
    '@babel/env',
    {
      targets: dev ? devTargets : prodTargets,
      modules: false,
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
  '@babel/preset-react',
];

module.exports = {
  env: {
    production: {
      plugins: plugins.concat([
        ['transform-react-remove-prop-types', {
          removeImport: true,
        }],
      ]),
      presets: getPresets(false),
    },
    development: {
      plugins: plugins.concat(['react-hot-loader/babel']),
      presets: getPresets(true),
    },
    test: {
      plugins: plugins.concat(['@babel/plugin-transform-modules-commonjs', 'babel-plugin-redux-saga']),
      presets: [
        [
          '@babel/env',
          {
            targets: 'last 2 Chrome versions',
            modules: false,
            useBuiltIns: 'usage',
          },
        ],
        '@babel/preset-react',
      ],
    },
  },
};

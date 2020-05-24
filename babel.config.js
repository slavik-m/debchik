// const plugins = ['@babel/plugin-proposal-class-properties'];
const plugins = [];

const presets = [
  [
    '@babel/env',
    {
      targets: ['last 2 Chrome versions', 'iOS >= 11'],
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
      plugins: [
        ['transform-react-remove-prop-types', { removeImport: true }],
      ].concat(plugins),
      presets,
    },
    development: {
      plugins: plugins.concat(['react-hot-loader/babel']),
      presets,
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'].concat(plugins),
      presets,
    },
  },
};

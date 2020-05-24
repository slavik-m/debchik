const plugins = ['@babel/plugin-proposal-class-properties'];

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
      plugins: plugins.concat([
        ['transform-react-remove-prop-types', { removeImport: true }],
      ]),
      presets,
    },
    development: {
      plugins: plugins.concat(['react-hot-loader/babel']),
      presets,
    },
    test: {
      plugins: plugins.concat(['@babel/plugin-transform-modules-commonjs']),
      presets,
    },
  },
};

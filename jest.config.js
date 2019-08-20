module.exports = {
  verbose: true,
  globals: {},
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/src/assets/**',
  ],
  testURL: 'http://localhost',
  testRegex: '.*.test.js',
  modulePathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/jest.config.js',
    '<rootDir>/babel.config.js',
    // TODO: component tests
    '<rootDir>/src/components/',
    '<rootDir>/src/state/store/index.js',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/state/sagas/runSagas.js',
    '<rootDir>/src/constants/',
    '/__tests__/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!redux-saga)$',
    '<rootDir>/node_modules/(?!lodash-es)$',
  ],
  moduleNameMapper: {
    '^\\$helpers(.*)$': '<rootDir>/src/helpers/$1',
    '^\\$assets(.*)': '<rootDir>/src/assets/$1',
    '^\\$store(.*)': '<rootDir>/src/state/store/$1',
    '^\\$state(.*)': '<rootDir>/src/state/$1',
    '^\\$services(.*)': '<rootDir>/src/services/$1',
    '^\\$constants(.*)': '<rootDir>/src/constants/$1',
    '^\\$components(.*)': '<rootDir>/src/components/$1',
    '^\\$lib(.*)': '<rootDir>/src/lib/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFiles: ['jest-localstorage-mock', './setupJest.js'],
};

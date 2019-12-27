module.exports = {
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)(spec))\\.js$',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**', '!dist/**/*.*'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  displayName: {
    name: 'Frontend Boilerplate',
    color: 'pink'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/test/test-utils/']
};

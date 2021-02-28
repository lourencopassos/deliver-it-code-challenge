module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testTimeout: 10000,
  testEnvironment: 'node',
  transform: { '.+\.ts$': 'ts-jest' },
  roots: [
    '<rootDir>/src'
  ]
}

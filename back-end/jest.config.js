module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '!**/index.ts',
    '!**/*-mock.ts',
    '!**/models/**'
  ]
}

module.exports = {
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['!**/index.ts', '!**/models/**', '!**/tests/**'],
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/index.{ts,tsx}',
    '!**/*.d.ts',
    '!**/setupTests.ts'
  ]
}

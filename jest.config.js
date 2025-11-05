module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '!**/tests/browser/**'  // Exclude Playwright browser tests
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/packages.js',  // Exclude barrel files
    '!src/lib/**',  // Exclude third-party libraries (raphael, etc)
    '!**/node_modules/**',
    '!**/examples/**',
    '!**/docs/**'
  ],
  coverageThreshold: {
    global: {
      statements: 30,  // Start with achievable goals
      branches: 25,
      functions: 30,
      lines: 30
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '^packages$': '<rootDir>/src/packages.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(shifty)/)'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  globals: {
    'draw2d': {}
  },
  // Increase timeout for slower operations
  testTimeout: 10000,
  // Clear mocks between tests
  clearMocks: true,
  // Restore mocks after each test
  restoreMocks: true,
  // Coverage reporting
  coverageReporters: ['text', 'lcov', 'html'],
  // Verbose output for debugging
  verbose: false
};

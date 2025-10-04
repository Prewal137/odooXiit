module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^../context/AuthProvider$': '<rootDir>/src/__mocks__/AuthProvider.js',
  },
  testMatch: ['**/tests/**/*.test.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};
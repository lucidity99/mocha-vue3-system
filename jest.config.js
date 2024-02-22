// jest.config.js - Vue 3 project Jest configuration




module.exports = {
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM support for TypeScript
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest', // Use Babel for JavaScript files
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/',
  ],
  testEnvironmentOptions: {
    "customExportConditions": [
      "node",
      "node-addons"
    ]
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'src/utils/**/*.{js,ts,vue}', // Explicitly specify the file types to include in coverage reports
    'src/views/**/*.{vue}',
    'src/components/**/*.{vue}'
  ],
  extensionsToTreatAsEsm: ['.tsx', '.jsx', '.ts','.vue'], // File extensions to treat as ECMAScript Modules (ESM)

  // Set coverage threshold goals
  coverageThreshold: {
    global: {
      branches: 60, // 60% branch coverage
      functions: 90, // 90% function coverage
      statements: 90, // 90% statement coverage
    },
  },
};

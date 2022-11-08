module.exports = {
    testEnvironment: "jsdom",
    roots: ["<rootDir>"],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
      '^@src/(.*)$': ['<rootDir>/src/$1'],
    },
    coverageReporters: ["text-summary", "html"]
  };

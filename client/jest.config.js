module.exports = {
    testEnvironment: "node",
    roots: ["<rootDir>/src/", ".devmatch"],
    modulePaths: ['<rootDir>/src/'],
    moduleNameMapper: {
      '^@src/(.*)$': ['<rootDir>/src/$1'],
  },
  };
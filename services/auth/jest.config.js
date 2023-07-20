/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@utils": "<rootDir>/utils",
  },
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  testPathIgnorePatterns: ["dist"],
};

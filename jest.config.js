/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "node",
  moduleFileExtensions: ["js"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
};

module.exports = config;

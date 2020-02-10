
module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "\\.(css|less)$": "<rootDir>/styleMock.js"
    },
    "setupFilesAfterEnv":["<rootDir>src/setupTests.ts"],
    "moduleFileExtensions": ['ts', 'tsx', 'js', 'jsx']
  }
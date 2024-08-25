// .eslintrc.js
module.exports = {
    extends: [
      "react-app",
      "eslint:recommended",
    ],
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }] // Ignore variables that start with an underscore
    },
  };
  
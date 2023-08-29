const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "eslint-config-react-app",
    "eslint-config-react-app/jest",
    "eslint-config-prettier",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  env: {
    "browser": true
  },
  plugins: ["react", "@typescript-eslint/eslint-plugin"],
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "no-debugger": "off"
  },
};

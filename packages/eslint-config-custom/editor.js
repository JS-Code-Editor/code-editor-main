module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "plugins": ["react", "@typescript-eslint/eslint-plugin"],
  "ignorePatterns": ['node_modules', '.turbo', 'build'],
  "extends": [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  "rules": {
    "no-debugger": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "off"
  },
  "env": {
    "browser": true
  }
}

const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    extends: [
        "eslint-config-standard-with-typescript",
        "eslint-config-turbo",
    ].map(require.resolve),
    env: {
        "browser": true,
        "es2021": true
    },
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module",
        project,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ["node_modules/", "dist/", "webpack.config.js"],
    // add rules configurations here
    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/semi": "off",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        "@typescript-eslint/member-delimiter-style": "off",
        "no-eval": "warn",
        "@typescript-eslint/no-this-alias": "warn",
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/space-before-function-paren": "off"
    }
};

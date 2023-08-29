// const { resolve } = require("node:path");
//
// const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'eslint-config-standard',
        // "eslint-config-turbo"
    ].map(require.resolve),
    ignorePatterns: ['node_modules', 'public', 'dist'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    // add rules configurations here
    rules: {
        'no-console': 'off',
        'consistent-return': 'off',
        'no-underscore-dangle': 'off',
        'no-useless-escape': 'off',
        'no-plusplus': 'off',
        'default-case': 'off',
        'no-shadow': 'off',
        'no-param-reassign': 'off',
        'max-len': 'off',
        'implicit-arrow-linebreak': 'off',
        'comma-dangle': 'off',
        semi: 'off',
        'space-before-function-paren': 'off',
        'no-unused-vars': 'warn',
    },
};

module.exports ={
    "root": true,
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
    ],
    "ignorePatterns": ["webpack.config.js", "node_modules", "dist", '.turbo'],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "rules": {
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
}

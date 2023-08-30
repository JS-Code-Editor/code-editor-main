module.exports = {
    ...require('eslint-config-custom/preview'),
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
    }
}

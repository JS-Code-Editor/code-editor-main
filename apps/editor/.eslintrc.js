module.exports = {
  ...require('eslint-config-custom/editor'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
}

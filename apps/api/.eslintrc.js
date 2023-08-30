module.exports = {
  ...require('eslint-config-custom/api'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  }
};

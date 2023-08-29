const auth = require('./auth');
const workspace = require('./workspace');
const folder = require('./folder');
const file = require('./file');

module.exports = {
  paths: {
    ...auth,
    ...workspace,
    ...folder,
    ...file,
  },
};

const basicInfo = require('./info');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const paths = require('./paths');

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  ...paths,
};

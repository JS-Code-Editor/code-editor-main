module.exports = {
  ...require('./authJwt'),
  ...require('./verifySignUp'),
  ...require('./authorityCheck'),
  ...require('./verifyFile'),
  ...require('./verifyFolder'),
  ...require('./verifyProject'),
  ...require('./verifyWorkspace'),
};

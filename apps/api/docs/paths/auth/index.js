const signup = require('./signup');
const signin = require('./signin');

module.exports = {
  '/auth/signup': { ...signup },
  '/auth/signin': { ...signin },
};

const getWorkspace = require('./getWorkspace');
const addWorkspace = require('./addWorkspace');
const deleteWorkspace = require('./deleteWorkspace');

module.exports = {
  '/work/space': { ...getWorkspace, ...addWorkspace, ...deleteWorkspace },
};

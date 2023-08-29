const addFile = require('./addFile');
const getFile = require('./getFile');
const deleteFile = require('./deleteFile');
const updateFile = require('./updateFile');

module.exports = {
  '/work/file': { ...addFile },
  '/work/file/{fileId}': {
    ...getFile,
    ...deleteFile,
    ...updateFile,
  },
};

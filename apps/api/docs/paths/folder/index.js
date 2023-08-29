const addFolder = require('./addFolder');
const getFolder = require('./getFolder');
const deleteFolder = require('./deleteFolder');
const updateFolder = require('./updateFolder');

module.exports = {
  '/work/folder': { ...addFolder },
  '/work/folder/{folderId}': {
    ...getFolder,
    ...deleteFolder,
    ...updateFolder,
  },
};

const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const initialFolders = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'utils', 'initialFolders.json')),
);

exports.getInitialProject = () => {
  const result = {
    folders: {},
    files: {},
    rootFolder: null,
  };
  let rootFolderId = null;

  const generateNode = (folder, parentId) => {
    const currentFolderId = new mongoose.Types.ObjectId();
    if (!parentId) {
      result.folders[currentFolderId] = {
        name: null,
        parentFolder: null,
        childrenFolders: [],
        files: [],
        expanded: true,
        id: currentFolderId,
      };
      rootFolderId = currentFolderId;
    } else {
      result.folders[currentFolderId] = {
        name: folder.name,
        parentFolder: parentId,
        childrenFolders: [],
        files: [],
        expanded: false,
        id: currentFolderId,
      };
      result.folders[parentId].childrenFolders.push(currentFolderId);
    }
    folder.files.forEach((file) => {
      const newFileId = new mongoose.Types.ObjectId();

      result.files[newFileId] = {
        name: file.name,
        content: file.content,
        id: newFileId,
        parentFolder: currentFolderId,
      };
      result.folders[currentFolderId].files.push(newFileId);
    });

    folder.childrenFolders.forEach((childFolder) => {
      generateNode(childFolder, currentFolderId);
    });
  };

  generateNode(initialFolders, null);

  result.rootFolder = rootFolderId;

  return result;
};

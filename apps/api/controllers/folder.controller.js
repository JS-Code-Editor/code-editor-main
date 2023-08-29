const Folder = require('../models/folder.model');
const File = require('../models/file.model');

const { generatePath } = require('../utils/generatePath');
const { DELIMITER } = require('../utils/constants');

/**
 * Folder Model:
 * - name
 * - isRoot
 * - files
 * - childrenFolders
 * - parentFolder
 * - createdBy
 */

exports.addFolder = async (
  {
    body: { name = 'new_folder', parentFolder: parentFolderId, project },
    userId,
    parentFolder,
  },
  res,
  next
) => {
  try {
    const newFolder = await Folder.create({
      name,
      parentFolder: parentFolderId,
      createdBy: userId,
      project,
      path: generatePath(parentFolder.path, parentFolder._id),
    });

    parentFolder.childrenFolders.push(newFolder);
    await parentFolder.save();

    res.status(201).json(newFolder);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.getFolder = ({ folder }, res) => {
  res.status(200).json(folder);
};

exports.deleteFolder = async (
  { parentFolder, params: { folderId }, userId },
  res,
  next
) => {
  try {
    await Folder.deleteMany({
      path: new RegExp(DELIMITER + folderId + DELIMITER, 'g'),
      createdBy: userId,
    }).exec();
    await File.deleteMany({
      path: new RegExp(DELIMITER + folderId + DELIMITER, 'g'),
      createdBy: userId,
    }).exec();
    await Folder.deleteOne({ _id: folderId });

    parentFolder.childrenFolders = parentFolder.childrenFolders.filter(
      (folder) => folder._id.toString() !== folderId
    );
    await parentFolder.save();

    res.status(200).send('Folder is successfully removed.');
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.updateFolder = async ({ folder, body: { name } }, res, next) => {
  try {
    if (!name) {
      const err = new Error('Folder name can not be empty.');
      err.status = 400;
      return next(err);
    }

    folder.name = name;
    await folder.save();
    res.status(200).json(folder);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

const File = require('../models/file.model');
const { generatePath } = require('../utils/generatePath');

/**
 * File Model
 * - name (defaults to "new_file")
 * - content
 * - parentFolder
 * - createdBy
 */

exports.addFile = async (
  { body: { name = 'new_file', project }, userId, parentFolder },
  res,
  next
) => {
  try {
    const newFile = await File.create({
      name,
      parentFolder: parentFolder._id,
      createdBy: userId,
      project,
      path: generatePath(parentFolder.path, parentFolder._id),
    });

    parentFolder.files.push(newFile);
    await parentFolder.save();

    res.status(201).json(newFile);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.getFile = ({ file }, res) => {
  res.status(200).json(file);
};

exports.deleteFile = async (
  { parentFolder, params: { fileId } },
  res,
  next
) => {
  try {
    await File.deleteOne({ _id: fileId }).exec();

    parentFolder.files = parentFolder.files.filter(
      (file) => file._id.toString() !== fileId
    );
    await parentFolder.save();

    res.status(200).send('File is successfully removed.');
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

// Both name and content must be provided even though only content is intended to be changed
exports.updateFile = async ({ file, body: { name, content } }, res, next) => {
  try {
    if (!name) {
      const err = new Error('File name can not be empty.');
      err.status = 400;

      return next(err);
    }

    file.name = name;
    file.content = content;
    await file.save();

    res.status(200).json(file);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

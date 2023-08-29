const Folder = require('../models/folder.model');
const File = require('../models/file.model');

exports.fileExists = async (req, res, next) => {
  const {
    body: { parentFolder: parentFolderId, name },
    params: { fileId },
  } = req;

  try {
    switch (req.method) {
      case 'POST': {
        const parentFolder = await Folder.findById(parentFolderId)
          .populate('files')
          .select(['files', 'path', 'createdBy', 'name'])
          .exec();

        if (!parentFolder) {
          const err = new Error('Parent folder not found.');
          err.status = 404;

          return next(err);
        }

        const { files } = parentFolder;
        for (let i = 0; i < files.length; i++) {
          if (files[i].name === name) {
            const err = new Error('File already exists!');
            err.status = 400;

            return next(err);
          }
        }

        req.parentFolder = parentFolder;
        return next();
      }
      case 'GET': {
        const file = await File.findById(fileId).exec();

        if (!file) {
          const err = new Error('File not found.');
          err.status = 404;

          return next(err);
        }
        req.file = file;
        return next();
      }
      case 'DELETE': {
        const parentFolder = await Folder.findOne({
          _id: parentFolderId,
          files: { $in: [fileId] },
        })
          .populate('files')
          .select(['files', 'createdBy'])
          .exec();

        if (!parentFolder) {
          const err = new Error('File not found.');
          err.status = 404;

          return next(err);
        }

        req.parentFolder = parentFolder;
        return next();
      }
      case 'PATCH': {
        const file = await File.findById(fileId).exec();

        if (!file) {
          const err = new Error('File not found.');
          err.status = 404;

          return next(err);
        }
        req.file = file;
        return next();
      }
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    next(err);
  }
};

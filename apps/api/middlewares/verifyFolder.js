const Folder = require('../models/folder.model');

exports.folderExists = async (req, res, next) => {
  const {
    body: { parentFolder: parentFolderId, name },
    params: { folderId },
  } = req;
  try {
    switch (req.method) {
      case 'POST': {
        const parentFolder = await Folder.findById(parentFolderId)
          .populate('childrenFolders')
          .select(['childrenFolders', 'path', 'createdBy', 'name'])
          .exec();

        if (!parentFolder) {
          const err = new Error('Parent folder not found.');
          err.status = 404;

          return next(err);
        }

        const subFolders = parentFolder.childrenFolders;
        for (let i = 0; i < subFolders.length; i++) {
          if (subFolders[i].name === name) {
            const err = new Error('Folder already exists!');
            err.status = 400;

            return next(err);
          }
        }
        req.parentFolder = parentFolder;
        return next();
      }
      case 'GET': {
        const folder = await Folder.findById(folderId)
          .populate('files childrenFolders')
          .exec();

        if (!folder) {
          const err = new Error('Folder not found.');
          err.status = 404;

          return next(err);
        }

        req.folder = folder;
        return next();
      }
      case 'DELETE': {
        const parentFolder = await Folder.findOne({
          _id: parentFolderId,
          childrenFolders: { $in: [folderId] },
        })
          .populate('childrenFolders')
          .select(['childrenFolders', 'createdBy'])
          .exec();

        if (!parentFolder) {
          const err = new Error('Folder not found.');
          err.status = 404;

          return next(err);
        }

        req.parentFolder = parentFolder;
        return next();
      }
      case 'PATCH': {
        const folder = await Folder.findById(folderId)
          .populate('files childrenFolders')
          .exec();

        if (!folder) {
          const err = new Error('Folder not found.');
          err.status = 404;

          return next(err);
        }

        req.folder = folder;
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

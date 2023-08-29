const Workspace = require('../models/workspace.model');
const Folder = require('../models/folder.model');
const File = require('../models/file.model');
const Project = require('../models/project.model');

exports.addWorkspace = async (
  { body: { theme = 'dark' }, userId, user },
  res,
  next
) => {
  try {
    const workspace = await Workspace.create({
      theme,
      projects: [],
      createdBy: userId,
    });

    await workspace.save();

    user.workspace = workspace;
    await user.save();

    res.status(201).json(workspace.toJSON());
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.getWorkspace = ({ workspace }, res) => {
  res.json(workspace);
};

exports.deleteWorkspace = async ({ userId, user }, res, next) => {
  try {
    await Promise.all([
      Folder.deleteMany({ createdBy: userId }).exec(),
      File.deleteMany({ createdBy: userId }).exec(),
      Folder.deleteMany({ createdBy: userId }).exec(),
      Project.deleteMany({ createdBy: userId }).exec(),
      Workspace.deleteOne({ createdBy: userId }).exec(),
    ]);

    user.workspace = null;
    await user.save();

    res.status(200).send('Workspace is successfully deleted.');
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

// exports.updateWorkspace = async (req, res, next) => {};

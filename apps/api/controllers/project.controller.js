const Project = require('../models/project.model');
const Folder = require('../models/folder.model');

exports.addProject = async (
  { body: { name = 'new_project' }, userId, workspace },
  res,
  next
) => {
  try {
    const rootFolder = new Folder({
      name: null,
      isRoot: true,
      parentFolder: null,
      createdBy: userId,
      path: null,
      project: null,
    });

    const newProject = await Project.create({
      name,
      rootFolder: rootFolder._id,
      createdBy: userId,
    });

    rootFolder.project = newProject._id;
    await rootFolder.save();

    workspace.projects.push(newProject._id);
    await workspace.save();

    res.status(201).json(newProject.toJSON());
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.getProject = ({ project }, res) => {
  res.status(200).json(project);
};

exports.deleteProject = async (
  { workspace, params: { projectId }, userId },
  res,
  next
) => {
  try {
    await Promise.all([
      Folder.deleteMany({
        project: projectId,
      }).exec(),
      File.deleteMany({
        project: projectId,
      }).exec(),
      Project.deleteOne({ _id: projectId }),
    ]);

    workspace.projects = workspace.projects.filter(
      (project) => project._id.toString() !== projectId
    );
    await workspace.save();

    res.status(200).send('Project is successfully removed.');
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

exports.updateProject = async ({ project, body: { name } }, res, next) => {
  try {
    if (!name) {
      const err = new Error('Project name can not be empty.');
      err.status = 400;
      return next(err);
    }

    project.name = name;
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

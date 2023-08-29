const Project = require('../models/project.model');
const Workspace = require('../models/workspace.model');

exports.projectExists = async (req, res, next) => {
  const {
    body: { workspace: workspaceId, name },
    params: { projectId },
  } = req;

  try {
    switch (req.method) {
      case 'POST': {
        const workspace = await Workspace.findById(workspaceId)
          .populate('projects')
          .select(['projects', 'createdBy'])
          .exec();

        if (!workspace) {
          const err = new Error('Workspace not found.');
          err.status = 404;

          return next(err);
        }

        const { projects } = workspace;
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].name === name) {
            const err = new Error('Project already exists!');
            err.status = 400;

            return next(err);
          }
        }

        req.workspace = workspace;
        return next();
      }
      case 'GET': {
        const project = await Project.findById(projectId).exec();

        if (!project) {
          const err = new Error('Project not found.');
          err.status = 404;

          return next(err);
        }
        req.project = project;
        return next();
      }
      case 'DELETE': {
        const workspace = await Workspace.findOne({
          _id: workspaceId,
          projects: { $in: [projectId] },
        })
          .populate('projects')
          .select(['projects', 'createdBy'])
          .exec();

        if (!workspace) {
          const err = new Error('Project not found.');
          err.status = 404;

          return next(err);
        }

        req.workspace = workspace;
        return next();
      }
      case 'PATCH': {
        const project = await Project.findById(projectId).exec();

        if (!project) {
          const err = new Error('Project not found.');
          err.status = 404;

          return next(err);
        }
        req.project = project;
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

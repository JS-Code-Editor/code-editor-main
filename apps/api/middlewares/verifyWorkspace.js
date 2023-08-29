const User = require('../models/user.model');

exports.workspaceExists = async (req, res, next) => {
  const { userId, method } = req;

  try {
    const user = await User.findById(userId)
      .populate('workspace')
      .select(['workspace', 'createdBy'])
      .exec();

    switch (method) {
      case 'GET': {
        if (!user.workspace) {
          const err = new Error('Workspace not found.');
          err.status = 404;

          return next(err);
        }

        req.workspace = user.workspace;
        return next();
      }
      case 'POST': {
        if (user.workspace) {
          const err = new Error('Workspace already exists.');
          err.status = 400;

          return next(err);
        }

        req.user = user;
        return next();
      }
      case 'DELETE': {
        if (!user.workspace) {
          const err = new Error('Workspace not found.');
          err.status = 404;

          return next(err);
        }

        req.user = user;
        return next();
      }
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

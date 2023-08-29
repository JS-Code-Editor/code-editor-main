const mongoose = require('mongoose');
const { getInitialProject } = require('./intial.helper');

exports.getInitialFolders = async (req, res, next) => {
  try {
    const result = getInitialProject();
    const initialProjectId = new mongoose.Types.ObjectId();

    res.status(200).json({
      [initialProjectId]: {
        name: 'InitialProject',
        ...result,
        id: initialProjectId,
      },
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

// Create controller for saving initial project

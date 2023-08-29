const User = require('../models/user.model');

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      err.status = 500;

      return next(err);
    }
    if (user) {
      const err = new Error('Failed! Email is already in use!');
      err.status = 400;

      return next(err);
    }

    next();
  });
};

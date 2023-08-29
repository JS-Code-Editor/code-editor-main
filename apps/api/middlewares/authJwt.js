const jwt = require('jsonwebtoken');

const key = process.env.TOKEN_KEY;

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    const err = new Error('No token provided!');
    err.status = 403;

    return next(err);
  }

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      const error = new Error('Unauthorized!');
      error.status = 401;

      return next(error);
    }
    req.userId = decoded.id;

    next();
  });
};

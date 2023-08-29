const { DELIMITER } = require('./constants');

exports.generatePath = (oldPath, id) => {
  if (!oldPath) {
    return DELIMITER + id + DELIMITER;
  }

  return oldPath + id + DELIMITER;
};

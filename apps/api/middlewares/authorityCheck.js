function throwError() {
  const err = new Error('Can not access unauthorized resources.');
  err.status = 403;

  return err;
}

exports.checkAuthority = (entity) => async (req, res, next) => {
  const { userId } = req;
  const entityItem = req[entity];

  try {
    if (entityItem.createdBy.toString() !== userId) return next(throwError());

    return next();
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }

    return next(err);
  }
};

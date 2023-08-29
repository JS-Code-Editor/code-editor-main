const router = require('express').Router();

const fileController = require('../../controllers/file.controller');
const {
  fileExists,
  verifyToken,
  checkAuthority,
} = require('../../middlewares');

router.post(
  '/',
  [verifyToken, fileExists, checkAuthority('parentFolder')],
  fileController.addFile
);
router.delete(
  '/:fileId',
  [verifyToken, fileExists, checkAuthority('parentFolder')],
  fileController.deleteFile
);
router.get(
  '/:fileId',
  [verifyToken, fileExists, checkAuthority('file')],
  fileController.getFile
);
router.patch(
  '/:fileId',
  [verifyToken, fileExists, checkAuthority('file')],
  fileController.updateFile
);

module.exports = router;

const router = require('express').Router();

const folderController = require('../../controllers/folder.controller');
const {
  folderExists,
  verifyToken,
  checkAuthority,
} = require('../../middlewares');

router.post(
  '/',
  [verifyToken, folderExists, checkAuthority('parentFolder')],
  folderController.addFolder
);
router.get(
  '/:folderId',
  [verifyToken, folderExists, checkAuthority('folder')],
  folderController.getFolder
);
router.delete(
  '/:folderId',
  [verifyToken, folderExists, checkAuthority('parentFolder')],
  folderController.deleteFolder
);
router.patch(
  '/:folderId',
  [verifyToken, folderExists, checkAuthority('folder')],
  folderController.updateFolder
);

module.exports = router;

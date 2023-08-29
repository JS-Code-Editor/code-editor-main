const router = require('express').Router();

const spaceController = require('../../controllers/workspace.controller');
const { workspaceExists, verifyToken } = require('../../middlewares');

router.post('/', [verifyToken, workspaceExists], spaceController.addWorkspace);
router.get('/', [verifyToken, workspaceExists], spaceController.getWorkspace);
router.delete(
  '/',
  [verifyToken, workspaceExists],
  spaceController.deleteWorkspace
);

module.exports = router;

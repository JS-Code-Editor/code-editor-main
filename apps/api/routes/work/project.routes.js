const router = require('express').Router();

const projectController = require('../../controllers/project.controller');
const {
  verifyToken,
  projectExists,
  checkAuthority,
} = require('../../middlewares');

router.post(
  '/',
  [verifyToken, projectExists, checkAuthority('workspace')],
  projectController.addProject
);
router.get(
  '/:projectId',
  [verifyToken, projectExists, checkAuthority('project')],
  projectController.getProject
);

router.delete(
  '/:projectId',
  [verifyToken, projectExists, checkAuthority('workspace')],
  projectController.deleteProject
);

router.patch(
  '/:projectId',
  [verifyToken, projectExists, checkAuthority('project')],
  projectController.updateProject
);

module.exports = router;

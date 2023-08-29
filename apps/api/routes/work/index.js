const router = require('express').Router();

router.use('/file', require('./files.routes'));
router.use('/folder', require('./folders.routes'));
router.use('/space', require('./workspaces.routes'));
router.use('/initial', require('./initial.routes'));
router.use('/project', require('./project.routes'));

module.exports = router;

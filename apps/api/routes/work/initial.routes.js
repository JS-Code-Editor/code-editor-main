const initialController = require('../../controllers/initialController');

const router = require('express').Router();

router.get('/', initialController.getInitialFolders);

module.exports = router;

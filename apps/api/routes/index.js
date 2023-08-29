const express = require('express');

const router = express.Router();

const authRouter = require('./auth.routes');
const worksRouter = require('./work');
const emojiRouter = require('./emoji.routes');

// Serve emoji files
router.use('/static/emoji/png', emojiRouter);

router.use('/auth', authRouter);
router.use('/work', worksRouter);

module.exports = router;

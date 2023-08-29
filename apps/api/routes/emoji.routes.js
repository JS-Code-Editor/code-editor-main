const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const emojiFolder = './public/static/emoji/png/';
const filePattern = (fileName) => new RegExp(`\\b${fileName}\\b`);

router.get('/:fileName', (req, res, next) => {
  // get file name without extension
  const fileName = req.params.fileName.split('.')[0];
  const files = fs.readdirSync(emojiFolder);

  // send file if it exists
  for (let i = 0; i < files.length; i++) {
    if (filePattern(fileName).test(files[i])) {
      return res.sendFile(files[i], {
        root: path.join(process.cwd(), emojiFolder),
      });
    }
  }

  // send 404 if file doesn't exist
  const err = new Error('Emoji not found');
  err.status = 404;
  return next(err);
});

module.exports = router;

const router = require('express').Router();

const controller = require('../controllers/auth.controller');
const verifySignUp = require('../middlewares/verifySignUp');

router.get('/googleAuthUrl', controller.getGoogleAuthUrl);
router.post('/getToken', controller.getToken);
router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  controller.signup
);

router.post('/signin', controller.signin);

module.exports = router;

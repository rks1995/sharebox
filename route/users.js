const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  signin,
  signup,
  create,
  profile,
  createSession,
} = require('../controller/user_controller');

router.get('/profile', passport.checkUserAuthenticated, profile);

router.get('/signin', signin);
router.get('/signup', signup);

router.post('/create', create);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/user/signin' }),
  createSession
);

module.exports = router;

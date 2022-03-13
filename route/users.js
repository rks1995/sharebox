const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  signin,
  signup,
  create,
  profile,
  update,
  destroySession,
  createSession,
} = require('../controller/user_controller');

router.get('/profile/:id', passport.checkUserAuthenticated, profile);
router.post('/update/:id', update);

router.get('/signin', signin);
router.get('/signup', signup);
router.get('/sign-out', destroySession);

router.post('/create', create);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/user/signin' }),
  createSession
);

//google auth
//1. get information from google
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

//2. google sends back the response to the web browser
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'user/signin' }),
  createSession
);

module.exports = router;

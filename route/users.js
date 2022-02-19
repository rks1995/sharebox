const express = require('express');
const router = express.Router();

const {
  signin,
  signup,
  create,
  createSession,
} = require('../controller/user_controller');

router.get('/signin', signin);
router.get('/signup', signup);

router.post('/create', create);
router.get('/create-session', createSession);

module.exports = router;

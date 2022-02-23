const express = require('express');
const router = express.Router();
const passport = require('passport');

const { create, deleteComment } = require('../controller/comments_controller');

// router.get(
//   '/deleteComment/:id',
//   passport.checkUserAuthenticated,
//   deleteComment
// );

router.post('/create', passport.checkUserAuthenticated, create);

module.exports = router;

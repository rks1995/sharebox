const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createPost } = require('../controller/post_controller');

router.post('/create-post', passport.checkUserAuthenticated, createPost);

module.exports = router;

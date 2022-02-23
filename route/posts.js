const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createPost, deletePost } = require('../controller/post_controller');

router.get('/deletePost/:id', passport.checkUserAuthenticated, deletePost);

router.post('/create-post', passport.checkUserAuthenticated, createPost);

module.exports = router;

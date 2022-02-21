const express = require('express');
const router = express.Router();

const { createPost } = require('../controller/post_controller');

router.post('/create-post', createPost);

module.exports = router;

const express = require('express');

const router = express.Router();

const { index, deletePost } = require('../../../controller/api/v1/posts_api');

router.get('/', index);
router.delete('/:id', deletePost);

module.exports = router;

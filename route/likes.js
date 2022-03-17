const express = require('express');

const router = express.Router();

const { likeController } = require('../controller/likes_controller');

router.post('/togglelikes', likeController);

module.exports = router;

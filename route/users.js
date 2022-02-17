const express = require('express');
const router = express.Router();

const profileController = require('../controller/profile');

router.get('/profile', profileController.profile);
router.get('/post', profileController.post);

router.use('/profile', require('./profile'));
module.exports = router;

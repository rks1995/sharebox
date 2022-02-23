const express = require('express');
const passport = require('passport');

const router = express.Router();

const { home } = require('../controller/home_controller');

router.get('/', home);

router.use('/user', require('./users'));
router.use('/post', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;

const express = require('express');
const router = express.Router();

const dashBoardController = require('../controller/dashboard');

router.get('/dashboard', dashBoardController.dashboard);

module.exports = router;

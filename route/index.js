const express = require('express');

const route = express.Router();

const homeController = require('../controller/home_controller');

route.get('/', homeController.home);
route.get('/dashboard', homeController.dashboard);

module.exports = route;

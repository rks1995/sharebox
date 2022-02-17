const express = require('express');

const route = express.Router();

const homeController = require('../controller/home_controller');
const router = require('./users');

route.get('/', homeController.home);

route.use('/user', require('./users'));

module.exports = route;

const express = require('express');

const router = express.Router();

const create = require('../../../controller/api/v1/users_api');

router.post('/create-session', create.createSession);

module.exports = router;

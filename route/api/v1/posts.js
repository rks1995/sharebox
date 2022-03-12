const express = require('express');

const router = express.Router();
const passport = require('passport');

const { index, deletePost } = require('../../../controller/api/v1/posts_api');

router.get('/', index);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deletePost
);

module.exports = router;

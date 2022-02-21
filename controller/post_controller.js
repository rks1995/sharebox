const Post = require('../models/post');

createPost = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err) {
      if (err) {
        console.log('Error creating posts :(');
        return;
      }
      return res.redirect('back');
    }
  );
};

module.exports = {
  createPost,
};

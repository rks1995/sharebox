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

deletePost = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log('error in deleting the comment!!');
      return;
    }
    //.id converts object id into string automatically
    if (post.user == req.user.id) {
      post.remove();
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  });
};
module.exports = {
  createPost,
  deletePost,
};

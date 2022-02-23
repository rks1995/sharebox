const Comment = require('../models/comments');
const Post = require('../models/post');

create = function (req, res) {
  Comment.create(
    {
      content: req.body.content,
      user: req.user._id,
      post: req.body.post,
    },
    function (err, comment) {
      //handle err
      console.log(comment);
      if (err) {
        console.log('error in creating comments in db');
        return;
      }
      Post.findById(req.body.post, function (err, post) {
        //handle err
        if (post) {
          post.comments.push(comment);
          post.save();
          return res.redirect('back');
        } else {
          return res.redirect('back');
        }
      });
    }
  );
};

module.exports = {
  create,
};

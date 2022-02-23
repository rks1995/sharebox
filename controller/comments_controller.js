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

deleteComment = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      console.log('error in deleting the comment!!');
      return;
    }
    //.id converts object id into string automatically
    if (comment.user == req.user.id) {
      const postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect('back');
        }
      );
    } else {
      return res.redirect('back');
    }
  });
};

module.exports = {
  create,
  deleteComment,
};

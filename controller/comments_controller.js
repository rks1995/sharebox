const Comment = require('../models/comments');
const Post = require('../models/post');
const Like = require('../models/likes');

create = async function (req, res) {
  try {
    let comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      post: req.body.post,
    });

    if (req.xhr) {
      let post = await Post.findById(req.body.post);
      let populateComment = await comment.populate('user', 'name');
      if (post) {
        post.comments.push(comment);
        post.save();

        return res.status(200).json({
          data: {
            comment: populateComment,
          },
        });
      }
    }
  } catch (error) {
    console.log('Error', error);
    return;
  }
};

deleteComment = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    //.id converts object id into string automatically
    if (comment.user == req.user.id) {
      const postId = comment.post;

      comment.remove();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      await Like.deleteMany({ likeable: req.params.id, onModel: 'Comment' });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: 'Comment Deleted',
        });
      }
    }
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
    return;
  }
};

module.exports = {
  create,
  deleteComment,
};

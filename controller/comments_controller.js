const Comment = require('../models/comments');
const Post = require('../models/post');

create = async function (req, res) {
  try {
    let comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      post: req.body.post,
    });

    let post = await Post.findById(req.body.post);

    if (post) {
      post.comments.push(comment);
      post.save();

      let populateComment = await comment.populate('user', 'name');
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: populateComment,
          },
        });
      }
    } else {
      return res.redirect('back');
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

const Post = require('../models/post');
const Comment = require('../models/comments');

createPost = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash('success', 'post created');
    return res.redirect('back');
  } catch (error) {
    console.log('Error', error);
  }
};

deletePost = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //.id converts object id into string automatically
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      req.flash('error', 'post deleted');
      return res.redirect('back');
    }
  } catch (error) {
    console.log('Error', error);
    return;
  }
};
module.exports = {
  createPost,
  deletePost,
};

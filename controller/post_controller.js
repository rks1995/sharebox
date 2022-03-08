const Post = require('../models/post');
const Comment = require('../models/comments');

createPost = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      //send data in json format
      return res.status(200).json({
        data: {
          post: post,
        },
        message: 'Post created',
      });
    }

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

      if (req.xhr) {
        //send data in json format
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: 'Post deleted',
        });
      }

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

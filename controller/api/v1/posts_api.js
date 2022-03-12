const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

index = async function (req, res) {
  let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user', '-password')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    });

  return res.status(200).json({
    message: 'list of posts',
    post: posts,
  });
};

deletePost = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      // req.flash('error', 'post deleted');
      return res.status(200).json({
        message: 'Post and associated comments deleted',
      });
    } else {
      return res.status(401).json({
        message: 'unauthorized user',
      });
    }
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  index,
  deletePost,
};

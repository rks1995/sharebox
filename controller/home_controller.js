const Post = require('../models/post');
const User = require('../models/user');

home = async function (req, res) {
  try {
    // populate the user
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        sort: {
          select: '-createdAt',
        },
        populate: {
          path: 'user likes',
        },
      })
      .populate('likes');

    let user = await User.find({});

    return res.render('home', {
      title: 'Home',
      posts: posts,
      all_user: user,
    });
  } catch (error) {
    console.log('Error', error);
    return;
  }
};

module.exports = {
  home,
};

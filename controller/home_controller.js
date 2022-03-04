const Post = require('../models/post');
const User = require('../models/user');

home = async function (req, res) {
  try {
    // populate the user
    let posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });

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

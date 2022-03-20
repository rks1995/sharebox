const Post = require('../models/post');
const User = require('../models/user');
const FriendShip = require('../models/friendship');

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

    let friends = await FriendShip.find({}).populate('from_user to_user');

    return res.render('home', {
      title: 'Home',
      posts: posts,
      all_user: user,
      all_friends: friends,
    });
  } catch (error) {
    console.log('Error', error);
    return;
  }
};

module.exports = {
  home,
};

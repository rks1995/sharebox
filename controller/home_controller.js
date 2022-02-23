const Post = require('../models/post');
const User = require('../models/user');

home = function (req, res) {
  //populate the user
  Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, user) {
        return res.render('Home', {
          title: 'Home',
          posts: posts,
          all_user: user,
        });
      });
    });
};

module.exports = {
  home,
};

const Post = require('../models/post');

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
      return res.render('Home', {
        title: 'Home',
        posts: posts,
      });
    });
};

module.exports = {
  home,
};

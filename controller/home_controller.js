const Post = require('../models/post');

home = function (req, res) {
  // Post.find({}, function (err, posts) {
  //   return res.render('home', {
  //     title: 'home',
  //     posts: posts,
  //   });
  // });

  //populate the user
  Post.find({})
    .populate('user')
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

module.exports.profile = function (req, res) {
  return res.render('profile', {
    title: 'Profile-page',
  });
};

module.exports.post = function (req, res) {
  return res.send('<h1> user post </h1>');
};

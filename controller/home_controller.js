module.exports.home = function (req, res) {
  return res.render('home', {
    title: 'Home',
  });
};

module.exports.signin = function (req, res) {
  return res.render('signin', {
    title: 'Signin',
  });
};

module.exports.signup = function (req, res) {
  return res.render('signup', {
    title: 'Register',
  });
};

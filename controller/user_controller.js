const User = require('../models/user');

signin = function (req, res) {
  return res.render('signin', {
    title: 'Signin',
  });
};

signup = function (req, res) {
  return res.render('signup', {
    title: 'Register',
  });
};

//create user
create = function (req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect('back');
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in signing up the user');
      return;
    }

    if (!user) {
      User.create(req.body, function (err) {
        if (err) {
          console.log('error in creating user while signing up');
          return;
        }

        return res.redirect('/user/signin');
      });
    } else {
      return res.redirect('back');
    }
  });
};

//login user
createSession = function (req, res) {};

module.exports = {
  signin,
  signup,
  create,
  createSession,
};

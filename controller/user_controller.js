const User = require('../models/user');

signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }

  return res.render('signin', {
    title: 'Signin',
  });
};

signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }

  return res.render('signup', {
    title: 'Register',
  });
};

profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render('profile', {
      title: 'profile page',
      profile_user: user,
    });
  });
};

update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      function (err, user) {
        return res.redirect('back');
      }
    );
  } else {
    return res.status(401).send('unauthorized');
  }
};

destroySession = function (req, res) {
  req.logOut();
  return res.redirect('/');
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
createSession = function (req, res) {
  return res.redirect('/');
};

module.exports = {
  signin,
  signup,
  create,
  profile,
  update,
  destroySession,
  createSession,
};

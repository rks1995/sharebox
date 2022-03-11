const User = require('../models/user');
const fs = require('fs');
const path = require('path');

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

profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    return res.render('profile', {
      title: 'profile page',
      profile_user: user,
    });
  } catch (error) {
    console.log('Error', error);
    return;
  }
};

update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      let pathName = path.join(__dirname, '..', User.avatarPath);
      let isFilePresent = false;
      fs.readdir(pathName, function (err, files) {
        if (files.length > 0) {
          isFilePresent = true;
        }
      });
      User.uploads(req, res, function (err) {
        if (err) {
          console.log('Multer error', err);
          return;
        }

        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (isFilePresent) {
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');
      });
    } catch (error) {
      console.log('Error', error);
      return;
    }
  } else {
    return res.status(401).send('unauthorized');
  }
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
          req.flash('error', err);
          return res.redirect('back');
        }
        req.flash('success', 'Registered successfully!');
        return res.redirect('/user/signin');
      });
    } else {
      return res.redirect('back');
    }
  });
};

//login user
createSession = function (req, res) {
  req.flash('success', 'Logged In Successfully!');

  return res.redirect('/');
};

//logout user
destroySession = function (req, res) {
  req.flash('success', 'Logged Out Successfully!');
  req.logOut();

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

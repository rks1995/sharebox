const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// using passport - local strategy to authenticate the user
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash('error', err);
          return done(err);
        }

        if (!user || user.password != password) {
          req.flash('error', 'Invalid Username or Password');
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serializing the user to keep user property in the session (cookies)
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

//deserializing user so that the valid user can authorized in the browser
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user --> passport');
      return done(err);
    }

    return done(null, user);
  });
});

//check user authentication
passport.checkUserAuthenticated = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/user/signin');
};

passport.setUserAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contain the current signed in user from the session cookie and we are just sending to the locals for the view
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;

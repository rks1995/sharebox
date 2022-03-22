const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');
const User = require('../models/user');

var opts = {
  clientID: env.google_clientID,
  clientSecret: env.google_clientSecret,
  callbackURL: env.google_callbackURL,
};

//tell passport to use Google strategy
passport.use(
  new GoogleStrategy(opts, function (accessToken, refreshToken, profile, cb) {
    //find a user
    User.findOne({ email: profile.emails[0].value }, function (err, user) {
      if (err) {
        console.log('Error in google strategy passport', err);
        return;
      }
      console.log(profile);
      if (user) {
        //if user found set this user to req.user
        return cb(null, user);
      } else {
        //if not found create the user and set it as req.user
        User.create(
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString('hex'),
          },
          function (err, user) {
            if (err) {
              console.log(
                'Error in creating user --> google strategy passport',
                err
              );
              return;
            }

            return cb(null, user);
          }
        );
      }
    });
  })
);

module.exports = passport;

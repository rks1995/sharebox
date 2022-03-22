const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDir = path.join(__dirname, '../production_logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDir,
  compress: 'gzip',
});

const development = {
  name: 'development',
  assets_path: './assets',
  secret_key: 'demosecret',
  db: 'sharebox_db',

  google_clientID:
    '1040793694268-8s40rrvkhp11nn4hbpicirg01gebr1dn.apps.googleusercontent.com',
  google_clientSecret: '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',
  google_callbackURL: 'http://localhost:8000/user/auth/google/callback',

  jwt_secretOrKey: 'secret',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
};

const production = {
  name: 'production',
  assets_path: process.env.SHAREBOX_ASSET_PATH,
  secret_key: process.env.SHAREBOX_SESSION_COOKIE_SECRET,
  db: process.env.SHAREBOX_DB,

  google_clientID: process.env.SHAREBOX_GOOGLE_CLIENT_ID,
  google_clientSecret: process.env.SHAREBOX_GOOGLE_CLIENT_SECRET,
  google_callbackURL: process.env.SHAREBOX_GOOGLE_CALLBACK_URL,

  jwt_secretOrKey: process.env.SHAREBOX_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.SHAREBOX_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.SHAREBOX_ENVIRONMENT);
